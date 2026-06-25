import {
  useEffect,
  useState,
} from "react";

import {
  useNavigate,
} from "react-router-dom";

import AdminLayout from "../../layouts/AdminLayout";

import {
  getCampaigns,
  deleteCampaign,
  sendCampaign,
} from "../../services/newsletterCampaignService";

function CampaignsPage() {
    const navigate =
  useNavigate();

  const [campaigns, setCampaigns] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [search, setSearch] =
    useState("");

    const [sendModal, setSendModal] =
  useState(false);

  const [deleteModal, setDeleteModal] =
  useState(false);

const [campaignToDelete,
  setCampaignToDelete] =
  useState(null);

const [deleting, setDeleting] =
  useState(false);

const [selectedCampaign,
  setSelectedCampaign] =
  useState(null);

const [sending, setSending] =
  useState(false);

const [sendResult,
  setSendResult] =
  useState(null);

  useEffect(() => {
    loadCampaigns();
  }, []);

  const openSendModal =
  (campaign) => {

    setSelectedCampaign(
      campaign
    );

    setSendResult(null);

    setSendModal(true);

  };

  const openDeleteModal =
  (campaign) => {

    setCampaignToDelete(
      campaign
    );

    setDeleteModal(true);

  };

  const confirmDeleteCampaign =
  async () => {

    try {

      setDeleting(true);

      await deleteCampaign(
        campaignToDelete.id
      );

      setDeleteModal(false);

      setCampaignToDelete(
        null
      );

      loadCampaigns();

    } catch (error) {

      console.error(error);

    } finally {

      setDeleting(false);

    }

  };

  const loadCampaigns =
    async () => {
      try {
        setLoading(true);

        const data =
          await getCampaigns();

        setCampaigns(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

  const filteredCampaigns =
    campaigns.filter(
      (campaign) =>
        campaign.title
          ?.toLowerCase()
          .includes(
            search.toLowerCase()
          ) ||
        campaign.subject
          ?.toLowerCase()
          .includes(
            search.toLowerCase()
          )
    );

    const handleDelete =
    async (id) => {

        const confirmed =
        window.confirm(
            "Delete campaign?"
        );

        if (!confirmed) return;

        try {

        await deleteCampaign(id);

        loadCampaigns();

        } catch (error) {
        console.error(error);
        }
    };

    const handleSend =
  async (id) => {

    const confirmed =
      window.confirm(
        "Send this campaign to all active subscribers?"
      );

    if (!confirmed) return;

    try {

      await sendCampaign(id);

      alert(
        "Campaign sent successfully"
      );

      loadCampaigns();

    } catch (error) {

      console.error(error);

      alert(
        error?.response?.data?.message ||
        "Failed to send campaign"
      );

    }
  };

  const confirmSendCampaign =
  async () => {

    try {

      setSending(true);

      const result =
        await sendCampaign(
          selectedCampaign.id
        );

      setSendResult(result);

      loadCampaigns();

    } catch (error) {

      setSendResult({
        success: false,
        message:
          error?.response?.data
            ?.message ||
          "Failed to send campaign",
      });

    } finally {

      setSending(false);

    }

  };

  return (
    <AdminLayout>
        
        <div className="space-y-6">

            <div className="flex justify-between items-center">

                <div>
                <h1 className="text-3xl font-bold">
                    Newsletter Campaigns
                </h1>

                <p className="text-gray-500">
                    Manage newsletter campaigns.
                </p>
                </div>

                <button
                onClick={() =>
                    navigate(
                    "/newsletter-campaigns/create"
                    )
                }
                className="
                    px-5
                    py-3
                    rounded-xl
                    bg-primary
                    text-white
                    font-medium
                "
                >
                New Campaign
                </button>

            </div>

            <div className="bg-white p-4 rounded-2xl shadow-sm">

                <input
                    type="text"
                    value={search}
                    onChange={(e) =>
                    setSearch(e.target.value)
                    }
                    placeholder="Search campaign..."
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
                        Title
                        </th>

                        <th className="px-4 py-3 text-left">
                        Subject
                        </th>

                        <th className="px-4 py-3 text-left">
                        Status
                        </th>

                        <th className="px-4 py-3 text-left">
                        Recipients
                        </th>

                        <th className="px-4 py-3 text-left">
                        Created
                        </th>

                        <th className="px-4 py-3 text-left">
                        Actions
                        </th>

                    </tr>

                    </thead>

                    <tbody>

                    {loading ? (

                        <tr>
                        <td
                            colSpan="6"
                            className="text-center py-10"
                        >
                            Loading...
                        </td>
                        </tr>

                    ) : filteredCampaigns.length ===
                        0 ? (

                        <tr>
                        <td
                            colSpan="6"
                            className="text-center py-10"
                        >
                            No campaigns found
                        </td>
                        </tr>

                    ) : (

                        filteredCampaigns.map(
                        (campaign) => (

                            <tr
                            key={campaign.id}
                            className="border-b"
                            >

                            <td className="px-4 py-4">
                                {campaign.title}
                            </td>

                            <td className="px-4 py-4">
                                {campaign.subject}
                            </td>

                            <td className="px-4 py-4">

                                <span
                                className="
                                    px-3
                                    py-1
                                    rounded-full
                                    text-xs
                                    bg-yellow-100
                                    text-yellow-700
                                "
                                >
                                {campaign.status}
                                </span>

                            </td>

                            <td className="px-4 py-4">
                                {campaign.total_recipients}
                            </td>

                            <td className="px-4 py-4">
                                {new Date(
                                campaign.created_at
                                ).toLocaleDateString()}
                            </td>

                            <td className="px-4 py-4 flex gap-2">

  <button
    onClick={() =>
      openSendModal(
        campaign
      )
    }
    className="
      px-3
      py-2
      rounded-lg
      bg-green-600
      text-white
    "
  >
    Send
  </button>

  <button
    onClick={() =>
      navigate(
        `/newsletter-campaigns/edit/${campaign.id}`
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
      openDeleteModal(
        campaign
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

        {sendModal && (

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
        max-w-lg
        p-6
      "
    >

      <h2
        className="
          text-xl
          font-bold
          mb-4
        "
      >
        Send Campaign
      </h2>

      <div className="space-y-2">

        <p>
          <strong>Title:</strong>{" "}
          {selectedCampaign?.title}
        </p>

        <p>
          <strong>Subject:</strong>{" "}
          {selectedCampaign?.subject}
        </p>

      </div>

      {!sendResult ? (

        <>
          <p
            className="
              mt-6
              text-gray-600
            "
          >
            Are you sure you want
            to send this campaign
            to all active
            subscribers?
          </p>

          <div
            className="
              flex
              justify-end
              gap-3
              mt-6
            "
          >

            <button
              onClick={() =>
                setSendModal(false)
              }
              className="
                px-4
                py-2
                rounded-xl
                border
              "
            >
              Cancel
            </button>

            <button
              disabled={sending}
              onClick={
                confirmSendCampaign
              }
              className="
                px-4
                py-2
                rounded-xl
                bg-green-600
                text-white
              "
            >
              {sending
                ? "Sending..."
                : "Send Campaign"}
            </button>

          </div>
        </>

      ) : (

        <div className="mt-6">

          <div
            className="
              bg-green-50
              border
              border-green-200
              rounded-xl
              p-4
            "
          >

            <p>
              Sent:
              {" "}
              {
                sendResult.total_sent
              }
            </p>

            <p>
              Failed:
              {" "}
              {
                sendResult.total_failed
              }
            </p>

            <p>
              Recipients:
              {" "}
              {
                sendResult.total_recipients
              }
            </p>

          </div>

          <div
            className="
              flex
              justify-end
              mt-4
            "
          >

            <button
              onClick={() =>
                setSendModal(false)
              }
              className="
                px-4
                py-2
                rounded-xl
                bg-primary
                text-white
              "
            >
              Close
            </button>

          </div>

        </div>

      )}

    </div>

  </div>

)}

{deleteModal && (

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
        max-w-md
      "
    >

      <h2
        className="
          text-xl
          font-bold
          mb-3
        "
      >
        Delete Campaign
      </h2>

      <p className="text-gray-600">

        Are you sure you want to
        delete:

      </p>

      <p
        className="
          mt-2
          font-semibold
        "
      >
        {campaignToDelete?.title}
      </p>

      <p
        className="
          mt-3
          text-red-500
          text-sm
        "
      >
        This action cannot be
        undone.
      </p>

      <div
        className="
          flex
          justify-end
          gap-3
          mt-6
        "
      >

        <button
          onClick={() =>
            setDeleteModal(false)
          }
          className="
            px-4
            py-2
            rounded-xl
            border
          "
        >
          Cancel
        </button>

        <button
          disabled={deleting}
          onClick={
            confirmDeleteCampaign
          }
          className="
            px-4
            py-2
            rounded-xl
            bg-red-600
            text-white
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

export default CampaignsPage;