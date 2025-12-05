import { cn } from "@/lib/utils";

interface Testimonial {
  name: string;
  image: string;
  description: string;
  handle: string;
}

interface AnimatedCanopyProps extends React.HTMLAttributes<HTMLDivElement> {
  vertical?: boolean;
  repeat?: number;
  reverse?: boolean;
  pauseOnHover?: boolean;
  applyMask?: boolean;
}

const AnimatedCanopy = ({
  children,
  vertical = false,
  repeat = 4,
  pauseOnHover = false,
  reverse = false,
  className,
  applyMask = true,
  ...props
}: AnimatedCanopyProps) => (
  <div
    {...props}
    className={cn(
      "tw:group tw:relative tw:flex tw:h-full tw:w-full tw:overflow-hidden tw:p-2 tw:[--duration:10s] tw:[--gap:12px] tw:[gap:var(--gap)]",
      vertical ? "tw:flex-col" : "tw:flex-row",
      className
    )}
  >
    {Array.from({ length: repeat }).map((_, index) => (
      <div
        key={`item-${index}`}
        className={cn("tw:flex tw:shrink-0 tw:[gap:var(--gap)]", {
          "group-hover:[animation-play-state:paused]": pauseOnHover,
          "[animation-direction:reverse]": reverse,
          "animate-canopy-horizontal flex-row": !vertical,
          "animate-canopy-vertical flex-col": vertical,
        })}
      >
        {children}
      </div>
    ))}
    {applyMask && (
      <div
        className={cn(
          "tw:pointer-events-none tw:absolute tw:inset-0 tw:z-10 tw:h-full tw:w-full tw:from-white/50 tw:from-5% tw:via-transparent tw:via-50% tw:to-white/50 tw:to-95% tw:dark:from-gray-800/50 tw:dark:via-transparent tw:dark:to-gray-800/50",
          vertical ? "tw:bg-gradient-to-b" : "tw:bg-gradient-to-r"
        )}
      />
    )}
  </div>
);

const TestimonialCard = ({
  testimonial,
  className,
}: {
  testimonial: Testimonial;
  className?: string;
}) => (
  <div
    className={cn(
      "tw:group tw:mx-2 tw:flex tw:h-32 tw:w-80 tw:shrink-0 tw:cursor-pointer tw:overflow-hidden tw:rounded-xl tw:border tw:border-transparent tw:p-3 tw:transition-all tw:hover:border-blue-400 tw:hover:shadow-[0_0_10px_#60a5fa] tw:dark:hover:border-blue-400",
      className
    )}
  >
    <div className="tw:flex tw:items-start tw:gap-3">
      <div className="tw:relative tw:h-12 tw:w-12 tw:shrink-0 tw:overflow-hidden tw:rounded-full tw:border-2 tw:border-gray-200 tw:dark:border-gray-600">
        <img
          src={testimonial.image}
          alt={testimonial.name}
          className="tw:h-full tw:w-full tw:not-prose tw:object-cover"
        />
      </div>
      <div className="tw:flex-1">
        <div className="tw:flex tw:items-baseline tw:gap-2">
          <span className="tw:text-sm tw:font-bold tw:text-foreground">
            {testimonial.name}
          </span>
          <span className="tw:text-xs tw:text-muted-foreground">
            {testimonial.handle}
          </span>
        </div>
        <p className="tw:mt-1 tw:line-clamp-3 tw:text-sm tw:text-foreground">
          {testimonial.description}
        </p>
      </div>
    </div>
  </div>
);

export const AnimatedTestimonials = ({
  data,
  className,
  cardClassName,
}: {
  data: Testimonial[];
  className?: string;
  cardClassName?: string;
}) => (
  <div className={cn("tw:w-full tw:overflow-x-hidden tw:py-4", className)}>
    {[false, true, false].map((reverse, index) => (
      <AnimatedCanopy
        key={`Canopy-${index}`}
        reverse={reverse}
        className="tw:[--duration:25s]"
        pauseOnHover
        applyMask={false}
        repeat={3}
      >
        {data.map((testimonial) => (
          <TestimonialCard
            key={testimonial.name}
            testimonial={testimonial}
            className={cardClassName}
          />
        ))}
      </AnimatedCanopy>
    ))}
  </div>
);