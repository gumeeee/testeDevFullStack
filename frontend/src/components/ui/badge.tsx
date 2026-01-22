interface BadgeProps {
  children: React.ReactNode;
  variant?: "admin" | "moderator" | "reader";
  className?: string;
}

export function Badge({
  children,
  variant = "reader",
  className = "",
}: BadgeProps) {
  const variants = {
    admin: "bg-purple-100 text-purple-800 border-purple-200",
    moderator: "bg-blue-100 text-blue-800 border-blue-200",
    reader: "bg-gray-100 text-gray-800 border-gray-200",
  };

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${variants[variant]} 
  ${className}`}
    >
      {children}
    </span>
  );
}
