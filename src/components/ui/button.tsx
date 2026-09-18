import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "group/btn inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full font-semibold transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 disabled:pointer-events-none disabled:opacity-60",
  {
    variants: {
      variant: {
        primary:
          "bg-gradient-to-r from-primary via-primary-light to-accent text-white shadow-glow-primary hover:-translate-y-0.5 hover:shadow-glow",
        outline:
          "border border-white/15 text-white/90 backdrop-blur hover:border-primary/60 hover:bg-primary/10 hover:text-white",
        ghost: "text-ink-soft hover:bg-white/5 hover:text-white",
        glow:
          "border border-accent/40 bg-accent/10 text-white shadow-glow hover:bg-accent/20 hover:-translate-y-0.5",
      },
      size: {
        sm: "h-9 px-4 text-xs",
        md: "h-11 px-6 text-sm",
        lg: "h-13 px-8 text-base",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  href?: string;
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, href, ...props }, ref) => {
    if (href) {
      return (
        <a
          href={href}
          className={cn(buttonVariants({ variant, size, className }))}
          data-cursor="button"
        >
          {props.children}
        </a>
      );
    }
    return (
      <button
        ref={ref}
        className={cn(buttonVariants({ variant, size, className }))}
        data-cursor="button"
        {...props}
      />
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };