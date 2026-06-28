import { useEffect, useState } from "react";

import { X } from "lucide-react";

import {
  createSubCategory,
  updateSubCategory,
} from "../../services/subCategoryService";

import {
  getCategories,
} from "../../services/categoryService";

import { toast }
from "react-hot-toast";

function SubCategoryModal({
  open,
  onClose,
  onSuccess,
  subCategory = null,
}) {

    const [categories, setCategories] =
  useState([]);

const [loading, setLoading] =
  useState(false);

const [form, setForm] =
  useState({
    category_id: "",
    title: "",
    description: "",
    sort_order: 0,
    is_active: true,
  });

const isEdit =
  !!subCategory;

  useEffect(() => {
  loadCategories();
}, []);

const loadCategories =
  async () => {

    try {

      const data =
        await getCategories();

      setCategories(data);

    } catch (error) {

      console.error(error);

    }

  };

  useEffect(() => {

  if (subCategory) {

    setForm({
      category_id:
        subCategory.category_id || "",
      title:
        subCategory.title || "",
      description:
        subCategory.description || "",
      sort_order:
        subCategory.sort_order || 0,
      is_active:
        subCategory.is_active,
    });

  } else {

    setForm({
      category_id: "",
      title: "",
      description: "",
      sort_order: 0,
      is_active: true,
    });

  }

}, [subCategory, open]);

const handleSubmit =
  async () => {

    try {

      setLoading(true);

      if (isEdit) {

        await updateSubCategory(
          subCategory.id,
          form
        );

        toast.success(
          "Sub category updated"
        );

      } else {

        await createSubCategory(
          form
        );

        toast.success(
          "Sub category created"
        );

      }

      onSuccess?.();
      onClose?.();

    } catch (error) {

      console.error(error);

      toast.error(
        error?.response?.data?.message ||
        "Failed to save sub category"
      );

    } finally {

      setLoading(false);

    }

  };

  if (!open) return null;

  return (
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
        rounded-3xl
        w-full
        max-w-2xl
        p-6
      "
    >
      <h2 className="text-2xl font-bold mb-6">
        {isEdit
          ? "Edit Sub Category"
          : "Add Sub Category"}
      </h2>

      {/* Category */}
      <div className="mb-4">
        <label className="block mb-2">
          Category
        </label>

        <select
          value={form.category_id}
          onChange={(e) =>
            setForm({
              ...form,
              category_id:
                e.target.value,
            })
          }
          className="
            w-full
            h-12
            border
            rounded-xl
            px-4
          "
        >
          <option value="">
            Select Category
          </option>

          {categories.map(
            (category) => (
              <option
                key={category.id}
                value={category.id}
              >
                {category.title}
              </option>
            )
          )}
        </select>
      </div>

      {/* Name */}
      <div className="mb-4">
        <label className="block mb-2">
          Sub Category Name
        </label>

        <input
          type="text"
          value={form.title}
          onChange={(e) =>
            setForm({
              ...form,
              title:
                e.target.value,
            })
          }
          className="
            w-full
            h-12
            border
            rounded-xl
            px-4
          "
        />
      </div>

      {/* Description */}
      <div className="mb-4">
        <label className="block mb-2">
          Description
        </label>

        <textarea
          rows={4}
          value={form.description}
          onChange={(e) =>
            setForm({
              ...form,
              description:
                e.target.value,
            })
          }
          className="
            w-full
            border
            rounded-xl
            p-4
          "
        />
      </div>

      <div className="flex justify-end gap-3">

        <button
          onClick={onClose}
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
          onClick={handleSubmit}
          disabled={loading}
          className="
            px-5
            py-3
            rounded-xl
            bg-[#14213D]
            text-white
          "
        >
          {loading
            ? "Saving..."
            : isEdit
              ? "Update"
              : "Save"}
        </button>

      </div>

    </div>
  </div>
);
}

export default SubCategoryModal;