import { NavLink } from "react-router-dom";

const baseLinkClass =
  "rounded-xl px-4 py-2 text-sm font-medium transition-colors";

export const Navbar = () => {
  return (
    <div className="flex flex-wrap gap-2">
      <NavLink
        to="/dashboard"
        className={({ isActive }) =>
          `${baseLinkClass} ${
            isActive
              ? "bg-gray-900 !text-white"
              : "bg-white text-gray-700 border border-gray-200 hover:bg-gray-50"
          }`
        }
      >
        Dashboard
      </NavLink>

      <NavLink
        to="/tasks"
        className={({ isActive }) =>
          `${baseLinkClass} ${
            isActive
              ? "bg-gray-900 !text-white"
              : "bg-white text-gray-700 border border-gray-200 hover:bg-gray-50"
          }`
        }
      >
        Tasks
      </NavLink>
    </div>
  );
};
