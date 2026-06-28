import { useEffect, useState } from "react";

import { X } from "lucide-react";

import {
  createCategory,
  updateCategory,
} from "../../services/categoryService";

import { CATEGORY_ICONS } from "../../constants/categoryIcons";

function CategoryModal({
  open,
  onClose,
  onSuccess,
  category = null,
}) {
  const [form, setForm] = useState({
    title: "",
    icon: "",
    description: "",
    sort_order: 0,
    is_active: true,
  });

  const [loading, setLoading] = useState(false);

  const isEdit = !!category;

  useEffect(() => {
    if (category) {
        setForm({
        title: category.title || "",
        icon: category.icon || "",
        description: category.description || "",
        sort_order: category.sort_order || 0,
        is_active: category.is_active,
        });
    } else {
        setForm({
        title: "",
        icon: "",
        description: "",
        sort_order: 0,
        is_active: true,
        });
    }
    }, [category, open]);

  const handleSubmit = async () => {
  try {
    setLoading(true);

    if (isEdit) {
      await updateCategory(
        category.id,
        form
      );
    } else {
      await createCategory(form);
    }

    onSuccess?.();
    onClose?.();

  } catch (error) {
    console.error(error);

  } finally {
    setLoading(false);
  }
};


const selectedIcon = CATEGORY_ICONS.find(
  item => item.name === form.icon
);


  if (!open) return null;

  return (
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
        p-6
      "
    >
      <div
        className="
          bg-white
          rounded-3xl
          w-full
          max-w-5xl
          max-h-[90vh]
          flex
          flex-col
          shadow-2xl
          overflow-hidden
        "
      >
        {/* Header */}
        <div
          className="
            px-6
            py-5
            border-b
            flex
            items-center
            justify-between
          "
        >
          <div>
            <h2 className="text-2xl font-black">
  {isEdit
    ? "Edit Category"
    : "Add Category"}
</h2>

            <p className="text-gray-500 mt-1">
              Create a new tour category
            </p>
          </div>

          <button
            onClick={onClose}
            className="
              w-10
              h-10
              rounded-xl
              hover:bg-gray-100
              flex
              items-center
              justify-center
            "
          >
            <X size={20} />
          </button>
        </div>

        {/* Body */}
        {/* Body */}
<div
  className="
    flex-1
    overflow-y-auto
    p-6
  "
>
  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

    {/* LEFT */}
    <div className="lg:col-span-7 space-y-6">

      {/* Category Name */}
      <div>
        <label className="block mb-2 font-semibold">
          Category Name
        </label>

        <input
          type="text"
          value={form.title}
          onChange={(e) =>
            setForm({
              ...form,
              title: e.target.value,
            })
          }
          placeholder="Airport Transfer"
          className="
            w-full
            h-12
            px-4
            border
            rounded-xl
            outline-none
            focus:ring-2
            focus:ring-[#14213D]
          "
        />
      </div>

      {/* Description */}
      <div>
        <label className="block mb-2 font-semibold">
          Description
        </label>

        <textarea
          rows={6}
          value={form.description}
          onChange={(e) =>
            setForm({
              ...form,
              description: e.target.value,
            })
          }
          placeholder="Category description..."
          className="
            w-full
            border
            rounded-xl
            p-4
            outline-none
            resize-none
            focus:ring-2
            focus:ring-[#14213D]
          "
        />
      </div>

      {/* Sort Order */}
      <div>
        <label className="block mb-2 font-semibold">
          Sort Order
        </label>

        <input
          type="number"
          value={form.sort_order}
          onChange={(e) =>
            setForm({
              ...form,
              sort_order: Number(
                e.target.value
              ),
            })
          }
          className="
            w-full
            h-12
            px-4
            border
            rounded-xl
            outline-none
            focus:ring-2
            focus:ring-[#14213D]
          "
        />
      </div>

      {/* Status */}
      <div>
        <label
          className="
            flex
            items-center
            gap-3
            cursor-pointer
          "
        >
          <input
            type="checkbox"
            checked={form.is_active}
            onChange={(e) =>
              setForm({
                ...form,
                is_active:
                  e.target.checked,
              })
            }
          />

          <span className="font-medium">
            Active Category
          </span>
        </label>
      </div>

    </div>

    {/* RIGHT */}
    <div className="lg:col-span-5">

      <label className="block mb-3 font-semibold">
        Category Icon
      </label>

      {/* Selected Icon */}
      <div
        className="
          mb-4
          rounded-2xl
          border
          bg-slate-50
          p-4
        "
      >
        <div className="flex items-center gap-4">

          <div
            className="
              h-16
              w-16
              rounded-2xl
              bg-[#14213D]
              text-white
              flex
              items-center
              justify-center
            "
          >
            {selectedIcon && (
              <selectedIcon.icon
                size={28}
              />
            )}
          </div>

          <div>
            <p className="text-sm text-gray-500">
              Selected Icon
            </p>

            <p className="font-semibold">
              {form.icon ||
                "Choose icon"}
            </p>
          </div>

        </div>
      </div>

      {/* Icon Grid */}
      <div
        className="
          border
          rounded-2xl
          p-4
          max-h-[420px]
          overflow-y-auto
        "
      >
        <div
          className="
            grid
            grid-cols-4
            md:grid-cols-5
            gap-3
          "
        >
          {CATEGORY_ICONS.map(
            (item) => {
              const Icon = item.icon;

              return (
                <button
                  key={item.name}
                  type="button"
                  onClick={() =>
                    setForm({
                      ...form,
                      icon: item.name,
                    })
                  }
                  className={`
                    h-14
                    rounded-xl
                    border
                    flex
                    items-center
                    justify-center
                    text-xl
                    transition

                    ${
                      form.icon ===
                      item.name
                        ? "bg-[#14213D] text-white border-[#14213D]"
                        : "hover:border-[#14213D]"
                    }
                  `}
                >
                  <Icon />
                </button>
              );
            }
          )}
        </div>
      </div>

    </div>

  </div>
</div>

        {/* Footer */}
        <div
          className="
            px-6
            py-5
            border-t
            flex
            justify-end
            gap-3
          "
        >
          <button
            onClick={onClose}
            className="
              px-5
              py-3
              border
              rounded-xl
              font-medium
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
              font-medium
              disabled:opacity-50
            "
          >
            {loading
                ? "Saving..."
                : isEdit
                    ? "Update Category"
                    : "Save Category"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default CategoryModal;