import { supabase } from "../supabaseClient";
import { Wordmark } from "./CropbitLogo";
import { useState } from "react";
import { Navigate, NavLink } from "react-router-dom";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";

function Login() {
  const [role, setRole] = useState("buyer");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showSuccessCard, setShowSuccessCard] = useState(false);
  const [loginLoad, setLoginLoad] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoginLoad(true);

    try {
      const { data, error: authError } = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
      });

      if (authError) {
        alert(authError.message);
        setLoginLoad(false);
        return;
      }

      const user = data?.user;

      if (user) {
        const { data: profile, error: profileError } = await supabase
          .from("profiles")
          .select("role")
          .eq("id", user.id)
          .single();

        if (profileError) {
          console.error("Profile matching query failed:", profileError);
          alert("Failed to synchronize profile metadata attributes.");
          return;
        }

        if (profile?.role === "Farmer") {
          navigate("/dashboard");
          setLoginLoad(false);
        } else if (profile?.role === "Buyer") {
          navigate("/dashboard");
          setLoginLoad(false);
        } else {
          alert("Account layout configuration conflict detected.");
          setLoginLoad(false);
        }
      }
    } catch (err) {
      console.error("Cloud connection handshake crash:", err);
      alert("Server routing disruption encountered. Please test connection state.");
      setLoginLoad(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-[var(--bg)]">
      {/* Left Panel */}
      <div className="hidden lg:flex flex-col w-[45%] bg-gradient-to-br from-[var(--color-secondary)] via-[var(--color-secondary-deep)] to-[var(--bg)] px-12 py-20 relative overflow-hidden">
        {/* Decorative circles */}
        <div className="absolute -top-20 -left-20 w-72 h-72 rounded-full bg-[var(--color-primary)]/5" />
        <div className="absolute top-40 -right-10 w-48 h-48 rounded-full bg-[var(--color-primary)]/5" />
        <div className="absolute -bottom-10 left-20 w-96 h-96 rounded-full bg-[var(--color-primary)]/5" />

        <div className="relative z-10 flex flex-col gap-10 h-full justify-between">
          {/* Logo */}
          <div>
            <Wordmark size="md" lightText />
          </div>

          <div className="flex flex-col gap-8">
            <h1 className="text-4xl font-extrabold text-white leading-snug tracking-tight">
              Welcome back,
              <br />
              <span className="text-[var(--color-primary)]">We kept it</span>
              <br />
              fresh for you.
            </h1>
            <p className="text-[var(--muted)] text-base leading-relaxed max-w-xs">
              Your favourite farmers are still harvesting, your orders are still moving, and fresh produce is still waiting to reach your doorstep.
            </p>

            {/* Stats */}
            <div className="flex gap-6">
              {[["200+", "Farmers"], ["5k+", "Orders"], ["18", "States"]].map(([val, label], i) => (
                <div key={label} className="flex items-center gap-4">
                  {i > 0 && <div className="w-px h-8 bg-white/10" />}
                  <div className="flex flex-col">
                    <span className="text-white font-bold text-2xl">{val}</span>
                    <span className="text-[var(--color-primary)] text-xs font-semibold">{label}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quote */}
          <div className="border-l-2 border-[var(--color-primary)] pl-4">
            <p className="text-[var(--muted)] text-sm italic leading-relaxed">
              "Every morning I log in to check my orders. Cropbit has made selling my harvest faster than going to the market."
            </p>
            <p className="text-white text-xs font-semibold mt-2">John Dee, Abuja</p>
          </div>
        </div>
      </div>

      {/* Right Panel */}
      <div className="flex-1 flex flex-col justify-center px-6 md:px-12 lg:px-16 py-16 bg-[var(--bg)]">
        <div className="max-w-md w-full mx-auto">
          {/* Mobile logo */}
          <div className="mb-8 lg:hidden">
            <Wordmark size="sm" />
          </div>

          <h2 className="text-2xl md:text-3xl font-extrabold text-[var(--text)] mb-2 tracking-tight">
            Login to your account
          </h2>
          <p className="text-[var(--muted)] text-sm mb-8">
            Don't have an account?{" "}
            <NavLink to="/register" className="text-[var(--color-primary)] font-semibold hover:underline">
              Sign up free
            </NavLink>
          </p>

          <form onSubmit={handleLogin}>
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-semibold text-[var(--muted)]">Email Address</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="bg-[var(--surface)] border border-[var(--border)] focus:border-[var(--color-primary)] rounded-xl px-4 py-3 text-sm text-[var(--text)] outline-none transition-all placeholder-[var(--subtle)]"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-semibold text-[var(--muted)]">Password</label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Min. 8 characters"
                    className="w-full bg-[var(--surface)] border border-[var(--border)] focus:border-[var(--color-primary)] rounded-xl px-4 py-3 text-sm text-[var(--text)] outline-none transition-all placeholder-[var(--subtle)]"
                  />
                  <button
                    onClick={() => setShowPassword(!showPassword)}
                    type="button"
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-[var(--muted)] hover:text-[var(--text)] text-xs font-bold"
                  >
                    {showPassword ? "HIDE" : "SHOW"}
                  </button>
                </div>
              </div>

              <button
                onClick={handleLogin}
                disabled={loginLoad}
                className="w-full bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] disabled:bg-[var(--border)] disabled:text-[var(--muted)] text-[var(--bg)] font-bold py-3.5 rounded-xl transition-all flex items-center justify-center gap-2 shadow-lg shadow-[var(--color-primary)]/20 mt-2"
              >
                {loginLoad ? (
                  <>
                    <div className="w-4 h-4 border-2 border-[var(--bg)]/30 border-t-[var(--bg)] rounded-full animate-spin" />
                    <span>Logging in...</span>
                  </>
                ) : (
                  "Login →"
                )}
              </button>

              <div className="flex items-center gap-3 my-1">
                <div className="flex-1 h-px bg-[var(--surface)]" />
                <span className="text-[var(--subtle)] text-xs">or continue with</span>
                <div className="flex-1 h-px bg-[var(--surface)]" />
              </div>

              <button
                type="button"
                className="flex items-center justify-center gap-3 bg-[var(--surface)] border border-[var(--border)] hover:border-[var(--subtle)] text-[var(--muted)] font-semibold text-sm py-3 rounded-xl transition-all"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                Continue with Google
              </button>
            </div>
          </form>
        </div>
      </div>

      {showSuccessCard && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-[var(--surface)] border border-[var(--border)] rounded-3xl p-8 max-w-sm w-full shadow-2xl text-center">
            <div className="w-16 h-16 bg-[var(--color-primary)]/10 border border-[var(--color-primary)]/20 rounded-full flex items-center justify-center mx-auto mb-5 text-3xl">✓</div>
            <h2 className="text-2xl font-bold text-[var(--text)] mb-2">Login Successful!</h2>
          </div>
        </div>
      )}
    </div>
  );
}

export default Login;
