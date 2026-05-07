import { NavLink } from "react-router-dom";
import { Outlet } from "react-router-dom";

const dashboardLinks = [
  { label: "Overview", path: "/dashboard", icon: "fa-solid fa-chart-line" },
  {
    label: "Listings",
    path: "/dashboard/listings",
    icon: "fa-solid fa-list",
  },
  { label: "Orders", path: "/dashboard/orders", icon: "fa-solid fa-box" },
  { label: "Settings", path: "/dashboard/settings", icon: "fa-solid fa-gear" },
];

function Dashboard() {
  return (
    <div>
      {/* Mobile submenu */}
      <div className="flex mt-20 md:hidden overflow-x-auto scrollbar-hide gap-2 px-4 py-3 bg-white border-b border-gray-100">
        {dashboardLinks.map((link) => (
          <NavLink
            key={link.path}
            to={link.path}
            end
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-200 ${
                isActive
                  ? "bg-[#1A5C2A] text-white"
                  : "text-gray-500 hover:bg-gray-100 hover:text-[#1A5C2A]"
              }`
            }
          >
            <i className={`${link.icon} w-4`}></i>
            {link.label}
          </NavLink>
        ))}
      </div>

      {/* Two column layout */}
      <div className="flex  md:grid-cols-2 bg-white min-h-screen gap-2">
        {/* left panel */}
        <div className="bg-green-50 hidden md:flex min-h-screen w-[30%] sticky top-20 mt-35 p-3">
          <div className="border-r border-gray-100  w-full ">
            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest px-4 mb-3">
              Dashboard
            </p>
            <div className="flex flex-col gap-1">
              {dashboardLinks.map((link) => (
                <NavLink
                  key={link.path}
                  to={link.path}
                  end
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-200 ${
                      isActive
                        ? "bg-[#1A5C2A] text-white"
                        : "text-gray-500 hover:bg-gray-100 hover:text-[#1A5C2A]"
                    }`
                  }
                >
                  <i className={`${link.icon} w-4`}></i>
                  {link.label}
                </NavLink>
              ))}
            </div>
          </div>
        </div>
        {/* right panel */}
        <div className="min-h-screen w-full md:w-[70%] md:mt-40 ">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
