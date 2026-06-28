import {
  useState,
  useEffect,
} from "react";

import { X }
from "lucide-react";

import { toast }
from "react-hot-toast";

import {
  updateInquiry,
} from "../../services/inquiryService";

function InquiryDetailModal({
  inquiry,
  onClose,
  onSuccess,
}) {

  const [status,
  setStatus] =
  useState("pending");

  const [adminNotes,
  setAdminNotes] =
  useState("");

  const [saving,
  setSaving] =
  useState(false);

  useEffect(() => {

    if (inquiry) {

      setStatus(
        inquiry.status
      );

      setAdminNotes(
        inquiry.admin_notes ||
        ""
      );

    }

  }, [inquiry]);

  if (!inquiry)
    return null;

  const handleSave =
    async () => {

      try {

        setSaving(true);

        const toastId =
          toast.loading(
            "Updating..."
          );

        await updateInquiry(
          inquiry.id,
          {
            status,
            admin_notes:
              adminNotes,
          }
        );

        toast.success(
          "Inquiry updated",
          {
            id: toastId,
          }
        );

        onSuccess();

        onClose();

      } catch (error) {

        toast.error(
          error?.response?.data
            ?.message ||
          "Failed"
        );

      } finally {

        setSaving(false);

      }

    };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-6">

      <div className="bg-white rounded-3xl w-full max-w-3xl max-h-[90vh] flex flex-col">

        <div className="p-6 border-b flex items-center justify-between">

          <h2 className="text-2xl font-bold">
            Inquiry Detail
          </h2>

          <button
            onClick={onClose}
          >
            <X size={22} />
          </button>

        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-hide">

          <div className="grid md:grid-cols-2 gap-4">

            <Info
              label="Full Name"
              value={inquiry.full_name}
            />

            <Info
              label="Email"
              value={inquiry.email}
            />

            <Info
              label="WhatsApp"
              value={inquiry.whatsapp}
            />

            <Info
              label="Nationality"
              value={inquiry.nationality}
            />

            <Info
              label="Destination"
              value={inquiry.destination}
            />

            <Info
              label="Travel Date"
              value={inquiry.travel_date}
            />

            <Info
              label="Pax"
              value={inquiry.pax}
            />

          </div>

          <div>

            <h3 className="font-bold mb-3">
              Inquiry Message
            </h3>

            <div className="border rounded-2xl p-4 bg-gray-50">
              {inquiry.inquiry}
            </div>

          </div>

          <div>

            <label className="block mb-2 font-semibold">
              Status
            </label>

            <select
              value={status}
              onChange={(e) =>
                setStatus(
                  e.target.value
                )
              }
              className="w-full h-12 border rounded-xl px-4"
            >
              <option value="pending">
                Pending
              </option>

              <option value="contacted">
                Contacted
              </option>

              <option value="quoted">
                Quoted
              </option>

              <option value="converted">
                Converted
              </option>

              <option value="closed">
                Closed
              </option>

            </select>

          </div>

          <div>

            <label className="block mb-2 font-semibold">
              Admin Notes
            </label>

            <textarea
              rows="5"
              value={adminNotes}
              onChange={(e) =>
                setAdminNotes(
                  e.target.value
                )
              }
              className="w-full border rounded-2xl p-4"
            />

          </div>

        </div>

        <div className="border-t p-6 flex justify-end">

          <button
            onClick={handleSave}
            disabled={saving}
            className="
              bg-[#14213D]
              text-white
              px-6
              py-3
              rounded-xl
              font-semibold
            "
          >
            {saving
              ? "Saving..."
              : "Save Changes"}
          </button>

        </div>

      </div>

    </div>
  );
}

function Info({
  label,
  value,
}) {
  return (
    <div className="border rounded-2xl p-4">
      <p className="text-xs text-gray-500 mb-1">
        {label}
      </p>

      <p className="font-medium">
        {value || "-"}
      </p>
    </div>
  );
}

export default InquiryDetailModal;