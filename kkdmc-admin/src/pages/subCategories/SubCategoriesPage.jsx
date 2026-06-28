import { useEffect, useState } from "react";

import {
  Plus,
  Search,
  Pencil,
  Trash2,
  Layers,
} from "lucide-react";

import { toast } from "react-hot-toast";

import AdminLayout from "../../layouts/AdminLayout";

import {
  getSubCategories,
  deleteSubCategory,
} from "../../services/subCategoryService";

import SubCategoryModal from "./SubCategoryModal";

function SubCategoriesPage() {
  const [loading, setLoading] =
    useState(true);

  const [search, setSearch] =
    useState("");

  const [subCategories,
    setSubCategories] =
    useState([]);

    const [deleteItem,
  setDeleteItem] =
  useState(null);

const [deleting,
  setDeleting] =
  useState(false);

  const [openModal,
    setOpenModal] =
    useState(false);

  const [selected,
    setSelected] =
    useState(null);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);

      const data =
        await getSubCategories();

      setSubCategories(data);

    } catch (error) {

      console.error(error);

      toast.error(
        "Failed to load sub categories"
      );

    } finally {

      setLoading(false);

    }
  };

  const handleCreate = () => {
    setSelected(null);
    setOpenModal(true);
  };

  const handleEdit = (item) => {
    setSelected(item);
    setOpenModal(true);
  };

  const handleDelete =
  async (id) => {

    const confirmed =
      window.confirm(
        "Delete this sub category?"
      );

    if (!confirmed) return;

    try {

      await deleteSubCategory(id);

      toast.success(
        "Sub category deleted"
      );

      loadData();

    } catch (error) {

      console.error(error);

      toast.error(
        "Failed to delete sub category"
      );

    }
  };

  const confirmDelete =
  async () => {

    if (!deleteItem)
      return;

    try {

      setDeleting(true);

      await deleteSubCategory(
        deleteItem.id
      );

      toast.success(
        "Sub category deleted"
      );

      setDeleteItem(null);

      loadData();

    } catch (error) {

      console.error(error);

      toast.error(
        error?.response?.data?.message ||
        "Failed to delete sub category"
      );

    } finally {

      setDeleting(false);

    }

  };

  const filtered =
    subCategories.filter(
      (item) =>
        item.title
          ?.toLowerCase()
          .includes(
            search.toLowerCase()
          ) ||
        item.category?.title
          ?.toLowerCase()
          .includes(
            search.toLowerCase()
          )
    );

  return (
    <AdminLayout>

      <div className="space-y-6">

        {/* Header */}

        <div className="flex items-center justify-between">

          <div>

            <h1 className="text-3xl font-black">
              Sub Categories
            </h1>

            <p className="text-gray-500">
              Manage tour sub categories
            </p>

          </div>

          <button
            onClick={handleCreate}
            className="
              bg-[#14213D]
              text-white
              px-5
              py-3
              rounded-xl
              flex
              items-center
              gap-2
              font-semibold
            "
          >
            <Plus size={18} />
            Add Sub Category
          </button>

        </div>

        {/* Search */}

        <div
          className="
            bg-white
            rounded-2xl
            p-4
          "
        >

          <div
            className="
              flex
              items-center
              gap-3
              border
              rounded-xl
              px-4
              h-12
            "
          >

            <Search size={18} />

            <input
              type="text"
              placeholder="Search..."
              value={search}
              onChange={(e) =>
                setSearch(
                  e.target.value
                )
              }
              className="
                flex-1
                outline-none
              "
            />

          </div>

        </div>

        {/* Table */}

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
                  Category
                </th>

                <th className="px-6 py-4 text-left">
                  Sub Category
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
                    colSpan="4"
                    className="
                      py-10
                      text-center
                    "
                  >
                    Loading...
                  </td>

                </tr>

              ) : filtered.length === 0 ? (

                <tr>

                  <td
                    colSpan="4"
                    className="
                      py-10
                      text-center
                    "
                  >
                    No sub categories found
                  </td>

                </tr>

              ) : (

                filtered.map(
                  (item) => (

                    <tr
                      key={item.id}
                      className="
                        border-b
                        hover:bg-gray-50
                      "
                    >

                      <td className="px-6 py-4">

                        <span
                          className="
                            inline-flex
                            items-center
                            gap-2
                            text-sm
                            font-medium
                          "
                        >
                          <Layers size={16}/>
                          {item.category?.title}
                        </span>

                      </td>

                      <td className="px-6 py-4">

                        <div>

                          <p className="font-semibold">
                            {item.title}
                          </p>

                          <p
                            className="
                              text-sm
                              text-gray-500
                            "
                          >
                            {item.description}
                          </p>

                        </div>

                      </td>

                      <td className="px-6 py-4 text-center">

                        <span
                          className={`
                            px-3
                            py-1
                            rounded-full
                            text-xs
                            font-semibold

                            ${
                              item.is_active
                                ? "bg-green-100 text-green-700"
                                : "bg-red-100 text-red-700"
                            }
                          `}
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
                            onClick={() =>
                              handleEdit(item)
                            }
                            className="
                              p-2
                              rounded-lg
                              hover:bg-gray-100
                            "
                          >
                            <Pencil size={18}/>
                          </button>

                          <button
  onClick={() =>
    setDeleteItem(item)
  }
  className="
    p-2
    rounded-lg
    text-red-600
    hover:bg-red-50
  "
>
  <Trash2 size={18}/>
</button>

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

      <SubCategoryModal
        open={openModal}
        onClose={() =>
          setOpenModal(false)
        }
        onSuccess={loadData}
        subCategory={selected}
      />

      {deleteItem && (

  <div
    className="
      fixed
      inset-0
      bg-black/40
      backdrop-blur-sm
      flex
      items-center
      justify-center
      z-50
    "
  >

    <div
      className="
        bg-white
        rounded-3xl
        w-full
        max-w-md
        p-6
        shadow-2xl
      "
    >

      <h3
        className="
          text-xl
          font-bold
          mb-2
        "
      >
        Delete Sub Category
      </h3>

      <p
        className="
          text-gray-500
          mb-6
        "
      >
        Are you sure you want to delete
        <strong>
          {" "}
          {deleteItem.title}
        </strong>
        ?
      </p>

      <div
        className="
          flex
          justify-end
          gap-3
        "
      >

        <button
          onClick={() =>
            setDeleteItem(null)
          }
          className="
            px-5
            py-3
            border
            rounded-xl
          "
        >
          Cancel
        </button>

        <button
          onClick={confirmDelete}
          disabled={deleting}
          className="
            px-5
            py-3
            rounded-xl
            bg-red-600
            text-white
            disabled:opacity-50
          "
        >
          {deleting
            ? "Deleting..."
            : "Delete"}
        </button>

      </div>

    </div>

  </div>

)}

    </AdminLayout>
  );
}

export default SubCategoriesPage;