import { animate } from "framer-motion";
import { useEffect, useRef, useState } from "react";

interface AnimatedCounterProps {
  value: number;
  className?: string;
  duration?: number;
}

/**
 * Tweens a numeric value whenever it changes, instead of snapping.
 * Falls back gracefully — first render shows the value immediately.
 */
export function AnimatedCounter({ value, className, duration = 0.6 }: AnimatedCounterProps): JSX.Element {
  const [displayValue, setDisplayValue] = useState(value);
  const previousValue = useRef(value);

  useEffect(() => {
    const controls = animate(previousValue.current, value, {
      duration,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (latest) => setDisplayValue(Math.round(latest)),
    });

    previousValue.current = value;

    return () => controls.stop();
  }, [value, duration]);

  return <span className={className}>{displayValue}</span>;
}
