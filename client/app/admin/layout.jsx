import SideNav from "../ui/admin/sidenav";

export default function AdminLayout({ children }) {
  return (
    <div className="flex h-screen flex-col md:flex-row md:overflow-hidden md:h-full bg-white">
      <div className="w-full flex-none md:w-64">
        <SideNav />
      </div>
      <div className="flex-grow p-6 md:overflow-y-auto md:p-12">{children}</div>
    </div>
  );
}
