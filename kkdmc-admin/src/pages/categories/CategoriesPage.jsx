import { useEffect, useState } from "react";
import { Plus, Search, Pencil, Trash2 } from "lucide-react";

import AdminLayout from "../../layouts/AdminLayout";
import { getCategories } from "../../services/categoryService";
import {
  deleteCategory,
} from "../../services/categoryService";

import CategoryModal
from "./CategoryModal";

import { CATEGORY_ICONS } from "../../constants/categoryIcons";

function CategoriesPage() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory,
  setSelectedCategory] =
  useState(null);

  const [openDeleteModal, setOpenDeleteModal] =
  useState(false);

    const [deleteCategoryData, setDeleteCategoryData] =
    useState(null);

    const [deleteLoading, setDeleteLoading] =
    useState(false);

  const [search, setSearch] = useState("");

  const [openModal, setOpenModal] =
  useState(false);

  const iconMap = CATEGORY_ICONS.reduce(
    (acc, item) => {
        acc[item.name] = item.icon;
        return acc;
    },
    {}
    );

  const loadCategories = async () => {
    try {
      const data = await getCategories();

      setCategories(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
  try {
    if (!deleteCategoryData) return;

    setDeleteLoading(true);

    await deleteCategory(
      deleteCategoryData.id
    );

    await loadCategories();

    setOpenDeleteModal(false);
    setDeleteCategoryData(null);

  } catch (error) {
    console.error(error);

    alert(
      error?.response?.data?.message ||
      "Failed to delete category"
    );
  } finally {
    setDeleteLoading(false);
  }
};

  useEffect(() => {
    loadCategories();
  }, []);

  const filteredCategories = categories.filter(
    (item) =>
      item.title
        ?.toLowerCase()
        .includes(search.toLowerCase())
  );

  return (
    <AdminLayout>
      <div className="space-y-6">

        {/* Header */}
        <div className="flex items-center justify-between">

          <div>
            <h1 className="text-3xl font-black">
              Categories
            </h1>

            <p className="text-gray-500">
              Manage tour categories
            </p>
          </div>

          <button
            onClick={() => {
            setSelectedCategory(null);
            setOpenModal(true);
            }}
            className="
              flex
              items-center
              gap-2
              bg-[#14213D]
              text-white
              px-5
              py-3
              rounded-xl
              font-semibold
            "
          >
            <Plus size={18} />

            Add Category
          </button>

          

        </div>

        {/* Search */}
        <div className="bg-white p-4 rounded-2xl shadow-sm">

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
              placeholder="Search category..."
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
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
            rounded-2xl
            shadow-sm
            overflow-hidden
          "
        >

          {loading ? (

            <div className="p-10 text-center">
              Loading...
            </div>

          ) : (

            <table className="w-full">

              <thead
                className="
                  bg-gray-50
                  border-b
                "
              >
                <tr>

                  <th className="text-left px-6 py-4">
                    Name
                  </th>

                  <th className="text-left px-6 py-4">
                    Slug
                  </th>

                  <th className="text-left px-6 py-4">
                    Status
                  </th>

                  <th className="text-center px-6 py-4">
                    Action
                  </th>

                </tr>
              </thead>

              <tbody>

                {filteredCategories.map(
                  (category) => (
                    <tr
                      key={category.id}
                      className="border-b"
                    >
                      <td className="px-6 py-4">
  <div className="flex items-center gap-3">

    {(() => {
      const Icon =
        iconMap[category.icon];

      return Icon ? (
        <div
          className="
            w-10
            h-10
            rounded-xl
            bg-gray-100
            flex
            items-center
            justify-center
          "
        >
          <Icon size={18} />
        </div>
      ) : null;
    })()}

    <div>
      <p className="font-semibold">
        {category.title}
      </p>

      <p className="text-xs text-gray-500">
        {category.description}
      </p>
    </div>

  </div>
</td>

                      <td className="px-6 py-4 text-gray-500">
                        {category.slug}
                      </td>

                      <td className="px-6 py-4">
                        <span
                          className={`
                            px-3
                            py-1
                            rounded-full
                            text-xs
                            font-semibold

                            ${
                              category.is_active
                                ? "bg-green-100 text-green-700"
                                : "bg-red-100 text-red-700"
                            }
                          `}
                        >
                          {category.is_active
                            ? "Active"
                            : "Inactive"}
                        </span>
                      </td>

                      <td className="px-6 py-4">
                        <div
                          className="
                            flex
                            items-center
                            justify-center
                            gap-2
                          "
                        >

                          <button
  onClick={() => {
    setSelectedCategory(
      category
    );

    setOpenModal(true);
  }}
>
  <Pencil size={18} />
</button>

                          <button
  onClick={() => {
    setDeleteCategoryData(category);
    setOpenDeleteModal(true);
  }}
  className="
    p-2
    rounded-lg
    hover:bg-red-50
    text-red-600
  "
>
  <Trash2 size={18} />
</button>

                        </div>
                      </td>
                    </tr>
                  )
                )}

              </tbody>

            </table>

          )}

        </div>

        <CategoryModal
  open={openModal}
  category={selectedCategory}
  onClose={() => {
    setOpenModal(false);
    setSelectedCategory(null);
  }}
  onSuccess={loadCategories}
/>

{openDeleteModal && (
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
        shadow-2xl
        overflow-hidden
      "
    >

      {/* Header */}
      <div className="p-6">

        <div
          className="
            w-16
            h-16
            rounded-full
            bg-red-100
            text-red-600

            flex
            items-center
            justify-center

            mx-auto
            mb-4
          "
        >
          <Trash2 size={28} />
        </div>

        <h3
          className="
            text-xl
            font-bold
            text-center
          "
        >
          Delete Category
        </h3>

        <p
          className="
            text-gray-500
            text-center
            mt-2
          "
        >
          Are you sure you want to delete
          <br />

          <span className="font-semibold text-gray-900">
            {deleteCategoryData?.title}
          </span>
          ?
        </p>

      </div>

      {/* Footer */}
      <div
        className="
          border-t
          p-4
          flex
          justify-end
          gap-3
        "
      >

        <button
          onClick={() => {
            setOpenDeleteModal(false);
            setDeleteCategoryData(null);
          }}
          className="
            px-5
            py-2.5
            border
            rounded-xl
            font-medium
          "
        >
          Cancel
        </button>

        <button
          onClick={handleDelete}
          disabled={deleteLoading}
          className="
            px-5
            py-2.5
            rounded-xl
            bg-red-600
            text-white
            font-medium
          "
        >
          {deleteLoading
            ? "Deleting..."
            : "Delete"}
        </button>

      </div>

    </div>
  </div>
)}

      </div>
    </AdminLayout>
  );
}

export default CategoriesPage;