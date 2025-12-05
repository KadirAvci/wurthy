"use client";

import { motion, AnimatePresence, type PanInfo } from "framer-motion";
import React, { useState, useEffect, useRef } from "react";
import { useTheme } from "next-themes";

interface NavItem {
  href: string;
  label: string;
}

interface LamphomeProps {
  title?: string;
  description?: string;
  logoSrc?: string;
  logoAlt?: string;
  navItems?: NavItem[];
  children?: React.ReactNode;
  className?: string;
}

export function Lamphome({
  title,
  description,
  logoSrc,
  logoAlt,
  navItems = [],
  children,
  className = "",
}: LamphomeProps) {
  const [chainPulled, setChainPulled] = useState(false);
  const [chainLength, setChainLength] = useState(48);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dragY, setDragY] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [showGlow, setShowGlow] = useState(false);
  const [glowPosition, setGlowPosition] = useState<'above' | 'below'>('below');

  const titleRef = useRef<HTMLHeadingElement>(null);
  const navBarRef = useRef<HTMLDivElement>(null);

  const { theme, setTheme, resolvedTheme } = useTheme();
  const isDarkMode = resolvedTheme === "dark";

  useEffect(() => {
    if (resolvedTheme === "dark") {
      setChainPulled(true);
      setShowGlow(true);
      setGlowPosition("above");
      setChainLength(72);
    } else {
      setChainPulled(false);
      setShowGlow(false);
      setGlowPosition("below");
      setChainLength(48);
    }
  }, [resolvedTheme]);

  const calculateGlowPosition = (currentDragY: number) => {
    if (!titleRef.current || !navBarRef.current) return "below";
    const navBarRect = navBarRef.current.getBoundingClientRect();
    const titleRect = titleRef.current.getBoundingClientRect();
    const chainEndY = navBarRect.bottom + chainLength + currentDragY;
    const titleCenterY = titleRect.top + titleRect.height / 2;
    return chainEndY < titleCenterY ? "above" : "below";
  };

  const handleDragStart = () => {
    setIsDragging(true);
  };

  const handleDragEnd = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    setIsDragging(false);
    const finalDragY = Math.max(0, info.offset.y);
    if (finalDragY > 8) {
      const newTheme = theme === "dark" ? "light" : "dark";
      setTheme(newTheme);
      setChainPulled(newTheme === "dark");
      setChainLength(newTheme === "dark" ? 72 : 48);
      setShowGlow(newTheme === "dark");
    }
    setTimeout(() => {
      setDragY(0);
    }, 100);
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <div
      className={`min-h-full w-full flex flex-col items-center justify-start pt-2 [@media(min-width:480px)]:pt-4 [@media(min-width:768px)]:pt-6 [@media(min-width:1024px)]:pt-8 transition-all duration-500 text-gray-900 dark:text-white ${className}`}
    >
      <motion.div
        ref={navBarRef}
        initial={{ width: "95%" }}
        animate={{ width: "95%" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="tw:relative tw:flex tw:items-center tw:justify-between tw:w-full tw:max-w-4xl tw:h-auto tw:py-3 tw:px-3 tw:[@media(min-width:768px)]:px-6 tw:bg-white/80 tw:dark:bg-neutral-950 tw:backdrop-blur-sm tw:border tw:border-gray-200 tw:dark:border-gray-700 tw:rounded-2xl tw:shadow-lg tw:hover:shadow-xl tw:transition-all tw:duration-300"
      >
        {logoSrc && (
          <div className="tw:flex-shrink-0">
            <img
              src={logoSrc}
              alt={logoAlt || "Logo"}
              width={28}
              height={28}
              className="tw:cursor-pointer tw:hover:scale-110 tw:transition-transform tw:duration-200"
            />
          </div>
        )}

        <nav className="tw:hidden tw:[@media(min-width:640px)]:flex tw:items-center tw:space-x-4 tw:[@media(min-width:768px)]:space-x-6">
          {navItems.map((item, index) => (
            <a
              key={index}
              href={item.href}
              className="tw:text-sm tw:[@media(min-width:768px)]:text-base tw:font-medium tw:text-gray-700 tw:dark:text-gray-200 tw:hover:text-gray-900 tw:dark:hover:text-white tw:transition-colors tw:duration-200 tw:relative tw:group"
            >
              {item.label}
              <span className="tw:absolute tw:-bottom-1 tw:left-0 tw:w-0 tw:h-0.5 tw:bg-gradient-to-r tw:from-blue-500 tw:to-purple-500 tw:group-hover:w-full tw:transition-all tw:duration-300"></span>
            </a>
          ))}
        </nav>

        <div className="tw:flex tw:items-center tw:space-x-2">
          <button
            onClick={toggleMobileMenu}
            className="tw:[@media(min-width:640px)]:hidden tw:flex tw:justify-center tw:items-center tw:p-2 tw:bg-gray-100 tw:dark:bg-neutral-900 tw:rounded-lg tw:hover:bg-gray-200 tw:dark:hover:bg-slate-600 tw:transition-colors tw:duration-200"
          >
            <motion.svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              animate={{ rotate: mobileMenuOpen ? 90 : 0 }}
              transition={{ duration: 0.2 }}
            >
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </motion.svg>
          </button>
        </div>

        <div className="tw:absolute tw:right-3 tw:top-full tw:mt-2 tw:flex tw:flex-col tw:items-center tw:group tw:z-10">
          <motion.div
            className="tw:w-1 tw:bg-gradient-to-b tw:from-gray-400 tw:to-gray-600 tw:dark:from-gray-500 tw:dark:to-gray-300 tw:rounded-full tw:shadow-sm tw:relative"
            animate={{
              height: chainLength + dragY,
              scaleY: 1,
            }}
            transition={{
              duration: isDragging ? 0.05 : 0.6,
              ease: isDragging ? "linear" : "easeOut",
              type: isDragging ? "tween" : "spring",
              stiffness: isDragging ? undefined : 200,
              damping: isDragging ? undefined : 20,
            }}
            style={{
              height: `${chainLength + dragY}px`,
              transformOrigin: "top center",
            }}
          >
            {dragY > 4 && (
              <div className="tw:absolute tw:inset-0 tw:flex tw:flex-col tw:justify-evenly">
                {Array.from({ length: Math.floor((chainLength + dragY) / 8) }).map(
                  (_, i) => (
                    <div
                      key={i}
                      className="tw:w-full tw:h-0.5 tw:bg-gray-500 tw:dark:bg-gray-400 tw:rounded-full tw:opacity-40"
                    />
                  )
                )}
              </div>
            )}
          </motion.div>
          <motion.div
            drag="y"
            dragConstraints={{ top: 0, bottom: 12 }}
            dragElastic={0}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
            onDrag={(event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
              const newDragY = Math.max(0, info.offset.y);
              setDragY(newDragY);
              if (newDragY > 4) {
                const position = calculateGlowPosition(newDragY);
                setGlowPosition(position);
              }
            }}
            whileHover={{ scale: 1.05 }}
            whileDrag={{
              scale: 1.12,
              boxShadow: `0 ${6 + dragY * 0.3}px ${14 + dragY * 0.3}px rgba(0,0,0,0.3)`,
            }}
            className="tw:w-6 tw:h-6 tw:bg-gradient-to-br tw:from-yellow-400 tw:to-yellow-600 tw:dark:from-yellow-300 tw:dark:to-yellow-500 tw:rounded-full tw:shadow-lg tw:border-2 tw:border-yellow-500 tw:dark:border-yellow-400 tw:transition-shadow tw:duration-200 tw:relative tw:overflow-hidden tw:cursor-grab tw:active:cursor-grabbing"
            animate={{
              rotateZ: chainPulled ? 180 : 0,
            }}
            transition={{
              duration: 0.5,
              ease: "easeInOut",
            }}
            style={{ position: "relative", top: -20, y: 0 }}
          >
            <div className="tw:w-full tw:h-full tw:rounded-full tw:bg-gradient-to-br tw:from-yellow-300 tw:to-transparent tw:opacity-60"></div>
            <div className="tw:absolute tw:inset-0 tw:flex tw:items-center tw:justify-center">
              <div className="tw:flex tw:flex-col tw:space-y-0.5">
                <motion.div
                  className="tw:w-3 tw:h-0.5 tw:bg-yellow-700 tw:dark:bg-yellow-200 tw:rounded-full tw:opacity-60"
                  animate={{ scaleX: 1 + dragY * 0.02 }}
                />
                <motion.div
                  className="tw:w-3 tw:h-0.5 tw:bg-yellow-700 tw:dark:bg-yellow-200 tw:rounded-full tw:opacity-60"
                  animate={{ scaleX: 1 + dragY * 0.02 }}
                />
                <motion.div
                  className="tw:w-3 tw:h-0.5 tw:bg-yellow-700 tw:dark:bg-yellow-200 tw:rounded-full tw:opacity-60"
                  animate={{ scaleX: 1 + dragY * 0.02 }}
                />
              </div>
            </div>
            {isDarkMode && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="tw:absolute tw:inset-0 tw:flex tw:items-center tw:justify-center tw:bg-yellow-500/90 tw:dark:bg-yellow-400/90 tw:rounded-full tw:backdrop-blur-sm"
              >
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="tw:text-gray-800"
                >
                  <circle cx="12" cy="12" r="5" />
                  <line x1="12" y1="1" x2="12" y2="3" />
                  <line x1="12" y1="21" x2="12" y2="23" />
                  <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                  <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                  <line x1="1" y1="12" x2="3" y2="12" />
                  <line x1="21" y1="12" x2="23" y2="12" />
                  <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                  <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
                </svg>
              </motion.div>
            )}
            {!isDragging && !chainPulled && (
              <motion.div
                className="tw:absolute tw:-bottom-10 tw:left-1/2 tw:transform tw:-translate-x-1/2 tw:text-xs tw:text-gray-500 tw:dark:text-gray-400 tw:whitespace-nowrap tw:pointer-events-none tw:bg-white/80 tw:dark:bg-slate-800/80 tw:px-2 tw:py-1 tw:rounded-full"
                initial={{ opacity: 0, y: -5 }}
                animate={{
                  opacity: [0, 1, 1, 0],
                  y: [0, -2, -2, 0],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  repeatDelay: 2,
                  ease: "easeInOut",
                }}
              >
                Pull to toggle theme!
              </motion.div>
            )}
            {isDragging && dragY > 4 && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{
                  opacity: dragY > 8 ? 1 : 0.7,
                  scale: dragY > 8 ? 1.1 : 1,
                }}
                className={`absolute -bottom-12 left-1/2 transform -translate-x-1/2 text-xs text-white px-3 py-1.5 rounded-full whitespace-nowrap pointer-events-none font-medium transition-all duration-200 ${glowPosition === "above" ? "bg-purple-600" : "bg-amber-600"
                  }`}
              >
                {dragY > 8
                  ? `🌟 Release for ${glowPosition === "above" ? "Dark" : "Light"} Mode!`
                  : `Pull ${Math.round(8 - dragY)}px more`}
              </motion.div>
            )}
            {!isDragging && dragY > 0 && (
              <motion.div
                className="tw:absolute tw:inset-0 tw:rounded-full tw:bg-yellow-300 tw:opacity-30"
                initial={{ scale: 1.2, opacity: 0.5 }}
                animate={{ scale: 1, opacity: 0 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              />
            )}
          </motion.div>
        </div>

        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="tw:absolute tw:top-full tw:left-0 tw:right-0 tw:mt-2 tw:[@media(min-width:640px)]:hidden tw:bg-white tw:dark:bg-neutral-950 tw:border tw:border-gray-200 tw:dark:border-gray-700 tw:rounded-xl tw:shadow-lg tw:backdrop-blur-sm tw:z-50"
            >
              <nav className="tw:flex tw:flex-col tw:py-2">
                {navItems.map((item, index) => (
                  <a
                    key={index}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="tw:px-4 tw:py-3 tw:text-sm tw:font-medium tw:text-gray-700 tw:dark:text-gray-200 tw:hover:text-gray-900 tw:dark:hover:text-white tw:hover:bg-gray-50 tw:dark:hover:bg-slate-700 tw:transition-colors tw:duration-200"
                  >
                    {item.label}
                  </a>
                ))}
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {isDarkMode && (
        <motion.div
          initial={{ width: 0, opacity: 0 }}
          animate={{
            width: showGlow ? "80%" : 0,
            opacity: showGlow ? 1 : 0,
          }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="tw:relative tw:max-w-3xl tw:mt-6 tw:h-0.5 tw:bg-gradient-to-r tw:from-transparent tw:via-purple-400 tw:to-transparent"
          style={{
            boxShadow: showGlow
              ? "0 0 20px #A855F7, 0 0 40px rgba(168, 85, 247, 0.6), 0 0 60px rgba(168, 85, 247, 0.4)"
              : "none",
          }}
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: showGlow ? 1 : 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="tw:absolute tw:top-full tw:left-1/2 tw:transform tw:-translate-x-1/2 tw:w-full tw:h-20 tw:pointer-events-none"
            style={{
              background: showGlow
                ? "radial-gradient(ellipse, rgba(168, 85, 247, 0.3) 0%, rgba(168, 85, 247, 0.1) 50%, transparent 100%)"
                : "none",
              filter: showGlow ? "blur(15px)" : "none",
            }}
          />
        </motion.div>
      )}
      {title && (
        <motion.h1
          ref={titleRef}
          className="tw:mt-6 tw:[@media(min-width:480px)]:mt-8 tw:text-xl tw:[@media(min-width:480px)]:text-2xl tw:[@media(min-width:640px)]:text-3xl tw:[@media(min-width:768px)]:text-4xl tw:[@media(min-width:1024px)]:text-5xl tw:[@media(min-width:1280px)]:text-6xl tw:font-bold tw:bg-gradient-to-r tw:from-gray-900 tw:via-gray-700 tw:to-gray-900 tw:dark:from-white tw:dark:via-gray-200 tw:dark:to-white tw:bg-clip-text tw:text-transparent tw:text-center tw:px-4 tw:max-w-4xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          {title}
        </motion.h1>
      )}
      {!isDarkMode && (
        <motion.div
          initial={{ width: "60%", opacity: 1 }}
          animate={{
            width: "60%",
            opacity: 1,
          }}
          transition={{ duration: 0.8 }}
          className="tw:border-t tw:mt-4 tw:max-w-2xl tw:border-gray-300"
        />
      )}
      {description && (
        <motion.p
          className="tw:mt-4 tw:[@media(min-width:480px)]:mt-6 tw:text-center tw:text-xs tw:[@media(min-width:480px)]:text-sm tw:[@media(min-width:640px)]:text-base tw:[@media(min-width:768px)]:text-lg tw:text-gray-600 tw:dark:text-gray-300 tw:max-w-xs tw:[@media(min-width:480px)]:max-w-md tw:[@media(min-width:768px)]:max-w-2xl tw:px-4 tw:leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          {description}
        </motion.p>
      )}
      {children && (
        <motion.div
          className="tw:mt-6 tw:[@media(min-width:480px)]:mt-8 tw:w-full tw:flex tw:justify-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          {children}
        </motion.div>
      )}
    </div>
  );
}