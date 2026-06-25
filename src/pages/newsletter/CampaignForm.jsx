import {
  useEffect,
  useState,
} from "react";

import {
  useNavigate,
  useParams,
} from "react-router-dom";

import AdminLayout
from "../../layouts/AdminLayout";

import {
  createCampaign,
  updateCampaign,
  getCampaignById,
} from "../../services/newsletterCampaignService";


// ===============================================

function CampaignForm() {
  const navigate =
    useNavigate();

    const { id } =
    useParams();

    const isEdit =
    Boolean(id);

    const [form, setForm] =
    useState({
        title: "",
        subject: "",
        content: "",
    });

    const [loading, setLoading] =
    useState(false);

    useEffect(() => {
  if (isEdit) {
    loadCampaign();
  }
}, [id]);

const loadCampaign =
  async () => {
    try {

      const data =
        await getCampaignById(id);

      setForm({
        title:
          data.title || "",
        subject:
          data.subject || "",
        content:
          data.content || "",
      });

    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit =
  async (e) => {

    e.preventDefault();

    try {

      setLoading(true);

      if (isEdit) {

        await updateCampaign(
          id,
          form
        );

      } else {

        await createCampaign(
          form
        );

      }

      navigate(
        "/newsletter-campaigns"
      );

    } catch (error) {

      console.error(error);

    } finally {

      setLoading(false);

    }
  };

  return (

    <AdminLayout>

        <form
  onSubmit={handleSubmit}
  className="space-y-6"
>

  <div>

    <h1 className="text-3xl font-bold">

      {isEdit
        ? "Edit Campaign"
        : "Create Campaign"}

    </h1>

  </div>

  <div className="bg-white p-6 rounded-2xl">

    <label className="block mb-2 font-medium">
      Campaign Title
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
        border
        rounded-xl
        px-4
        py-3
      "
    />

  </div>

  <div className="bg-white p-6 rounded-2xl">

    <label className="block mb-2 font-medium">
      Email Subject
    </label>

    <input
      type="text"
      value={form.subject}
      onChange={(e) =>
        setForm({
          ...form,
          subject:
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

  </div>

  <div className="bg-white p-6 rounded-2xl">

    <label className="block mb-2 font-medium">
      Email Content
    </label>

    <textarea
      rows={15}
      value={form.content}
      onChange={(e) =>
        setForm({
          ...form,
          content:
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

  </div>

  <button
    type="submit"
    disabled={loading}
    className="
      px-6
      py-3
      rounded-xl
      bg-primary
      text-white
    "
  >
    {loading
      ? "Saving..."
      : "Save Campaign"}
  </button>

</form>

    </AdminLayout>
   
  );
}

export default CampaignForm;