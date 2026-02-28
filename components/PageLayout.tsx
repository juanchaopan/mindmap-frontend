interface PageLayoutProps {
  children: React.ReactNode;
  center?: boolean;
}

/**
 * Full-page wrapper. Use center=true for auth/landing pages,
 * false (default) for app pages that provide their own structure.
 */
export default function PageLayout({
  children,
  center = false,
}: PageLayoutProps) {
  if (center) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        {children}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">{children}</div>
  );
}
