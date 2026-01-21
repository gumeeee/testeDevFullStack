import { type HTMLAttributes, forwardRef } from "react";

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface CardProps extends HTMLAttributes<HTMLDivElement> {}

export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className = "", children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={`bg-white rounded-xl shadow-lg p-6 ${className}`}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Card.displayName = "Card";
