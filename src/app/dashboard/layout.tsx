export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="container p-3">{children}</div>;
}
