"use client";

interface ButtonProps {
  children: React.ReactNode;
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
  disabled?: boolean;
  loading?: boolean;
  variant?: "primary" | "secondary";
  fullWidth?: boolean;
}

export default function Button({
  children,
  type = "button",
  onClick,
  disabled,
  loading,
  variant = "primary",
  fullWidth,
}: ButtonProps) {
  const base =
    "inline-flex items-center justify-center px-4 py-2 rounded-md text-sm font-medium " +
    "transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 " +
    "disabled:cursor-not-allowed select-none";

  const variants = {
    primary:
      "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500 " +
      "disabled:bg-blue-300 disabled:text-white",
    secondary:
      "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 " +
      "focus:ring-blue-500 disabled:bg-gray-50 disabled:text-gray-400",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={`${base} ${variants[variant]} ${fullWidth ? "w-full" : ""}`}
    >
      {loading ? (
        <span className="flex items-center gap-2">
          <svg
            className="animate-spin h-4 w-4"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8v8H4z"
            />
          </svg>
          Loading…
        </span>
      ) : (
        children
      )}
    </button>
  );
}
