import { HTMLAttributes } from "react";
import cn from "classnames";

export function Card({
  className,
  children,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("p-3 rounded-full bg-white shadow-md", className)}
      {...props}
    >
      {children}
    </div>
  );
}
