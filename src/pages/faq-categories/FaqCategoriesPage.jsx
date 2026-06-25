import {
  useEffect,
  useState,
} from "react";

import AdminLayout from "../../layouts/AdminLayout";

import {
  getFaqCategories,
  createFaqCategory,
  updateFaqCategory,
  deleteFaqCategory,
} from "../../services/faqCategoryService";

function FaqCategoriesPage() {

  const [categories,
    setCategories] =
    useState([]);

  const [loading,
    setLoading] =
    useState(true);

  const [search,
    setSearch] =
    useState("");

  const [name,
    setName] =
    useState("");

  const [showModal,
    setShowModal] =
    useState(false);

  const [editingCategory,
    setEditingCategory] =
    useState(null);

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories =
    async () => {

      try {

        setLoading(true);

        const data =
          await getFaqCategories();

        setCategories(data);

      } catch (error) {

        console.error(error);

      } finally {

        setLoading(false);

      }

    };

  const filteredCategories =
    categories.filter(
      (category) =>
        category.name
          ?.toLowerCase()
          .includes(
            search.toLowerCase()
          )
    );

  const openCreateModal =
    () => {

      setEditingCategory(
        null
      );

      setName("");

      setShowModal(true);

    };

  const openEditModal =
    (category) => {

      setEditingCategory(
        category
      );

      setName(
        category.name
      );

      setShowModal(true);

    };

  const handleSubmit =
    async () => {

      try {

        if (!name.trim())
          return;

        if (
          editingCategory
        ) {

          await updateFaqCategory(
            editingCategory.id,
            {
              name,
            }
          );

        } else {

          await createFaqCategory(
            {
              name,
            }
          );

        }

        setShowModal(false);

        loadCategories();

      } catch (error) {

        console.error(error);

      }

    };

  const handleDelete =
    async (id) => {

      const confirmed =
        window.confirm(
          "Delete category?"
        );

      if (!confirmed)
        return;

      try {

        await deleteFaqCategory(
          id
        );

        loadCategories();

      } catch (error) {

        console.error(error);

      }

    };

  return (
    <AdminLayout>

      <div className="space-y-6">

        <div className="flex justify-between items-center">

          <div>

            <h1 className="text-3xl font-bold">
              FAQ Categories
            </h1>

            <p className="text-gray-500">
              Manage FAQ categories.
            </p>

          </div>

          <button
            onClick={
              openCreateModal
            }
            className="
              px-5
              py-3
              rounded-xl
              bg-primary
              text-white
            "
          >
            Add Category
          </button>

        </div>

        <div className="bg-white p-4 rounded-2xl shadow-sm">

          <input
            type="text"
            placeholder="Search category..."
            value={search}
            onChange={(e) =>
              setSearch(
                e.target.value
              )
            }
            className="
              w-full
              md:w-96
              px-4
              py-3
              border
              rounded-xl
            "
          />

        </div>

        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">

          <table className="w-full">

            <thead>

              <tr className="border-b bg-gray-50">

                <th className="px-4 py-3 text-left">
                  Name
                </th>

                <th className="px-4 py-3 text-left">
                  Slug
                </th>

                <th className="px-4 py-3 text-left">
                  Status
                </th>

                <th className="px-4 py-3 text-left">
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
                      text-center
                      py-10
                    "
                  >
                    Loading...
                  </td>
                </tr>

              ) : filteredCategories.length ===
                0 ? (

                <tr>
                  <td
                    colSpan="4"
                    className="
                      text-center
                      py-10
                    "
                  >
                    No categories found
                  </td>
                </tr>

              ) : (

                filteredCategories.map(
                  (category) => (

                    <tr
                      key={
                        category.id
                      }
                      className="border-b"
                    >

                      <td className="px-4 py-4">
                        {
                          category.name
                        }
                      </td>

                      <td className="px-4 py-4">
                        {
                          category.slug
                        }
                      </td>

                      <td className="px-4 py-4">

                        <span
                          className={`
                            px-3
                            py-1
                            rounded-full
                            text-xs
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

                      <td className="px-4 py-4 flex gap-2">

                        <button
                          onClick={() =>
                            openEditModal(
                              category
                            )
                          }
                          className="
                            px-3
                            py-2
                            rounded-lg
                            bg-blue-100
                            text-blue-600
                          "
                        >
                          Edit
                        </button>

                        <button
                          onClick={() =>
                            handleDelete(
                              category.id
                            )
                          }
                          className="
                            px-3
                            py-2
                            rounded-lg
                            bg-red-100
                            text-red-600
                          "
                        >
                          Delete
                        </button>

                      </td>

                    </tr>

                  )
                )

              )}

            </tbody>

          </table>

        </div>

      </div>

      {showModal && (

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
              p-6
              w-full
              max-w-md
            "
          >

            <h2 className="text-xl font-bold mb-4">

              {editingCategory
                ? "Edit Category"
                : "Add Category"}

            </h2>

            <input
              type="text"
              value={name}
              onChange={(e) =>
                setName(
                  e.target.value
                )
              }
              placeholder="Category name"
              className="
                w-full
                px-4
                py-3
                border
                rounded-xl
              "
            />

            <div className="flex justify-end gap-3 mt-6">

              <button
                onClick={() =>
                  setShowModal(
                    false
                  )
                }
                className="
                  px-4
                  py-2
                  border
                  rounded-xl
                "
              >
                Cancel
              </button>

              <button
                onClick={
                  handleSubmit
                }
                className="
                  px-4
                  py-2
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

      )}

    </AdminLayout>
  );
}

export default FaqCategoriesPage;