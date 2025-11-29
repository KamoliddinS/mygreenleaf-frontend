import AdminClient from "./AdminClient";
import Sidebar from "./components/Sidebar";

export const metadata = {
  title: "Admin Dashboard",
  description: "Admin management panel",
};

export default function AdminLayout({ children }) {
  return (
    <div className="flex bg-gray-50 min-h-screen">
      <AdminClient />
      <Sidebar />
      <main className="flex-1 p-6 bg-white overflow-auto h-[100vh]">{children}</main>
    </div>
  );
}