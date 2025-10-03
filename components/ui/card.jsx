// components/ui/Card.jsx
export function Card({ children, className }) {
  return (
    <div className={`bg-white shadow rounded-lg p-4 ${className}`}>
      {children}
    </div>
  );
}

export function CardHeader({ children }) {
  return <div className="mb-2">{children}</div>;
}

export function CardTitle({ children }) {
  return <h3 className="text-gray-700 font-semibold">{children}</h3>;
}

export function CardContent({ children }) {
  return <div>{children}</div>;
}
