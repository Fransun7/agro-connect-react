import { createContext, useContext } from "react";
import { useState, useEffect } from "react";
import { supabase } from "../../supabaseClient";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [isAuth, setIsAuth] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // DECIDE ACTION IF SESSION EXIST OR NOT
  useEffect(() => {
    const profileName = async (sessionUser) => {
      if (!sessionUser) {
        setCurrentUser(null);
        return;
      }
      // getting session user full name
      const { data: profile } = await supabase
        .from("profiles")
        .select("full_name, farm_name, farm_location, role")
        .eq("id", sessionUser.id)
        .single();

      setCurrentUser({
        ...sessionUser,
        fullName: profile?.full_name || "Agro User",
        farmName: profile?.farm_name,
        farmLocation: profile?.farm_location,
        role: profile?.role,
      });
      setLoading(false);
    };

    // GETTING THE SESSION
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        setIsAuth(true);
        profileName(session.user);
      } else {
        setLoading(false);
      }
    });

    // LISTEN TO LOGIN STATE AND DECIDE ACTION BASED ON THE STATE
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (session) {
        setIsAuth(true);
        profileName(session.user);
      } else {
        setIsAuth(false);
        setCurrentUser(null);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return (
    <AuthContext.Provider value={{ isAuth, currentUser, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

// CUSTOM HOOK
export function useAuth() {
  return useContext(AuthContext);
}

export default AuthContext;
