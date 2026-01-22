import { type ReactNode } from "react";

interface AlertProps {
  type?: "success" | "error" | "warning" | "info";
  children: ReactNode;
  onClose?: () => void;
}

export function Alert({ type = "info", children, onClose }: AlertProps) {
  const styles = {
    success: "bg-green-50 border-green-500 text-green-800",
    error: "bg-red-50 border-red-500 text-red-800 font-semibold",
    warning: "bg-yellow-50 border-yellow-500 text-yellow-800",
    info: "bg-blue-50 border-blue-500 text-blue-800",
  };

  return (
    <div
      className={`relative border-l-4 p-4 rounded ${styles[type]}`}
      role="alert"
    >
      <div className="flex items-center justify-between">
        <p className="text-sm">{children}</p>
        {onClose && (
          <button
            onClick={onClose}
            className="ml-4 text-gray-500 hover:text-gray-700"
            aria-label="Fechar"
          >
            ×
          </button>
        )}
      </div>
    </div>
  );
}
