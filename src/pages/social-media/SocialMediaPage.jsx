import {
  useEffect,
  useState,
} from "react";

import {
  Plus,
  Pencil,
  Trash2,
} from "lucide-react";

import { toast }
from "react-hot-toast";

import AdminLayout
from "../../layouts/AdminLayout";

import {
  getSocialMedia,
  deleteSocialMedia,
    createSocialMedia,
  updateSocialMedia,
} from "../../services/socialMediaService";

import SocialMediaModal
from "./SocialMediaModal";


function SocialMediaPage() {

  const [items,
  setItems] =
  useState([]);

  const [loading,
  setLoading] =
  useState(true);

  const [openModal,
setOpenModal] =
useState(false);

const [selected,
setSelected] =
useState(null);

  useEffect(() => {

    loadData();

  }, []);

  const loadData =
    async () => {

      try {

        const data =
          await getSocialMedia();

        setItems(data);

      } catch {

        toast.error(
          "Failed to load social media"
        );

      } finally {

        setLoading(false);

      }

    };

  const handleDelete =
    async (id) => {

      const confirmed =
        window.confirm(
          "Delete social media?"
        );

      if (!confirmed) return;

      try {

        await deleteSocialMedia(id);

        toast.success(
          "Deleted successfully"
        );

        loadData();

      } catch {

        toast.error(
          "Failed to delete"
        );

      }

    };

    const handleSave =
  async (payload) => {

    try {

      if (selected) {

        await updateSocialMedia(
          selected.id,
          payload
        );

        toast.success(
          "Updated successfully"
        );

      } else {

        await createSocialMedia(
          payload
        );

        toast.success(
          "Created successfully"
        );

      }

      setOpenModal(false);

      setSelected(null);

      loadData();

    } catch {

      toast.error(
        "Failed to save"
      );

    }

  };

  return (
    <AdminLayout>

      <div className="space-y-6">

        <div className="flex justify-between items-center">

          <div>

            <h1 className="text-3xl font-black">
              Social Media
            </h1>

            <p className="text-gray-500">
              Manage social links
            </p>

          </div>

          {/* <button
          type="button"
            onClick={() => {
            setSelected(null);
            setOpenModal(true);
            }}
            className="
              bg-[#14213D]
              text-white
              px-5
              py-3
              rounded-xl
              flex
              items-center
              gap-2
            "
          >
            <Plus size={18}/>
            Add Social Media
          </button> */}

        </div>

        <div
          className="
            bg-white
            rounded-3xl
            overflow-hidden
          "
        >

          <table className="w-full">

            <thead
              className="
                bg-gray-50
                border-b
              "
            >

              <tr>

                <th className="px-6 py-4 text-left">
                  Platform
                </th>

                <th className="px-6 py-4 text-left">
                  Label
                </th>

                <th className="px-6 py-4 text-left">
                  Value
                </th>

                <th className="px-6 py-4 text-center">
                  Status
                </th>

                <th className="px-6 py-4 text-center">
                  Action
                </th>

              </tr>

            </thead>

            <tbody>

              {loading ? (

                <tr>

                  <td
                    colSpan="5"
                    className="py-10 text-center"
                  >
                    Loading...
                  </td>

                </tr>

              ) : items.length === 0 ? (

                <tr>

                  <td
                    colSpan="5"
                    className="py-10 text-center"
                  >
                    No data
                  </td>

                </tr>

              ) : (

                items.map(
                  (item) => (

                    <tr
                      key={item.id}
                      className="border-b"
                    >

                      <td className="px-6 py-4">
                        {item.platform}
                      </td>

                      <td className="px-6 py-4">
                        {item.label}
                      </td>

                      <td className="px-6 py-4">
                        {item.value}
                      </td>

                      <td className="px-6 py-4 text-center">

                        <span
                          className={
                            item.is_active
                              ? "bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs"
                              : "bg-red-100 text-red-700 px-3 py-1 rounded-full text-xs"
                          }
                        >

                          {item.is_active
                            ? "Active"
                            : "Inactive"}

                        </span>

                      </td>

                      <td className="px-6 py-4">

                        <div
                          className="
                            flex
                            justify-center
                            gap-2
                          "
                        >

                          <button
                            type="button"
                            onClick={() => {
                            setSelected(item);
                            setOpenModal(true);
                            }}
                            className="
                              p-2
                              rounded-lg
                              hover:bg-gray-100
                            "
                          >
                            <Pencil size={18}/>
                          </button>

                          {/* <button
                            onClick={() =>
                              handleDelete(
                                item.id
                              )
                            }
                            className="
                              p-2
                              rounded-lg
                              text-red-600
                              hover:bg-red-50
                            "
                          >
                            <Trash2 size={18}/>
                          </button> */}

                        </div>

                      </td>

                    </tr>

                  )
                )

              )}

            </tbody>

          </table>

        </div>

      </div>

      <SocialMediaModal
        open={openModal}
        onClose={() => {
            setOpenModal(false);
            setSelected(null);
        }}
        onSubmit={handleSave}
        initialData={selected}
        />

    </AdminLayout>
  );
}

export default SocialMediaPage;