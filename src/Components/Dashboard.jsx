import { supabase } from "../supabaseClient";
import { useState, useEffect } from "react";

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

function Dashboard({ currentUser }) {
  // getting the registerUser from local storage and setting the role
  // const savedUser = JSON.parse(localStorage.getItem("theRegisteredUser"));
  // const isFarmer = savedUser?.role === "Farmer";

  const [isFarmer, setIsFarmer] = useState(false);

  useEffect(() => {
    const fetchUserProfile = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (user) {
        const { data: profile } = await supabase
          .from("profiles")
          .select("role")
          .eq("id", user.id)
          .single();
        console.log(profile?.role);

        if (profile?.role === "Farmer") {
          setIsFarmer(true);
        }
      }
    };
    fetchUserProfile();
  }, []);

  // filtering the link to get Listing and make it appear only with the role of farmer
  const filteredLink = dashboardLinks.filter((link) => {
    if (link.label === "Listings") {
      return isFarmer;
    }
    return true;
  });

  return (
    <div>
      {/* Mobile sidemenu */}
      <div className="flex md:hidden overflow-x-auto scrollbar-hide gap-2 px-4 py-3 border-b border-gray-100 sticky top-25 z-30">
        {filteredLink.map((link) => (
          <NavLink
            key={link.path}
            to={link.path}
            end
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-200 whitespace-nowrap ${
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
      <div className="flex w-full">
        {/* LEFT PANEL */}
        <div className="hidden md:flex sticky top-30 w-[30%] h-[calc(100vh-120px)] bg-linear-to-br from-emerald-950 via-emerald-900 to-green-800 p-6 z-30 shadow-xl shadow-emerald-950/10">
          <div className="border-r border-gray-100  w-full px-4 py-6 ">
            <p className="text-xs font-bold text-emerald-300 uppercase tracking-widest px-4 mb-3">
              Dashboard
            </p>
            <div className="flex flex-col gap-1">
              {filteredLink.map((link) => (
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

        {/* RIGHT PANEL  */}
        <div className="w-full md:w-[70%]overflow-y-auto">
          <Outlet context={{ currentUser }} />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
