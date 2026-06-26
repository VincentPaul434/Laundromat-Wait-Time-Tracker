import { useState, useEffect, useRef, useCallback, type ReactNode } from "react";
import { motion, AnimatePresence, type Variants } from "framer-motion";

export interface CardSwapItem {
  id: string;
  content: ReactNode;
}

// Direction-aware swap animation. `custom` (the active card's swap
// direction, 1 or -1) is passed in via the `custom` prop on motion.div
// and resolved here against each variant.
function cardVariants(skewAmount: number): Variants {
  return {
    initial: (dir: number) => ({
      opacity: 0,
      y: dir > 0 ? -40 : 40,
      rotateX: dir > 0 ? -12 : 12,
      skewY: dir > 0 ? -skewAmount : skewAmount,
      scale: 0.94,
    }),
    animate: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      skewY: 0,
      scale: 1,
    },
    exit: (dir: number) => ({
      opacity: 0,
      y: dir > 0 ? 48 : -48,
      rotateX: dir > 0 ? 18 : -18,
      skewY: dir > 0 ? skewAmount : -skewAmount,
      scale: 0.92,
    }),
  };
}

interface CardSwapProps {
  items: CardSwapItem[];
  /** Degrees of skew applied during swap transition */
  skewAmount?: number;
  /** Pause the auto-cycle when the user hovers */
  pauseOnHover?: boolean;
  /** Ms between each swap */
  interval?: number;
  className?: string;
}

export function CardSwap({
  items,
  skewAmount = 4,
  pauseOnHover = true,
  interval = 3200,
  className = "",
}: CardSwapProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [direction, setDirection] = useState<1 | -1>(1);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const advance = useCallback(() => {
    setDirection(1);
    setActiveIndex((i) => (i + 1) % items.length);
  }, [items.length]);

  useEffect(() => {
    if (isPaused) return;
    timerRef.current = setTimeout(advance, interval);
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [advance, interval, isPaused, activeIndex]);

  const goTo = (index: number) => {
    setDirection(index > activeIndex ? 1 : -1);
    setActiveIndex(index);
  };

  // Stack behind cards (not active)
  const stackItems = items.map((_, i) => {
    const offset = (i - activeIndex + items.length) % items.length;
    return offset; // 0 = active, 1 = 1st behind, 2 = 2nd behind, etc.
  });

  return (
    <div
      className={`relative ${className}`}
      onMouseEnter={() => pauseOnHover && setIsPaused(true)}
      onMouseLeave={() => pauseOnHover && setIsPaused(false)}
      style={{ perspective: "1200px", display: "grid" }}
    >
      {/* Sizing reference: an invisible clone of the active card's content
          establishes natural height for the stack, since the stacked
          (non-active) cards below are `position: absolute` and would
          otherwise collapse the parent to 0px height. */}
      <div aria-hidden className="invisible" style={{ gridArea: "1 / 1" }}>
        {items[activeIndex].content}
      </div>

      {/* Stack shadow cards behind the active */}
      {items.map((item, i) => {
        const offset = stackItems[i];
        if (offset === 0) return null; // rendered via AnimatePresence below
        const depth = Math.min(offset, 3);
        return (
          <div
            key={item.id}
            aria-hidden
            style={{
              position: "absolute",
              inset: 0,
              gridArea: "1 / 1",
              transform: `translateY(${depth * 6}px) translateZ(${-depth * 28}px) scale(${1 - depth * 0.04})`,
              opacity: Math.max(0, 1 - depth * 0.28),
              zIndex: 10 - depth,
              borderRadius: "1.5rem",
              pointerEvents: "none",
            }}
            className="overflow-hidden"
          >
            {item.content}
          </div>
        );
      })}

      {/* Active card — animates in/out */}
      <div className="absolute inset-0" style={{ zIndex: 20, gridArea: "1 / 1" }}>
        <AnimatePresence mode="popLayout" custom={direction}>
          <motion.div
            key={items[activeIndex].id}
            custom={direction}
            variants={cardVariants(skewAmount)}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{
              type: "spring",
              stiffness: 260,
              damping: 24,
              mass: 0.9,
            }}
            className="absolute inset-0 h-full w-full"
          >
            {items[activeIndex].content}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Dot indicators */}
      {items.length > 1 && (
        <div className="relative z-30 mt-5 flex items-center justify-center gap-2">
          {items.map((_, i) => (
            <button
              key={i}
              type="button"
              aria-label={`Go to card ${i + 1}`}
              onClick={() => goTo(i)}
              className={`rounded-full transition-all duration-300 ${
                i === activeIndex
                  ? "w-5 h-2 bg-primary"
                  : "w-2 h-2 bg-border hover:bg-muted-foreground/40"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
