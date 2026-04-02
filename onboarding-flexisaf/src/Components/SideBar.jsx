import { useState } from "react";
import { NavLink } from "react-router-dom";

function SideBar() {
  const [isOpen, setIsOpen] = useState(false);

  const navLinkClasses = ({ isActive }) =>
    `block w-full text-left px-4 py-2 rounded-md transition-colors ${
      isActive
        ? "bg-blue-600 text-white font-medium"
        : "text-slate-300 hover:bg-slate-800 hover:text-slate-100"
    }`;

  return (
    <>
      {/* Mobile top bar */}
      <div className="bg-slate-900 text-slate-200 flex items-center justify-between p-4 md:hidden">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-slate-200 focus:outline-none"
        >
          {/* Hamburger icon */}
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
        <div className="font-semibold text-lg">Admissions System</div>
            {isOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </div>

      {/* Sidebar */}
      <aside
        className={`bg-slate-900 text-slate-200 flex flex-col h-screen
        fixed top-0 left-0 z-20 w-64 transform transition-transform
        md:static md:translate-x-0
        ${isOpen ? "translate-x-0" : "-translate-x-full"} 
        `}
      >
        <div className="p-6 text-lg font-semibold border-b border-slate-800 md:hidden">
          Admissions System
        </div>

        <nav className="flex-1 p-4 space-y-1.5">
          <NavLink to="/dashboard" className={navLinkClasses}>
            Dashboard
          </NavLink>

          <NavLink to="/reports" className={navLinkClasses}>
            Reports
          </NavLink>

          <NavLink to="/settings" className={navLinkClasses}>
            Settings
          </NavLink>
        </nav>

        <div className="p-4 border-t border-slate-800">
          <div className="text-sm text-slate-400">Admin</div>
        </div>
      </aside>

      {/* Overlay for mobile when sidebar is open */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-10 md:hidden"
          onClick={() => setIsOpen(false)}
        ></div>
      )}
    </>
  );
}

export default SideBar;