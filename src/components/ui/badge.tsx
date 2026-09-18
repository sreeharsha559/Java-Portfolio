import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center gap-1.5 rounded-full border px-3 py-1 font-mono text-[11px] font-medium tracking-wide",
  {
    variants: {
      variant: {
        default: "border-white/10 bg-white/5 text-ink-soft",
        primary: "border-primary/40 bg-primary/10 text-primary-light",
        accent: "border-accent/40 bg-accent/10 text-accent",
        outline: "border-white/15 bg-transparent text-ink-muted",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return <span className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export { Badge, badgeVariants };