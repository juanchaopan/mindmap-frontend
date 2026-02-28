interface AlertProps {
  message: string;
  variant?: "error" | "success" | "info";
}

const styles = {
  error: "bg-red-50 border-red-200 text-red-700",
  success: "bg-green-50 border-green-200 text-green-700",
  info: "bg-blue-50 border-blue-200 text-blue-700",
};

export default function Alert({ message, variant = "error" }: AlertProps) {
  return (
    <div
      role="alert"
      className={`text-sm border rounded-md px-3 py-2 ${styles[variant]}`}
    >
      {message}
    </div>
  );
}
