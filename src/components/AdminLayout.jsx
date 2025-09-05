import { Outlet } from "react-router-dom";
import AdminNavbar from "./AdminNavbar";

const AdminLayout = () => {
  return (
    <>
      <AdminNavbar />
      <main className="admin-page">
        <Outlet />
      </main>
    </>
  );
};

export default AdminLayout;
