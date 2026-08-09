import { supabase } from "../supabaseClient";
import { Wordmark } from "./CropbitLogo";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";

function Register() {
  const navigate = useNavigate();
  const [role, setRole] = useState("buyer");
  const [showPassword, setShowPassword] = useState(false);
  const [showSuccessCard, setShowSuccessCard] = useState(false);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    farmLocation: "",
    farmName: "",
    role: "",
  });

  const handleChange = (e) => {
    e.preventDefault();
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    const userRole = role === "farmer" ? "Farmer" : "Buyer";

    try {
      const { data, error } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: {
            fullName: formData.fullName,
            role: userRole,
            farmName: userRole === "Farmer" ? formData.farmName : null,
            farmLocation: userRole === "Farmer" ? formData.farmLocation : null,
          },
        },
      });

      if (error) {
        alert(error.message);
        return;
      }

      if (data?.user) {
        setShowSuccessCard(true);
        setTimeout(() => {
          setShowSuccessCard(false);
          navigate("/login");
        }, 2000);
      }
    } catch (err) {
      console.error("Cloud registration failed:", err);
      alert("Something went wrong connecting to the database server.");
    }
  };

  const inputClass = "bg-[var(--surface)] border border-[var(--border)] focus:border-[var(--color-primary)] rounded-xl px-4 py-3 text-sm text-[var(--text)] outline-none transition-all placeholder-[var(--subtle)] w-full";

  return (
    <div className="min-h-screen flex bg-[var(--bg)]">
      {/* Left Panel */}
      <div className="hidden lg:flex flex-col w-[45%] bg-gradient-to-br from-[var(--color-secondary)] via-[var(--color-secondary-deep)] to-[var(--bg)] px-12 py-20 relative overflow-hidden">
        <div className="absolute -top-20 -left-20 w-72 h-72 rounded-full bg-[var(--color-primary)]/5" />
        <div className="absolute top-40 -right-10 w-48 h-48 rounded-full bg-[var(--color-primary)]/5" />
        <div className="absolute -bottom-10 left-20 w-96 h-96 rounded-full bg-[var(--color-primary)]/5" />

        <div className="relative z-10 flex flex-col gap-10 h-full justify-between">
          <div>
            <Wordmark size="md" lightText />
          </div>

          <div className="flex flex-col gap-8">
            <h1 className="text-4xl font-extrabold text-white leading-snug tracking-tight">
              Fresh produce,
              <br />
              <span className="text-[var(--color-primary)]">direct from</span>
              <br />
              Nigerian farms.
            </h1>
            <p className="text-[var(--muted)] text-base leading-relaxed max-w-xs">
              Whether you grow it or eat it, Cropbit was built for you. Join a growing community of Nigerian farmers and buyers who are cutting out the middleman.
            </p>

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

          <div className="border-l-2 border-[var(--color-primary)] pl-4">
            <p className="text-[var(--muted)] text-sm italic leading-relaxed">
              "Cropbit helped me reach buyers across three states without leaving my farm."
            </p>
            <p className="text-white text-xs font-semibold mt-2">Emeka Okafor, Benue State</p>
          </div>
        </div>
      </div>

      {/* Right Panel */}
      <div className="flex-1 flex flex-col justify-center px-6 md:px-12 lg:px-16 py-16 bg-[var(--bg)] overflow-y-auto">
        <div className="max-w-md w-full mx-auto">
          <div className="mb-8 lg:hidden">
            <Wordmark size="sm" />
          </div>

          <h2 className="text-2xl md:text-3xl font-extrabold text-[var(--text)] mb-2 tracking-tight">
            Create your account
          </h2>
          <p className="text-[var(--muted)] text-sm mb-6">
            Already have an account?{" "}
            <NavLink to="/login" className="text-[var(--color-primary)] font-semibold hover:underline">
              Log in
            </NavLink>
          </p>

          {/* Role toggle */}
          <div className="flex bg-[var(--surface)] border border-[var(--border)] rounded-xl p-1 mb-6">
            <button
              onClick={() => setRole("buyer")}
              className={`flex-1 py-2.5 text-sm font-bold rounded-lg transition-all duration-200 ${
                role === "buyer"
                  ? "bg-[var(--color-primary)] text-[var(--bg)] shadow-sm"
                  : "text-[var(--muted)] hover:text-[var(--text)]"
              }`}
            >
              🛒 I'm a Buyer
            </button>
            <button
              onClick={() => setRole("farmer")}
              className={`flex-1 py-2.5 text-sm font-bold rounded-lg transition-all duration-200 ${
                role === "farmer"
                  ? "bg-[var(--color-primary)] text-[var(--bg)] shadow-sm"
                  : "text-[var(--muted)] hover:text-[var(--text)]"
              }`}
            >
              🌾 I'm a Farmer
            </button>
          </div>

          <form onSubmit={handleRegister}>
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-semibold text-[var(--muted)]">Full Name</label>
                <input type="text" name="fullName" value={formData.fullName} placeholder="e.g. Chidi Okafor" onChange={handleChange} className={inputClass} />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-semibold text-[var(--muted)]">Email Address</label>
                <input type="email" name="email" placeholder="you@example.com" value={formData.email} onChange={handleChange} className={inputClass} />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-semibold text-[var(--muted)]">Phone Number</label>
                <input type="tel" placeholder="08087654321" className={inputClass} />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-semibold text-[var(--muted)]">Age</label>
                <input type="number" id="age" name="age" min="0" max="120" className={inputClass} placeholder="e.g. 25" required />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-semibold text-[var(--muted)]">Gender</label>
                <select id="gender" name="gender" className={inputClass} required>
                  <option value="" disabled>Select an option</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="non-binary">Non-binary</option>
                  <option value="prefer-not-to-say">Prefer not to say</option>
                  <option value="other">Other</option>
                </select>
              </div>

              {role === "farmer" && (
                <div className="flex flex-col gap-3">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-sm font-semibold text-[var(--muted)]">Farm Location</label>
                    <input type="text" name="farmLocation" value={formData.farmLocation} onChange={handleChange} placeholder="e.g. Akure, Ondo State" className={inputClass} />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-sm font-semibold text-[var(--muted)]">Farm Name</label>
                    <input name="farmName" type="text" value={formData.farmName} onChange={handleChange} placeholder="e.g. Green Valley Farm" className={inputClass} />
                  </div>
                </div>
              )}

              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-semibold text-[var(--muted)]">Password</label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Min. 8 characters"
                    className={inputClass}
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

              <div className="flex items-start gap-3 mt-1">
                <input type="checkbox" id="terms" className="mt-0.5 accent-[var(--color-primary)] w-4 h-4 cursor-pointer" />
                <label htmlFor="terms" className="text-xs text-[var(--muted)] leading-relaxed cursor-pointer">
                  I agree to Cropbit's{" "}
                  <span className="text-[var(--color-primary)] font-semibold hover:underline cursor-pointer">Terms of Service</span>{" "}
                  and{" "}
                  <span className="text-[var(--color-primary)] font-semibold hover:underline cursor-pointer">Privacy Policy</span>
                </label>
              </div>

              <button
                type="submit"
                className="mt-2 bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-[var(--bg)] font-bold text-base py-3.5 rounded-xl transition-all shadow-lg shadow-[var(--color-primary)]/20"
              >
                Create Account →
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
            <div className="w-20 h-20 bg-[var(--color-primary)]/10 border border-[var(--color-primary)]/20 rounded-full flex items-center justify-center mx-auto mb-6 text-4xl">✓</div>
            <h2 className="text-2xl font-bold text-[var(--text)] mb-2">Welcome Aboard!</h2>
            <p className="text-[var(--muted)] mb-8">Your account has been created successfully. Ready to explore the farm?</p>
            <button
              onClick={() => navigate("/login")}
              className="w-full bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-[var(--bg)] font-bold py-4 rounded-2xl transition-all"
            >
              Continue to Login
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Register;
