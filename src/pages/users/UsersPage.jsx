import {
  useEffect,
  useState,
} from "react";

import AdminLayout
from "../../layouts/AdminLayout";

function UsersPage() {

  const [users, setUsers] =
    useState([]);

const [openModal, setOpenModal] =
  useState(false);

const [editingUser, setEditingUser] =
  useState(null);

  const [search, setSearch] =
  useState("");

const [form, setForm] =
  useState({
    full_name: "",
    email: "",
    password: "",
    whatsapp: "",
    role: "admin",
  });

  const loadUsers =
    async () => {

      const response =
        await fetch(
          "https://kkdmc.gladiatoraruna.com/api/users"
        );

      const data =
        await response.json();

      setUsers(data);

    };

    const handleSubmit =
  async () => {

    const url =
      editingUser
        ? `https://kkdmc.gladiatoraruna.com/api/users/${editingUser.id}`
        : "https://kkdmc.gladiatoraruna.com/api/users";

    const method =
      editingUser
        ? "PUT"
        : "POST";

    await fetch(url, {
      method,
      headers: {
        "Content-Type":
          "application/json",
      },
      body: JSON.stringify(form),
    });

    setOpenModal(false);

    loadUsers();

  };

  useEffect(() => {

    loadUsers();

  }, []);

  return (
    <AdminLayout>

      <div className="p-6">

        <div className="flex justify-between mb-6">

  <h1 className="text-3xl font-bold">
    Users
  </h1>

  <button
    onClick={() => {

      setEditingUser(null);

      setForm({
        full_name: "",
        email: "",
        password: "",
        whatsapp: "",
        role: "admin",
      });

      setOpenModal(true);

    }}
    className="
      bg-primary
      text-white
      px-5
      py-3
      rounded-xl
    "
  >
    Add User
  </button>

</div>

        <div className="bg-white rounded-2xl overflow-hidden shadow-sm">

          <table className="w-full">

            <thead>

              <tr className="bg-gray-50 border-b">

                <th className="p-4 text-left">
                  Name
                </th>

                <th className="p-4 text-left">
                  Email
                </th>

                <th className="p-4 text-left">
                  WhatsApp
                </th>

                <th className="p-4 text-left">
                  Role
                </th>

                <th className="p-4 text-left">
                  Created
                </th>

                <th className="p-4">
                Action
                </th>

              </tr>

            </thead>

            <tbody>

              {users.map(
                (user) => (

                  <tr
                    key={user.id}
                    className="border-b"
                  >

                    <td className="p-4">
                      {user.full_name}
                    </td>

                    <td className="p-4">
                      {user.email}
                    </td>

                    <td className="p-4">
                      {user.whatsapp}
                    </td>

                    <td className="p-4">
                      {user.role}
                    </td>

                    <td className="p-4">
                      {new Date(
                        user.created_at
                      ).toLocaleDateString()}
                    </td>

                    <td className="p-4">

  <button
    onClick={() => {

      setEditingUser(user);

      setForm({
        full_name:
          user.full_name || "",
        email:
          user.email || "",
        password: "",
        whatsapp:
          user.whatsapp || "",
        role:
          user.role || "admin",
      });

      setOpenModal(true);

    }}
    className="
      px-4
      py-2
      rounded-lg
      bg-blue-500
      text-white
    "
  >
    Edit
  </button>

</td>

                  </tr>

                )
              )}

            </tbody>

          </table>

        </div>

      </div>

      
  {
    openModal && (

        <div
        className="
            fixed
            inset-0
            bg-black/40
            flex
            items-center
            justify-center
            z-50
        "
        >

        <div
            className="
            bg-white
            rounded-2xl
            p-8
            w-full
            max-w-xl
            "
        >

            <h2 className="text-2xl font-bold mb-6">

            {
                editingUser
                ? "Edit User"
                : "Add User"
            }

            </h2>

            {/* form */}
            <div className="space-y-4">

  <input
    type="text"
    placeholder="Full Name"
    value={form.full_name}
    onChange={(e) =>
      setForm({
        ...form,
        full_name: e.target.value,
      })
    }
    className="w-full border rounded-xl px-4 py-3"
  />

  <input
    type="email"
    placeholder="Email"
    value={form.email}
    disabled={editingUser}
    onChange={(e) =>
      setForm({
        ...form,
        email: e.target.value,
      })
    }
    className="w-full border rounded-xl px-4 py-3"
  />

  {!editingUser && (
    <input
      type="password"
      placeholder="Password"
      value={form.password}
      onChange={(e) =>
        setForm({
          ...form,
          password: e.target.value,
        })
      }
      className="w-full border rounded-xl px-4 py-3"
    />
  )}

  <input
    type="text"
    placeholder="WhatsApp"
    value={form.whatsapp}
    onChange={(e) =>
      setForm({
        ...form,
        whatsapp: e.target.value,
      })
    }
    className="w-full border rounded-xl px-4 py-3"
  />

  <select
    value={form.role}
    onChange={(e) =>
      setForm({
        ...form,
        role: e.target.value,
      })
    }
    className="w-full border rounded-xl px-4 py-3"
  >
    <option value="admin">
      Admin
    </option>

    <option value="staff">
      Staff
    </option>

    <option value="superadmin">
      Super Admin
    </option>
  </select>

</div>

<div className="flex justify-end gap-3 mt-6">

  <button
    onClick={() =>
      setOpenModal(false)
    }
    className="
      px-5
      py-3
      rounded-xl
      border
    "
  >
    Cancel
  </button>

  <button
    onClick={handleSubmit}
    className="
      px-5
      py-3
      rounded-xl
      bg-primary
      text-white
    "
  >
    Save
  </button>

</div>

        </div>

        </div>

    )
    }

    </AdminLayout>
  );


}

export default UsersPage;