import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "motion/react";

import { useState } from "react";

export const HoverEffect = ({
  items,
  className,
}: {
  items: {
    title: string;
    description: string;
    link: string;
  }[];
  className?: string;
}) => {
  let [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div
      className={cn(
        "tw:grid tw:grid-cols-1 tw:md:grid-cols-2 tw: tw:lg:grid-cols-3 tw: tw:py-10",
        className
      )}
    >
      {items.map((item, idx) => (
        <a
          href={item?.link}
          key={item?.link}
          className="tw:relative tw:group tw: tw:block tw:p-2 tw:h-full tw:w-full"
          onMouseEnter={() => setHoveredIndex(idx)}
          onMouseLeave={() => setHoveredIndex(null)}
        >
          <AnimatePresence>
            {hoveredIndex === idx && (
              <motion.span
                className="tw:absolute tw:inset-0 tw:h-full tw:w-full tw:bg-neutral-200 tw:dark:bg-slate-800/[0.8] tw:block tw: tw:rounded-3xl"
                layoutId="hoverBackground"
                initial={{ opacity: 0 }}
                animate={{
                  opacity: 1,
                  transition: { duration: 0.15 },
                }}
                exit={{
                  opacity: 0,
                  transition: { duration: 0.15, delay: 0.2 },
                }}
              />
            )}
          </AnimatePresence>
          <Card>
            <CardTitle>{item.title}</CardTitle>
            <CardDescription>{item.description}</CardDescription>
          </Card>
        </a>
      ))}
    </div>
  );
};

export const Card = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        "tw:rounded-2xl tw:h-full tw:w-full tw:p-4 tw:overflow-hidden tw:bg-black tw:border tw:border-transparent tw:dark:border-white/[0.2] tw:group-hover:border-slate-700 tw:relative tw:z-20",
        className
      )}
    >
      <div className="tw:relative tw:z-50">
        <div className="tw:p-4">{children}</div>
      </div>
    </div>
  );
};
export const CardTitle = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <h4 className={cn("tw:text-zinc-100 tw:font-bold tw:tracking-wide tw:mt-4", className)}>
      {children}
    </h4>
  );
};
export const CardDescription = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <p
      className={cn(
        "tw:mt-8 tw:text-zinc-400 tw:tracking-wide tw:leading-relaxed tw:text-sm",
        className
      )}
    >
      {children}
    </p>
  );
};
