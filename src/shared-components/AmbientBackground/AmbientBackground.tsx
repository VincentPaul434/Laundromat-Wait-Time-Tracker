import { Antigravity } from "../Antigravity/Antigravity";

interface AmbientBackgroundProps {
  /** Base page color behind the particle field. */
  backgroundColor?: string;
  /** Particle color. */
  particleColor?: string;
}

/**
 * Fixed, full-viewport ambient particle field. Sits behind all page content
 * (z-0, pointer-events disabled) so it reads as atmosphere rather than a
 * section graphic, and stays mounted once instead of re-triggering per
 * section as the page scrolls.
 */
export function AmbientBackground({
  backgroundColor = "#e7f0f4",
  particleColor = "#0EA5E9",
}: AmbientBackgroundProps): JSX.Element {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
      style={{ backgroundColor }}
    >
      <Antigravity
        count={150}
        magnetRadius={20}
        ringRadius={10}
        waveSpeed={0.4}
        waveAmplitude={5}
        particleSize={16}
        lerpSpeed={0.1}
        color={particleColor}
        autoAnimate={false}
        particleVariance={0.8}
        rotationSpeed={0}
        depthFactor={0.9}
        pulseSpeed={1}
        particleShape="circle"
        fieldStrength={50}
        className="h-full w-full opacity-40"
        
      />
    </div>
  );
}
