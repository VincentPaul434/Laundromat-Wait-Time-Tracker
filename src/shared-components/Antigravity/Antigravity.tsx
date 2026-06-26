import { useEffect, useRef } from "react";

export interface AntigravityProps {
  /** Number of particles in the field. */
  count?: number;
  /** Radius (in particle-units) within which the cursor pulls/repels particles. */
  magnetRadius?: number;
  /** Radius of the idle orbit each particle settles into around its anchor point. */
  ringRadius?: number;
  /** Speed of the ambient wave drift applied to every particle. */
  waveSpeed?: number;
  /** Amplitude (px) of the ambient wave drift. */
  waveAmplitude?: number;
  /** Base radius (px) of each particle before depth scaling. */
  particleSize?: number;
  /** How quickly particles ease toward their target position (0-1). */
  lerpSpeed?: number;
  /** Particle color. Accepts any valid CSS color string. */
  color?: string;
  /** Background fill behind the particles. Leave undefined for transparent. */
  backgroundColor?: string;
  /** When true, particles drift on their own without pointer input. */
  autoAnimate?: boolean;
  /** Random per-particle variance (0-1) applied to size/speed for organic feel. */
  particleVariance?: number;
  /** Constant rotation speed (radians/frame) applied to the whole field. */
  rotationSpeed?: number;
  /** How strongly z-depth affects size/opacity (0-1). */
  depthFactor?: number;
  /** Speed of the ambient pulse (brightness/scale breathing). */
  pulseSpeed?: number;
  /** Rendering style for each particle. */
  particleShape?: "sphere" | "circle" | "square";
  /** Strength of the cursor's magnetic field. */
  fieldStrength?: number;
  /** Extra className for the wrapping canvas element. */
  className?: string;
}

interface Particle {
  anchorX: number;
  anchorY: number;
  x: number;
  y: number;
  z: number;
  angle: number;
  orbitSpeed: number;
  variance: number;
  phase: number;
}

/**
 * Antigravity — an ambient, physics-flavored particle field.
 *
 * Particles idle on a soft orbit around a scattered anchor grid, drift on a
 * slow sine wave, gently pulse in size/opacity, and react to the pointer
 * with a magnet-style pull when it's nearby. Rendered as shaded "sphere"
 * particles (radial gradient + rim highlight) by default to read as soft
 * 3D dots rather than flat circles.
 */
export function Antigravity({
  count = 220,
  magnetRadius = 10,
  ringRadius = 10,
  waveSpeed = 0.4,
  waveAmplitude = 1,
  particleSize = 2,
  lerpSpeed = 0.1,
  color = "#0EA5E9",
  backgroundColor,
  autoAnimate = false,
  particleVariance = 0.8,
  rotationSpeed = 0,
  depthFactor = 0.9,
  pulseSpeed = 3,
  particleShape = "sphere",
  fieldStrength = 10,
  className,
}: AntigravityProps): JSX.Element {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pointerRef = useRef<{ x: number; y: number; active: boolean }>({ x: 0, y: 0, active: false });
  const rgbRef = useRef<{ r: number; g: number; b: number }>({ r: 14, g: 165, b: 233 });

  // Parse the color prop into RGB once per change so the render loop can
  // build rgba() strings cheaply every frame.
  useEffect(() => {
    const ctx = document.createElement("canvas").getContext("2d");
    if (!ctx) return;
    ctx.fillStyle = color;
    const computed = ctx.fillStyle; // normalizes to #rrggbb or rgb(...)
    const hexMatch = /^#([0-9a-f]{6})$/i.exec(computed);
    if (hexMatch) {
      const intVal = parseInt(hexMatch[1], 16);
      rgbRef.current = {
        r: (intVal >> 16) & 255,
        g: (intVal >> 8) & 255,
        b: intVal & 255,
      };
      return;
    }
    const rgbMatch = /^rgba?\((\d+),\s*(\d+),\s*(\d+)/.exec(computed);
    if (rgbMatch) {
      rgbRef.current = {
        r: Number(rgbMatch[1]),
        g: Number(rgbMatch[2]),
        b: Number(rgbMatch[3]),
      };
    }
  }, [color]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let width = 0;
    let height = 0;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);
    let particles: Particle[] = [];
    let fieldRotation = 0;
    let animationFrame = 0;
    let time = 0;

    const buildParticles = () => {
      const cols = Math.ceil(Math.sqrt(count * (width / Math.max(height, 1))));
      const rows = Math.ceil(count / Math.max(cols, 1));
      const cellW = width / Math.max(cols, 1);
      const cellH = height / Math.max(rows, 1);

      const next: Particle[] = [];
      for (let i = 0; i < count; i += 1) {
        const col = i % cols;
        const row = Math.floor(i / cols);
        const jitterX = (Math.random() - 0.5) * cellW * 0.6;
        const jitterY = (Math.random() - 0.5) * cellH * 0.6;
        const anchorX = cellW * (col + 0.5) + jitterX;
        const anchorY = cellH * (row + 0.5) + jitterY;

        next.push({
          anchorX,
          anchorY,
          x: anchorX,
          y: anchorY,
          z: Math.random(),
          angle: Math.random() * Math.PI * 2,
          orbitSpeed: (0.2 + Math.random() * 0.5) * (Math.random() < 0.5 ? -1 : 1),
          variance: 1 - particleVariance / 2 + Math.random() * particleVariance,
          phase: Math.random() * Math.PI * 2,
        });
      }
      particles = next;
    };

    const resize = () => {
      const parent = canvas.parentElement;
      width = parent ? parent.clientWidth : window.innerWidth;
      height = parent ? parent.clientHeight : window.innerHeight;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.max(1, Math.floor(width * dpr));
      canvas.height = Math.max(1, Math.floor(height * dpr));
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      buildParticles();
    };

    const handlePointerMove = (event: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      pointerRef.current = {
        x: event.clientX - rect.left,
        y: event.clientY - rect.top,
        active: true,
      };
    };

    const handlePointerLeave = () => {
      pointerRef.current.active = false;
    };

    const ro = new ResizeObserver(() => resize());
    if (canvas.parentElement) ro.observe(canvas.parentElement);
    resize();

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    window.addEventListener("pointerleave", handlePointerLeave);

    const magnetPx = magnetRadius * 14;
    const ringPx = ringRadius * 1.6;
    const fieldPx = fieldStrength * 4;

    const draw = () => {
      time += 1;
      fieldRotation += rotationSpeed;

      ctx.clearRect(0, 0, width, height);
      if (backgroundColor) {
        ctx.fillStyle = backgroundColor;
        ctx.fillRect(0, 0, width, height);
      }

      const { r, g, b } = rgbRef.current;
      const pointer = pointerRef.current;
      const cx = width / 2;
      const cy = height / 2;
      const cosR = Math.cos(fieldRotation);
      const sinR = Math.sin(fieldRotation);

      for (const particle of particles) {
        // Idle orbit + ambient wave drift around the anchor point.
        if (!prefersReducedMotion) {
          particle.angle += 0.01 * particle.orbitSpeed;
        }
        const orbitX = Math.cos(particle.angle) * ringPx * particle.variance;
        const orbitY = Math.sin(particle.angle) * ringPx * particle.variance;
        const wave =
          Math.sin(time * 0.01 * waveSpeed + particle.phase) * waveAmplitude * 6;

        let targetX = particle.anchorX + orbitX;
        let targetY = particle.anchorY + orbitY + wave;

        // Field rotation around canvas center.
        if (rotationSpeed !== 0) {
          const relX = targetX - cx;
          const relY = targetY - cy;
          targetX = cx + relX * cosR - relY * sinR;
          targetY = cy + relX * sinR + relY * cosR;
        }

        // Pointer magnet field — pulls particles toward the cursor when near,
        // unless autoAnimate is forced (then drift is purely ambient).
        if (pointer.active && !autoAnimate) {
          const dx = particle.x - pointer.x;
          const dy = particle.y - pointer.y;
          const dist = Math.sqrt(dx * dx + dy * dy) || 1;
          if (dist < magnetPx) {
            const push = (1 - dist / magnetPx) * fieldPx;
            targetX += (dx / dist) * push;
            targetY += (dy / dist) * push;
          }
        }

        particle.x += (targetX - particle.x) * lerpSpeed;
        particle.y += (targetY - particle.y) * lerpSpeed;

        // Depth-based scale + opacity, plus a slow shared pulse.
        const pulse =
          0.85 + 0.15 * Math.sin(time * 0.02 * pulseSpeed + particle.phase);
        const depthScale = 1 - depthFactor * 0.4 * (1 - particle.z);
        const radius = Math.max(0.4, particleSize * particle.variance * depthScale * pulse);
        const alpha = (0.35 + 0.65 * particle.z) * pulse;

        if (particleShape === "sphere") {
          const gradient = ctx.createRadialGradient(
            particle.x - radius * 0.35,
            particle.y - radius * 0.35,
            radius * 0.1,
            particle.x,
            particle.y,
            radius,
          );
          gradient.addColorStop(0, `rgba(255,255,255,${Math.min(1, alpha + 0.25)})`);
          gradient.addColorStop(0.35, `rgba(${r},${g},${b},${alpha})`);
          gradient.addColorStop(1, `rgba(${r},${g},${b},${alpha * 0.15})`);
          ctx.fillStyle = gradient;
          ctx.beginPath();
          ctx.arc(particle.x, particle.y, radius, 0, Math.PI * 2);
          ctx.fill();
        } else if (particleShape === "square") {
          ctx.fillStyle = `rgba(${r},${g},${b},${alpha})`;
          ctx.fillRect(particle.x - radius, particle.y - radius, radius * 2, radius * 2);
        } else {
          ctx.fillStyle = `rgba(${r},${g},${b},${alpha})`;
          ctx.beginPath();
          ctx.arc(particle.x, particle.y, radius, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      animationFrame = window.requestAnimationFrame(draw);
    };

    if (prefersReducedMotion) {
      // Render a single static frame and skip the animation loop entirely.
      draw();
    } else {
      animationFrame = window.requestAnimationFrame(draw);
    }

    return () => {
      window.cancelAnimationFrame(animationFrame);
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerleave", handlePointerLeave);
      ro.disconnect();
    };
  }, [
    count,
    magnetRadius,
    ringRadius,
    waveSpeed,
    waveAmplitude,
    particleSize,
    lerpSpeed,
    backgroundColor,
    autoAnimate,
    particleVariance,
    rotationSpeed,
    depthFactor,
    pulseSpeed,
    particleShape,
    fieldStrength,
  ]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={className}
      style={{ display: "block", width: "100%", height: "100%" }}
    />
  );
}
