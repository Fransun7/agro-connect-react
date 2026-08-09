import { supabase } from "../supabaseClient";
import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { Outlet } from "react-router-dom";
import { useAuth } from "./Context/AuthContext";

const dashboardLinks = [
  { label: "Overview", path: "/dashboard", icon: "📊" },
  { label: "Listings", path: "/dashboard/listings", icon: "🌾" },
  { label: "Orders", path: "/dashboard/orders", icon: "📦" },
  { label: "Settings", path: "/dashboard/settings", icon: "⚙️" },
];

function Dashboard() {
  const { isAuth, currentUser } = useAuth();
  const [isFarmer, setIsFarmer] = useState(false);

  useEffect(() => {
    const fetchUserProfile = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const { data: profile } = await supabase
          .from("profiles")
          .select("role")
          .eq("id", user.id)
          .single();
        if (profile?.role === "Farmer") {
          setIsFarmer(true);
        }
      }
    };
    fetchUserProfile();
  }, []);

  const filteredLink = dashboardLinks.filter((link) => {
    if (link.label === "Listings") return isFarmer;
    return true;
  });

  return (
    <div className="bg-[var(--bg)] min-h-screen">
      {/* Mobile tab bar */}
      <div className="bg-[var(--bg)] border-b border-[var(--border-2)] flex md:hidden overflow-x-auto scrollbar-hide gap-1 px-3 py-2 sticky top-16 z-30">
        {filteredLink.map((link) => (
          <NavLink
            key={link.path}
            to={link.path}
            end
            className={({ isActive }) =>
              `flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all duration-200 whitespace-nowrap ${
                isActive
                  ? "bg-[var(--color-primary)]/10 text-[var(--color-primary)] border border-[var(--color-primary)]/20"
                  : "text-[var(--muted)] hover:text-[var(--text)] hover:bg-[var(--surface)]"
              }`
            }
          >
            <span>{link.icon}</span> {link.label}
          </NavLink>
        ))}
      </div>

      {/* Desktop two-column layout */}
      <div className="flex w-full">
        {/* Sidebar */}
        <div className="hidden md:flex sticky top-18 w-64 h-[calc(100vh-72px)] bg-gradient-to-b from-[var(--s2)] to-[var(--bg)] border-r border-[var(--border-2)] flex-col p-5 z-30 shrink-0">
          <p className="text-[var(--color-primary)] text-xs font-bold uppercase tracking-widest px-3 mb-4">Navigation</p>
          <div className="flex flex-col gap-1">
            {filteredLink.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                end
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-200 ${
                    isActive
                      ? "bg-[var(--color-primary)]/10 text-[var(--color-primary)] border border-[var(--color-primary)]/20"
                      : "text-[var(--muted)] hover:text-[var(--text)] hover:bg-[var(--surface)]"
                  }`
                }
              >
                <span className="text-base">{link.icon}</span>
                {link.label}
              </NavLink>
            ))}
          </div>

          {/* User info at bottom */}
          {currentUser && (
            <div className="mt-auto pt-5 border-t border-[var(--border-2)]">
              <div className="flex items-center gap-3 px-3">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-secondary)] flex items-center justify-center text-white text-xs font-bold shrink-0">
                  {(currentUser.fullName || "AU").split(" ").map(w => w[0]).join("").toUpperCase()}
                </div>
                <div className="min-w-0">
                  <p className="text-[var(--text)] text-xs font-semibold truncate">{currentUser.fullName || "Agro User"}</p>
                  <p className="text-[var(--muted)] text-[10px] truncate">{currentUser.role || "Buyer"}</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Main content */}
        <div className="flex-1 min-w-0 bg-[var(--bg)]">
          <Outlet context={{ currentUser }} />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
