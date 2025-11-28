import { Link, Outlet, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { HomeIcon, PlusIcon, ListBulletIcon } from "@heroicons/react/24/outline";

export default function DashboardLayout() {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-gray-800 text-white flex flex-col">
        <div className="p-4 text-xl font-bold border-b border-gray-700">
          TaskManager
        </div>
        <nav className="flex-1">
          <ul className="space-y-2 p-4">
            <li>
              <Link to="/tasks" className="flex items-center gap-2 p-2 hover:bg-gray-700 rounded">
                <ListBulletIcon className="h-5 w-5" /> Tasks
              </Link>
            </li>
            <li>
              <Link to="/tasks/create" className="flex items-center gap-2 p-2 hover:bg-gray-700 rounded">
                <PlusIcon className="h-5 w-5" /> New Task
              </Link>
            </li>
          </ul>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top Bar */}
        <header className="bg-white p-4 shadow flex justify-between items-center">
          <h1 className="text-lg font-semibold">Dashboard</h1>
          <button
            onClick={handleLogout}
            className="text-red-600 border border-red-600 px-4 py-1 rounded hover:bg-red-600 hover:text-white transition"
          >
            Logout
          </button>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-6 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
