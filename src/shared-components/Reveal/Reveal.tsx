import { motion, type HTMLMotionProps } from "framer-motion";
import type { ReactNode } from "react";

interface RevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
}

/**
 * Fades and lifts its children into view as they scroll into the viewport.
 * Plays once per element; respects reduced-motion via framer-motion's
 * built-in viewport handling (animation is purely opacity/transform).
 */
export function Reveal({ children, className, delay = 0, y = 24 }: RevealProps): JSX.Element {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

interface RevealGroupProps extends Omit<HTMLMotionProps<"div">, "initial" | "whileInView" | "viewport" | "variants" | "children"> {
  children: ReactNode;
  className?: string;
  stagger?: number;
}

/**
 * Container that staggers the reveal of its direct motion children.
 * Use with RevealItem for list/grid entrances.
 */
export function RevealGroup({ children, className, stagger = 0.08, ...rest }: RevealGroupProps): JSX.Element {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      variants={{
        hidden: {},
        visible: {
          transition: { staggerChildren: stagger },
        },
      }}
      className={className}
      {...rest}
    >
      {children}
    </motion.div>
  );
}

export function RevealItem({ children, className }: { children: ReactNode; className?: string }): JSX.Element {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
