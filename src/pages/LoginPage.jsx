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
        flex
        items-center
        justify-center
        bg-gray-100
        px-6
      "
    >
      <div
        className="
          bg-white
          w-full
          max-w-md
          rounded-3xl
          p-8
          shadow-lg
        "
      >
        <h1
          className="
            text-3xl
            font-black
            text-center
            mb-8
          "
        >
          KK DMC Admin
        </h1>

        <form
          onSubmit={handleSubmit}
          className="space-y-4"
        >
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={
              formData.email
            }
            onChange={
              handleChange
            }
            className="
              w-full
              h-12
              border
              rounded-xl
              px-4
            "
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={
              formData.password
            }
            onChange={
              handleChange
            }
            className="
              w-full
              h-12
              border
              rounded-xl
              px-4
            "
          />

          <button
            type="submit"
            disabled={loading}
            className="
              w-full
              h-12
              bg-primary
              text-white
              rounded-xl
              font-semibold
            "
          >
            {loading
              ? "Logging In..."
              : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;