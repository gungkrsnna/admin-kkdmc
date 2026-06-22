import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabase";
import toast from "react-hot-toast";

function LoginPage() {
  const navigate = useNavigate();

  const [loading, setLoading] =
    useState(false);

  const [formData, setFormData] =
    useState({
      email: "",
      password: "",
    });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const { error } =
        await supabase.auth
          .signInWithPassword({
            email:
              formData.email,
            password:
              formData.password,
          });

      if (error) throw error;

      navigate("/dashboard");

    } catch (error) {
      toast.error(
        error.message
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="
        min-h-screen
        bg-gradient-to-br
        from-slate-100
        to-slate-200
        flex
        items-center
        justify-center
        p-6
      "
    >
  
      <div
        className="
          w-full
          max-w-6xl
          bg-white
          rounded-[32px]
          overflow-hidden
          shadow-2xl
          grid
          grid-cols-1
          lg:grid-cols-2
        "
      >
  
        {/* Left Side */}
  
        <div
          className="
            hidden
            lg:flex
            flex-col
            justify-between
            bg-[#14213D]
            text-white
            p-12
          "
        >
  
          <div>
  
            <p
              className="
                uppercase
                tracking-[5px]
                text-sm
                text-white/50
              "
            >
              KK DMC
            </p>
  
            <h1
              className="
                mt-6
                text-6xl
                font-black
                leading-tight
              "
            >
              Travel
              <br />
              Management
              <br />
              Platform
            </h1>
  
            <p
              className="
                mt-8
                text-lg
                text-white/70
                max-w-md
                leading-relaxed
              "
            >
              Manage bookings,
              reservations,
              inquiries,
              customers,
              invoices and
              website content
              from one centralized
              dashboard.
            </p>
  
          </div>
  
          <div>
  
            <div
              className="
                border-t
                border-white/10
                pt-6
              "
            >
  
              <p className="text-white/50">
                KK DMC Admin Portal
              </p>
  
              <p className="mt-1 text-sm text-white/30">
                Destination Management Company
              </p>
  
            </div>
  
          </div>
  
        </div>
  
        {/* Right Side */}
  
        <div
          className="
            p-10
            lg:p-14
            flex
            flex-col
            justify-center
          "
        >
  
          <div className="max-w-md mx-auto w-full">
  
            <p
              className="
                text-primary
                font-semibold
              "
            >
              Welcome Back
            </p>
  
            <h2
              className="
                mt-2
                text-4xl
                font-black
              "
            >
              Sign In
            </h2>
  
            <p
              className="
                mt-3
                text-gray-500
              "
            >
              Sign in to access the
              KK DMC administration panel.
            </p>
  
            <form
              onSubmit={handleSubmit}
              className="
                mt-10
                space-y-5
              "
            >
  
              <div>
  
                <label
                  className="
                    block
                    mb-2
                    text-sm
                    font-medium
                  "
                >
                  Email Address
                </label>
  
                <input
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleChange}
                  className="
                    w-full
                    h-14
                    border
                    border-gray-200
                    rounded-2xl
                    px-5
                    focus:outline-none
                    focus:ring-2
                    focus:ring-primary/20
                  "
                />
  
              </div>
  
              <div>
  
                <label
                  className="
                    block
                    mb-2
                    text-sm
                    font-medium
                  "
                >
                  Password
                </label>
  
                <input
                  type="password"
                  name="password"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleChange}
                  className="
                    w-full
                    h-14
                    border
                    border-gray-200
                    rounded-2xl
                    px-5
                    focus:outline-none
                    focus:ring-2
                    focus:ring-primary/20
                  "
                />
  
              </div>
  
              <button
                type="submit"
                disabled={loading}
                className="
                  w-full
                  h-14
                  rounded-2xl
                  bg-[#14213D]
                  text-white
                  font-semibold
                  shadow-lg
                  transition
                  hover:opacity-90
                "
              >
                {loading
                  ? "Signing In..."
                  : "Sign In"}
              </button>
  
            </form>
  
          </div>
  
        </div>
  
      </div>
  
    </div>
  );
}

export default LoginPage;