import { cn } from "@/lib/utils";

interface LoadingSpinnerProps {
  className?: string;
  size?: "small" | "medium" | "large";
}

const sizeClasses = {
  small: "h-4 w-4",
  medium: "h-8 w-8",
  large: "h-12 w-12 border-b-4",
};

export default function LoadingSpinner({
  className,
  size = "medium",
}: LoadingSpinnerProps) {
  return (
    <div className="flex items-center justify-center w-full h-full">
      <div
        className={cn(
          "animate-spin rounded-full border-brand border-t-transparent border-b-2",
          sizeClasses[size],
          className,
        )}
      ></div>
    </div>
  );
}
