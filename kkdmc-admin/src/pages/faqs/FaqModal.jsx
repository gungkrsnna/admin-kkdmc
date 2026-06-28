import {
  useEffect,
  useState,
} from "react";

import {
  getFaqCategories,
} from "../../services/faqCategoryService";

function FaqModal({
  open,
  onClose,
  onSubmit,
  initialData,
}) {

  const [categories, setCategories] =
    useState([]);

  const [form, setForm] =
    useState({
      category_id: "",
      question: "",
      answer: "",
      sort_order: 0,
      is_active: true,
    });

  useEffect(() => {

    if (initialData) {

      setForm({
        category_id:
          initialData.category_id,
        question:
          initialData.question,
        answer:
          initialData.answer,
        sort_order:
          initialData.sort_order,
        is_active:
          initialData.is_active,
      });

    }

  }, [initialData]);

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories =
    async () => {

      const data =
        await getFaqCategories();

      setCategories(data);
    };

  if (!open) return null;

  return (

    <div
      className="
        fixed
        inset-0
        bg-black/50
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
          w-full
          max-w-4xl
          p-6
        "
      >

        <h2 className="text-xl font-bold mb-6">

          {initialData
            ? "Edit FAQ"
            : "Add FAQ"}

        </h2>

        <div className="space-y-4">

          <select
            value={
              form.category_id
            }
            onChange={(e) =>
              setForm({
                ...form,
                category_id:
                  e.target.value,
              })
            }
            className="
              w-full
              border
              rounded-xl
              px-4
              py-3
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
                  {category.name}
                </option>
              )
            )}

          </select>

          <input
            type="text"
            placeholder="Question"
            value={
              form.question
            }
            onChange={(e) =>
              setForm({
                ...form,
                question:
                  e.target.value,
              })
            }
            className="
              w-full
              border
              rounded-xl
              px-4
              py-3
            "
          />

          <textarea
  value={form.answer}
  onChange={(e) =>
    setForm({
      ...form,
      answer: e.target.value,
    })
  }
  rows={8}
  className="
    w-full
    border
    rounded-xl
    px-4
    py-3
  "
/>

          <input
            type="number"
            value={
              form.sort_order
            }
            onChange={(e) =>
              setForm({
                ...form,
                sort_order:
                  e.target.value,
              })
            }
            className="
              w-full
              border
              rounded-xl
              px-4
              py-3
            "
          />

          <label className="flex items-center gap-2">

            <input
              type="checkbox"
              checked={
                form.is_active
              }
              onChange={(e) =>
                setForm({
                  ...form,
                  is_active:
                    e.target.checked,
                })
              }
            />

            Active

          </label>

        </div>

        <div className="flex justify-end gap-3 mt-6">

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
            onClick={() =>
              onSubmit(form)
            }
            className="
              px-5
              py-3
              bg-primary
              text-white
              rounded-xl
            "
          >
            Save FAQ
          </button>

        </div>

      </div>

    </div>

  );
}

export default FaqModal;