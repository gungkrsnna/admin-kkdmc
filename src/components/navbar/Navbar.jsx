import { useState, useRef, useEffect } from "react";
import {
  Bell,
  Search,
  ChevronDown,
  User,
  Settings,
  LogOut,
} from "lucide-react";
import {
  useNavigate
} from "react-router-dom";
import { supabase }
from "../../lib/supabase";

function Navbar() {
  const [openProfile, setOpenProfile] = useState(false);

  const dropdownRef = useRef(null);

  const navigate =
  useNavigate();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)
      ) {
        setOpenProfile(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
    };
  }, []);

  const handleLogout =
  async () => {

    try {

      await supabase.auth
        .signOut();

      localStorage.clear();

      navigate("/");

    } catch (error) {

      console.error(error);

    }

  };

  return (
    <header
      className="
        h-20
        bg-white
        border-b
        border-gray-200
        px-8
        flex
        items-center
        justify-between
      "
    >

      <div
        className="
          flex
          items-center
          gap-4
        "
      >

        <div
          className="
            flex
            items-center
            gap-3

            bg-gray-100
            px-4
            h-12

            rounded-xl
          "
        >
          <Search size={18} />

          <input
            placeholder="Search..."
            className="
              bg-transparent
              outline-none
            "
          />
        </div>

      </div>

      <div
        className="
          flex
          items-center
          gap-6
        "
      >

        <button
          className="
            relative
          "
        >
          <Bell size={20} />

          <span
            className="
              absolute
              -top-1
              -right-1

              w-2
              h-2

              bg-red-500
              rounded-full
            "
          />
        </button>

        <div
          ref={dropdownRef}
          className="relative"
        >

          <button
            onClick={() =>
              setOpenProfile(!openProfile)
            }
            className="
              flex
              items-center
              gap-3
              cursor-pointer
              rounded-xl
              px-2
              py-2
              hover:bg-gray-100
              transition
            "
          >
            <div
              className="
                w-10
                h-10
                rounded-full
                bg-[#14213D]
                text-white
                flex
                items-center
                justify-center
                font-bold
              "
            >
              A
            </div>

            <div className="text-left">
              <p className="font-semibold">
                Admin
              </p>

              <p className="text-xs text-gray-500">
                Administrator
              </p>
            </div>

            <ChevronDown
              size={16}
              className={`transition ${
                openProfile
                  ? "rotate-180"
                  : ""
              }`}
            />
          </button>

          {openProfile && (
            <div
              className="
                absolute
                right-0
                top-full
                mt-3

                w-56
                bg-white

                border
                border-gray-200

                rounded-2xl
                shadow-xl

                overflow-hidden
                z-50
              "
            >
              <button
                className="
                  w-full
                  px-4
                  py-3
                  flex
                  items-center
                  gap-3

                  hover:bg-gray-50
                "
              >
                <User size={18} />
                My Profile
              </button>

              <button
                className="
                  w-full
                  px-4
                  py-3
                  flex
                  items-center
                  gap-3

                  hover:bg-gray-50
                "
              >
                <Settings size={18} />
                Account Settings
              </button>

              <div className="border-t" />

              <button
                onClick={handleLogout}
                className="
                  w-full
                  px-4
                  py-3

                  flex
                  items-center
                  gap-3

                  text-red-600
                  hover:bg-red-50
                "
              >
                <LogOut size={18} />
                Logout
              </button>
            </div>
          )}

        </div>

      </div>

    </header>
  );
}

export default Navbar;