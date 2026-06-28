import { useEffect, useState } from "react";

import { X } from "lucide-react";

import { toast } from "react-hot-toast";

import {
  createPromotion,
  updatePromotion,
} from "../../services/promotionService";

import { uploadImage }
from "../../services/uploadService";

function PromotionModal({
  open,
  onClose,
  onSuccess,
  promotion,
}) {

  const [form,
  setForm] = useState({
    title: "",
    subtitle: "",
    image_url: "",
    whatsapp_number: "",
    button_text: "View Offer",
    sort_order: 0,
    is_active: true,
  });

  const [saving,
  setSaving] =
  useState(false);

  const [uploading,
  setUploading] =
  useState(false);

  useEffect(() => {

    if (promotion) {

      setForm({
        title:
          promotion.title || "",

        subtitle:
          promotion.subtitle || "",

        image_url:
          promotion.image_url || "",

        whatsapp_number:
          promotion.whatsapp_number || "",

        button_text:
          promotion.button_text ||
          "View Offer",

        sort_order:
          promotion.sort_order || 0,

        is_active:
          promotion.is_active,
      });

    } else {

      setForm({
        title: "",
        subtitle: "",
        image_url: "",
        whatsapp_number: "",
        button_text:
          "View Offer",
        sort_order: 0,
        is_active: true,
      });

    }

  }, [promotion, open]);

  const handleChange =
    (e) => {

      const {
        name,
        value,
        type,
        checked,
      } = e.target;

      setForm((prev) => ({
        ...prev,
        [name]:
          type === "checkbox"
            ? checked
            : value,
      }));

    };

  const handleUpload =
    async (e) => {

      try {

        const file =
          e.target.files[0];

        if (!file) return;

        setUploading(true);

        const toastId =
          toast.loading(
            "Uploading image..."
          );

        const result =
          await uploadImage(
            file
          );

        setForm((prev) => ({
          ...prev,
          image_url:
            result.url,
        }));

        toast.success(
          "Image uploaded",
          {
            id: toastId,
          }
        );

      } catch (error) {

        console.error(error);

        toast.error(
          "Upload failed"
        );

      } finally {

        setUploading(false);

      }

    };

  const handleSubmit =
    async (e) => {

      e.preventDefault();

      try {

        if (!form.title) {

          return toast.error(
            "Title required"
          );

        }

        setSaving(true);

        const toastId =
          toast.loading(
            promotion
              ? "Updating..."
              : "Creating..."
          );

        if (promotion) {

          await updatePromotion(
            promotion.id,
            form
          );

        } else {

          await createPromotion(
            form
          );

        }

        toast.success(
          promotion
            ? "Promotion updated"
            : "Promotion created",
          {
            id: toastId,
          }
        );

        onSuccess();

        onClose();

      } catch (error) {

        console.error(error);

        toast.error(
          error?.response?.data
            ?.message ||
          "Failed"
        );

      } finally {

        setSaving(false);

      }

    };

  if (!open) return null;

  return (
    <div
      className="
        fixed
        inset-0
        bg-black/50
        z-50
        flex
        items-center
        justify-center
        p-6
      "
    >

      <div
  className="
    bg-white
    rounded-3xl
    w-full
    max-w-2xl
    max-h-[90vh]
    overflow-y-auto
    scrollbar-hide
  "
>

        <div
          className="
            flex
            items-center
            justify-between
            p-6
            border-b
          "
        >

          <h2 className="text-xl font-bold">

            {promotion
              ? "Edit Promotion"
              : "Add Promotion"}

          </h2>

          <button
            onClick={onClose}
          >
            <X size={22} />
          </button>

        </div>

        <form
          onSubmit={
            handleSubmit
          }
          className="p-6 space-y-5"
        >

          <div>

            <label className="block mb-2 font-medium">
              Title
            </label>

            <input
              type="text"
              name="title"
              value={form.title}
              onChange={
                handleChange
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

          <div>

            <label className="block mb-2 font-medium">
              Subtitle
            </label>

            <input
              type="text"
              name="subtitle"
              value={form.subtitle}
              onChange={
                handleChange
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

          <div>

            <label className="block mb-2 font-medium">
              WhatsApp Number
            </label>

            <input
              type="text"
              name="whatsapp_number"
              value={
                form.whatsapp_number
              }
              onChange={
                handleChange
              }
              placeholder="628123456789"
              className="
                w-full
                h-12
                border
                rounded-xl
                px-4
              "
            />

          </div>

          <div>

            <label className="block mb-2 font-medium">
              Button Text
            </label>

            <input
              type="text"
              name="button_text"
              value={
                form.button_text
              }
              onChange={
                handleChange
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

          <div>

            <label className="block mb-2 font-medium">
              Sort Order
            </label>

            <input
              type="number"
              name="sort_order"
              value={
                form.sort_order
              }
              onChange={
                handleChange
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

          <div>

            <label className="block mb-2 font-medium">
              Promotion Image
            </label>

            <input
              type="file"
              accept="image/*"
              onChange={
                handleUpload
              }
            />

          </div>

          {form.image_url && (

            <img
              src={form.image_url}
              alt=""
              className="
                w-full
                h-52
                rounded-2xl
                object-cover
              "
            />

          )}

          <label
            className="
              flex
              items-center
              gap-3
            "
          >

            <input
              type="checkbox"
              name="is_active"
              checked={
                form.is_active
              }
              onChange={
                handleChange
              }
            />

            Active Promotion

          </label>

          <button
            type="submit"
            disabled={
              saving ||
              uploading
            }
            className="
              w-full
              h-12
              bg-[#14213D]
              text-white
              rounded-xl
              font-semibold
            "
          >

            {saving
              ? "Saving..."
              : "Save Promotion"}

          </button>

        </form>

      </div>

    </div>
  );
}

export default PromotionModal;