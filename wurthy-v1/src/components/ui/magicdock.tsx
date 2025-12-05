"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  AnimatePresence,
} from "framer-motion";

type SpringOptions = {
  stiffness?: number;
  damping?: number;
  mass?: number;
  velocity?: number;
  restSpeed?: number;
  restDelta?: number;
};

const cn = (...classes: (string | undefined | false | null)[]) => {
  return classes.filter(Boolean).join(" ");
};

export type DockItemData = {
  id: number;
  icon: React.ReactNode;
  label: string;
  description?: string;
  image?: string;
  onClick: () => void;
  className?: string;
};

export type MagicDockProps = {
  items: DockItemData[];
  className?: string;
  distance?: number;
  panelHeight?: number;
  baseItemSize?: number;
  dockHeight?: number;
  magnification?: number;
  spring?: SpringOptions;
  variant?: "default" | "gradient" | "tooltip";
};

type DockItemProps = {
  item: DockItemData;
  mouseX: React.RefObject<number>;
  spring: SpringOptions;
  distance: number;
  baseItemSize: number;
  magnification: number;
  variant: "default" | "gradient" | "tooltip";
  setHoveredIndex: React.Dispatch<React.SetStateAction<number | null>>;
  hoveredIndex: number | null;
  isTouchDevice: boolean;
};

function DockItem({
  item,
  mouseX,
  spring,
  distance,
  magnification,
  baseItemSize,
  variant,
  setHoveredIndex,
  hoveredIndex,
  isTouchDevice,
}: DockItemProps) {
  const ref = useRef<HTMLDivElement>(null);
  const mouseXMotion = useMotionValue(0);
  const isHovered = useMotionValue(0);
  const x = useMotionValue(0);
  const tooltipSpringConfig = { stiffness: 100, damping: 5 };

  const rotate = useSpring(
    useTransform(x, [-100, 100], [-15, 15]),
    tooltipSpringConfig
  );
  const translateX = useSpring(
    useTransform(x, [-100, 100], [-20, 20]),
    tooltipSpringConfig
  );

  useEffect(() => {
    if (hoveredIndex === item.id) {
      isHovered.set(1);
    } else {
      isHovered.set(0);
    }
  }, [hoveredIndex, item.id, isHovered]);

  useEffect(() => {
    if (isTouchDevice) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const distance = e.clientX - (rect.x + rect.width / 2);
      mouseXMotion.set(distance);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [mouseXMotion, isTouchDevice]);

  const handleItemMouseMove = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    if (isTouchDevice) return;
    const halfWidth = event.currentTarget.offsetWidth / 2;
    x.set(event.nativeEvent.offsetX - halfWidth);
  };

  const targetSize = useTransform(
    mouseXMotion,
    [-distance, 0, distance],
    [baseItemSize, isTouchDevice ? baseItemSize : magnification, baseItemSize]
  );
  const size = useSpring(targetSize, spring);

  const getBorderStyles = () => {
    switch (variant) {
      case "gradient":
        return "border-transparent group-hover:border-slate-700 dark:border-white/[0.2]";
      case "tooltip":
        return "border-white/[0.4] group-hover:border-white";
      default:
        return "border-neutral-700";
    }
  };

  return (
    <motion.div
      ref={ref}
      className={`group relative ${item.className || ""}`}
      style={{
        width: size,
        height: size,
      }}
      onMouseEnter={() => !isTouchDevice && setHoveredIndex(item.id)}
      onMouseLeave={() => !isTouchDevice && setHoveredIndex(null)}
      onMouseMove={handleItemMouseMove}
      onClick={item.onClick}
      tabIndex={0}
      role="button"
      aria-haspopup="true"
    >
      <motion.div
        className={cn(
          "tw:relative tw:flex tw:h-full tw:w-full tw:items-center tw:justify-center tw:rounded-full tw:bg-black tw:border-2 tw:shadow-md tw:transition-colors tw:duration-300",
          getBorderStyles()
        )}
        initial={{}}
      >
        {item.image ? (
          <img
            src={item.image}
            alt={item.label}
            className="tw:h-full tw:w-full tw:rounded-full tw:object-cover tw:object-center tw:p-1"
          />
        ) : (
          <div className="tw:flex tw:items-center tw:justify-center">{item.icon}</div>
        )}
      </motion.div>

      {!isTouchDevice && (
        <AnimatePresence>
          {hoveredIndex === item.id && (
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.8 }}
              animate={{
                opacity: 1,
                y: -20,
                scale: 1,
                transition: {
                  type: "spring",
                  stiffness: 260,
                  damping: 10,
                },
              }}
              exit={{ opacity: 0, y: -10, scale: 0.8 }}
              style={
                variant === "tooltip"
                  ? {
                      translateX: translateX,
                      rotate: rotate,
                      whiteSpace: "nowrap",
                    }
                  : { whiteSpace: "nowrap" }
              }
              className={cn(
                "tw:absolute tw:z-50 tw:-translate-x-1/2 tw:flex-col tw:items-center tw:justify-center tw:rounded-md tw:bg-black tw:px-4 tw:py-2 tw:text-xs tw:shadow-xl",
                variant === "tooltip" ? "tw:-top-16" : "tw:-top-12"
              )}
            >
              {variant === "tooltip" && (
                <>
                  <div className="tw:absolute tw:inset-x-10 tw:-bottom-px tw:z-30 tw:h-px tw:w-[20%] tw:bg-gradient-to-r tw:from-transparent tw:via-emerald-500 tw:to-transparent" />
                  <div className="tw:absolute tw:-bottom-px tw:z-30 tw:h-px tw:w-[40%] tw:bg-gradient-to-r tw:from-transparent tw:via-sky-500 tw:to-transparent" />
                </>
              )}
              <div className="tw:relative tw:z-30 tw:text-base tw:font-bold tw:text-white">
                {item.label}
              </div>
              {item.description && (
                <div className="tw:text-xs tw:text-white/70">{item.description}</div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      )}
    </motion.div>
  );
}

export default function MagicDock({
  items,
  className = "",
  spring = { mass: 0.1, stiffness: 150, damping: 12 },
  magnification = 70,
  distance = 150,
  panelHeight = 64,
  dockHeight = 256,
  baseItemSize = 50,
  variant = "default",
}: MagicDockProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const mouseX = useRef<number>(Infinity as number);
  const isHovered = useMotionValue(0);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(pointer: coarse)");

    const handleChange = (e: MediaQueryListEvent) => {
      setIsTouchDevice(e.matches);
    };

    setIsTouchDevice(mediaQuery.matches);

    mediaQuery.addEventListener("change", handleChange);

    return () => {
      mediaQuery.removeEventListener("change", handleChange);
    };
  }, []);

  const maxHeight = Math.max(dockHeight, magnification + magnification / 2 + 4);
  const heightRow = useTransform(isHovered, [0, 1], [panelHeight, maxHeight]);
  const height = useSpring(heightRow, spring);

  const getBgStyles = () => {
    switch (variant) {
      case "gradient":
        return "bg-black/85 backdrop-blur-md";
      case "tooltip":
        return "bg-black/70 backdrop-blur-lg";
      default:
        return "bg-black/90";
    }
  };

  return (
    <motion.div
      style={{ height, scrollbarWidth: "none" }}
      className="tw:mx-2 tw:flex tw:max-w-full tw:items-center"
    >
      <motion.div
        onMouseMove={(e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
          if (!isTouchDevice) {
            isHovered.set(1);
            mouseX.current = e.pageX;
          }
        }}
        onMouseLeave={() => {
          if (!isTouchDevice) {
            isHovered.set(0);
            mouseX.current = Infinity;
          }
        }}
        className={cn(
          `absolute bottom-2 left-1/2 transform -translate-x-1/2 flex items-end w-fit gap-4 rounded-2xl border-neutral-700/50 border-2 pb-2 px-4 ${getBgStyles()}`,
          className
        )}
        style={{ height: panelHeight }}
        role="toolbar"
        aria-label="Application dock"
      >
        {items.map((item) => (
          <DockItem
            key={item.id}
            item={item}
            mouseX={mouseX}
            spring={spring}
            distance={distance}
            magnification={magnification}
            baseItemSize={baseItemSize}
            variant={variant}
            setHoveredIndex={setHoveredIndex}
            hoveredIndex={hoveredIndex}
            isTouchDevice={isTouchDevice}
          />
        ))}
      </motion.div>
    </motion.div>
  );
}