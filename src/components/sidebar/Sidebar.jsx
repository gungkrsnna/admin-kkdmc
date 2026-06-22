import {
  LayoutDashboard,
  CalendarDays,
  MessageSquareText,
  Users,
  Package,
  Settings,
  FileText,
  Share2,
  Tags,
  Percent,
  Globe,
  ClipboardList,
  CreditCard,
  Receipt,
  ChevronDown,
  ChevronRight,
  Mail,
} from "lucide-react";

import { NavLink } from "react-router-dom";

import { useState } from "react";


function Sidebar() {

  const [contentOpen, setContentOpen] =
  useState(false);

  const menuGroups = [
    {
      title: "MAIN",
      items: [
        {
          name: "Dashboard",
          icon: LayoutDashboard,
          path: "/dashboard",
        },
      ],
    },

    {
      title: "WEBSITE",
      items: [
        {
          name: "Website Content",
          icon: FileText,
          children: [
            {
              name: "Home",
              path: "/content/home",
            },
            {
              name: "Product",
              path: "/content/product",
            },
            {
              name: "About Us",
              path: "/content/about",
            },
          ],
        },
        {
          name: "Social Media",
          icon: Share2,
          path: "/social-media",
        },
      ],
    },

    {
      title: "PRODUCT MANAGEMENT",
      items: [
        {
          name: "Categories",
          icon: Tags,
          path: "/categories",
        },
        {
          name: "Tour Packages",
          icon: Package,
          path: "/tour-packages",
        },
        {
          name: "Promotions",
          icon: Percent,
          path: "/promos",
        },
      ],
    },

    {
      title: "BOOKING MANAGEMENT",
      items: [
        {
          name: "Reservations",
          icon: CalendarDays,
          path: "/reservations",
        },
        {
          name: "Inquiries",
          icon: MessageSquareText,
          path: "/inquiries",
        },
        {
          name: "Contact Messages",
          icon: Mail,
          path: "/contact-messages",
        },
        {
          name: "Booking",
          icon: ClipboardList,
          path: "/bookings",
        },
      ],
    },

    {
      title: "CUSTOMERS",
      items: [
        {
          name: "Customers",
          icon: Users,
          path: "/customers",
        },
      ],
    },

    {
      title: "FINANCE",
      items: [
        // {
        //   name: "Payments",
        //   icon: CreditCard,
        //   path: "/payments",
        // },
        {
          name: "Invoices",
          icon: Receipt,
          path: "/invoices",
        },
      ],
    },

    // {
    //   title: "SYSTEM",
    //   items: [
    //     {
    //       name: "Users",
    //       icon: Users,
    //       path: "/users",
    //     },
    //   ],
    // },
  ];

  return (
    <aside
      className="
        w-72
        h-screen
        bg-[#14213D]
        text-white
        flex
        flex-col
      "
    >
      <div className="h-20 px-6 flex items-center border-b border-white/10">
        <div>
          <h1 className="font-black text-2xl">
            KK DMC
          </h1>

          <p className="text-sm text-white/60">
            Admin Panel
          </p>
        </div>
      </div>

      <nav
        className="
          flex-1
          overflow-y-auto
          hide-scrollbar
          p-4
        "
      >
        <div className="space-y-6">
          {menuGroups.map((group) => (
            <div key={group.title}>
              <p className="px-3 mb-2 text-[11px] font-semibold tracking-widest text-white/40 uppercase">
                {group.title}
              </p>

              <div className="space-y-1">
                {group.items.map((item) => {

                  const Icon = item.icon;

                  // menu yang punya anak
                  if (item.children) {

                    return (
                      <div key={item.name}>

                        <button
                          onClick={() =>
                            setContentOpen(!contentOpen)
                          }
                          className="
                            w-full
                            flex
                            items-center
                            justify-between
                            px-4
                            py-3
                            rounded-xl
                            text-white/80
                            hover:bg-white/10
                          "
                        >

                          <div className="flex items-center gap-3">

                            <Icon size={18} />

                            <span>
                              {item.name}
                            </span>

                          </div>

                          <ChevronRight
                            size={16}
                            className={`
                              transition-transform
                              duration-300
                              ${
                                contentOpen
                                  ? "rotate-90"
                                  : ""
                              }
                            `}
                          />

                        </button>

                        <div
                          className={`
                            overflow-hidden
                            transition-all
                            duration-300
                            ease-in-out
                            ${
                              contentOpen
                                ? "max-h-40 opacity-100 mt-2"
                                : "max-h-0 opacity-0"
                            }
                          `}
                        >
                          <div className="ml-8 space-y-1">

                            {item.children.map((child) => (

                              <NavLink
                                key={child.path}
                                to={child.path}
                                className={({ isActive }) =>
                                  `
                                  block
                                  px-4
                                  py-2
                                  rounded-lg
                                  text-sm
                                  transition

                                  ${
                                    isActive
                                      ? "bg-white text-[#14213D]"
                                      : "text-white/60 hover:text-white hover:bg-white/10"
                                  }
                                `
                                }
                              >
                                {child.name}
                              </NavLink>

                            ))}

                          </div>
                        </div>

                      </div>
                    );

                  }

                  // menu biasa
                  return (

                    <NavLink
                      key={item.path}
                      to={item.path}
                      className={({ isActive }) =>
                        `
                        flex
                        items-center
                        gap-3
                        px-4
                        py-3
                        rounded-xl

                        ${
                          isActive
                            ? "bg-white text-[#14213D]"
                            : "text-white/80 hover:bg-white/10"
                        }
                      `
                      }
                    >

                      <Icon size={18} />

                      <span>
                        {item.name}
                      </span>

                    </NavLink>

                  );

                })}
              </div>
            </div>
          ))}
        </div>
      </nav>
    </aside>
  );
}

export default Sidebar;