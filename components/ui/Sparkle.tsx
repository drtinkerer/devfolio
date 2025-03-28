"use client";

import React, { useRef } from "react";
import {
  motion,
  useAnimationFrame,
  useMotionTemplate,
  useMotionValue,
  useTransform,
} from "framer-motion";
import { cn } from "@/lib/utils";

type SparkleProps = {
  children: React.ReactNode;
  as?: React.ElementType;
  duration?: number;
  className?: string;
  [key: string]: any;
};

export function Sparkle({
  children,
  as: Component = "div",
  duration = 8000,
  className = "",
  ...otherProps
}: SparkleProps) {

  return (
    <Component
      className="relative text-xl p-[1px] overflow-hidden rounded-3xl group/bento hover:shadow-xl transition duration-200"
      {...otherProps}
    >
      {/* Animated sparkle effect */}
      <div className="absolute inset-0 rounded-3xl">
        <SparkleBox duration={duration} rx="30%" ry="30%">
          <div
            className="h-24 w-24 opacity-60 bg-[radial-gradient(#9935ff_10%,#3490dc_50%,transparent_80%)]"
          />
        </SparkleBox>
      </div>
      
      {/* Gradient overlay that appears on hover */}
      <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-b from-transparent to-black/40 opacity-0 group-hover/bento:opacity-100 transition-opacity duration-300" />
      
      {/* Main content container */}
      <div
        className={cn(
          "relative rounded-3xl flex items-center justify-center w-full h-full text-sm text-white border border-white/10 bg-black/40 backdrop-blur-sm group-hover/bento:translate-x-1 transition duration-200",
          className
        )}
      >
        {children}
      </div>
    </Component>
  );
}

type SparkleBoxProps = {
  children: React.ReactNode;
  duration?: number;
  rx?: string;
  ry?: string;
  [key: string]: any;
};

export const SparkleBox = ({
  children,
  duration = 8000,
  rx = "0%",
  ry = "0%",
  ...otherProps
}: SparkleBoxProps) => {
  const pathRef = useRef<SVGRectElement | null>(null);
  const progress = useMotionValue(0);

  useAnimationFrame((time) => {
    const length = pathRef.current?.getTotalLength();
    if (length) {
      const pxPerMs = length / duration;
      progress.set((time * pxPerMs) % length);
    }
  });

  const x = useTransform(progress, (val) =>
    pathRef.current?.getPointAtLength(val).x
  );
  const y = useTransform(progress, (val) =>
    pathRef.current?.getPointAtLength(val).y
  );

  const transform = useMotionTemplate`translateX(${x}px) translateY(${y}px) translateX(-50%) translateY(-50%)`;

  return (
    <>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="absolute w-full h-full"
        preserveAspectRatio="none"
        {...otherProps}
      >
        <rect ref={pathRef} fill="none" width="100%" height="100%" rx={rx} ry={ry} />
      </svg>
      <motion.div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          transform,
        }}
      >
        {children}
      </motion.div>
    </>
  );
};
