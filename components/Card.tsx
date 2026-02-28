interface CardProps {
  children: React.ReactNode;
  className?: string;
}

export default function Card({ children, className = "" }: CardProps) {
  return (
    <div
      className={`bg-white rounded-xl shadow-md border border-gray-100 p-8 ${className}`}
    >
      {children}
    </div>
  );
}
