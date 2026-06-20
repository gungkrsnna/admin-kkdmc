import { useState, useEffect } from "react";

function SocialMediaModal({
  open,
  onClose,
  onSubmit,
  initialData,
}) {

  const [form, setForm] =
    useState({
      platform: "",
      label: "",
      value: "",
      is_active: true,
      sort_order: 0,
    });

  useEffect(() => {

    if (initialData) {

      setForm(initialData);

    } else {

      setForm({
        platform: "",
        label: "",
        value: "",
        is_active: true,
        sort_order: 0,
      });

    }

  }, [initialData]);

  if (!open) return null;

  const handleChange =
    (field, value) => {

      setForm((prev) => ({
        ...prev,
        [field]: value,
      }));

    };

  const handleSubmit =
    (e) => {

      e.preventDefault();

      onSubmit(form);

    };

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
          p-6
          w-full
          max-w-lg
        "
      >

        <h2
          className="
            text-xl
            font-bold
            mb-6
          "
        >
          {initialData
            ? "Edit Social Media"
            : "Add Social Media"}
        </h2>

        <form
          onSubmit={handleSubmit}
          className="space-y-4"
        >

          <div>

            <label className="block mb-2">
              Platform
            </label>

            <select
              value={form.platform}
              onChange={(e) =>
                handleChange(
                  "platform",
                  e.target.value
                )
              }
              className="
                w-full
                border
                rounded-xl
                px-4
                h-11
              "
              required
            >

              <option value="">
                Select Platform
              </option>

              <option value="instagram">
                Instagram
              </option>

              <option value="facebook">
                Facebook
              </option>

              <option value="whatsapp">
                WhatsApp
              </option>

              <option value="youtube">
                YouTube
              </option>

              <option value="tiktok">
                TikTok
              </option>

              <option value="phone">
                Phone
              </option>

            </select>

          </div>

          <div>

            <label className="block mb-2">
              Label
            </label>

            <input
              type="text"
              value={form.label}
              onChange={(e) =>
                handleChange(
                  "label",
                  e.target.value
                )
              }
              className="
                w-full
                border
                rounded-xl
                px-4
                h-11
              "
            />

          </div>

          <div>

            <label className="block mb-2">
              Link / Value
            </label>

            <input
              type="text"
              value={form.value}
              onChange={(e) =>
                handleChange(
                  "value",
                  e.target.value
                )
              }
              className="
                w-full
                border
                rounded-xl
                px-4
                h-11
              "
              required
            />

          </div>

          <div>

            <label className="block mb-2">
              Sort Order
            </label>

            <input
              type="number"
              value={form.sort_order}
              onChange={(e) =>
                handleChange(
                  "sort_order",
                  Number(
                    e.target.value
                  )
                )
              }
              className="
                w-full
                border
                rounded-xl
                px-4
                h-11
              "
            />

          </div>

          <div
            className="
              flex
              items-center
              gap-3
            "
          >

            <input
              type="checkbox"
              checked={form.is_active}
              onChange={(e) =>
                handleChange(
                  "is_active",
                  e.target.checked
                )
              }
            />

            <span>
              Active
            </span>

          </div>

          <div
            className="
              flex
              justify-end
              gap-3
              pt-4
            "
          >

            <button
              type="button"
              onClick={onClose}
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
              type="submit"
              className="
                bg-[#14213D]
                text-white
                px-5
                py-2
                rounded-xl
              "
            >
              Save
            </button>

          </div>

        </form>

      </div>

    </div>

  );
}

export default SocialMediaModal;