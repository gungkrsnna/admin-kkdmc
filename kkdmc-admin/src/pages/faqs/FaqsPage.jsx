import {
  useEffect,
  useState,
} from "react";

import AdminLayout from "../../layouts/AdminLayout";

import FaqModal from "./FaqModal";

import {
  getFaqs,
  createFaq,
  updateFaq,
  deleteFaq,
} from "../../services/faqService";

function FaqsPage() {
  const [faqs, setFaqs] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [search, setSearch] =
    useState("");

const [openModal, setOpenModal] =
  useState(false);

const [selectedFaq, setSelectedFaq] =
  useState(null);

  const loadFaqs =
    async () => {
      try {
        setLoading(true);

        const data =
          await getFaqs();

        setFaqs(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

  useEffect(() => {
    loadFaqs();
  }, []);

  const handleDelete =
    async (id) => {
      const confirmed =
        window.confirm(
          "Delete FAQ?"
        );

      if (!confirmed) return;

      try {
        await deleteFaq(id);

        loadFaqs();
      } catch (error) {
        console.error(error);
      }
    };

  const filteredFaqs =
    faqs.filter(
      (faq) =>
        faq.question
          ?.toLowerCase()
          .includes(
            search.toLowerCase()
          )
    );

const handleSave =
  async (payload) => {

    try {

      if (
        selectedFaq
      ) {

        await updateFaq(
          selectedFaq.id,
          payload
        );

      } else {

        await createFaq(
          payload
        );

      }

      setOpenModal(false);

      loadFaqs();

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
              FAQs
            </h1>

            <p className="text-gray-500">
              Manage frequently asked questions.
            </p>
          </div>

          <button
            onClick={() => {

                setSelectedFaq(null);

                setOpenModal(true);

            }}
            className="
              px-5
              py-3
              rounded-xl
              bg-primary
              text-white
            "
          >
            Add FAQ
          </button>

        </div>

        <div
          className="
            bg-white
            p-4
            rounded-2xl
            shadow-sm
          "
        >
          <input
            type="text"
            placeholder="Search FAQ..."
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

        <div
          className="
            bg-white
            rounded-2xl
            shadow-sm
            overflow-hidden
          "
        >
          <table className="w-full">

            <thead>

              <tr className="border-b bg-gray-50">

                <th className="px-4 py-3 text-left">
                  Question
                </th>

                <th className="px-4 py-3 text-left">
                  Category
                </th>

                <th className="px-4 py-3 text-left">
                  Order
                </th>

                <th className="px-4 py-3 text-left">
                  Status
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
                    colSpan="5"
                    className="
                      py-10
                      text-center
                    "
                  >
                    Loading...
                  </td>
                </tr>
              ) : filteredFaqs.length ===
                0 ? (
                <tr>
                  <td
                    colSpan="5"
                    className="
                      py-10
                      text-center
                    "
                  >
                    No FAQ found
                  </td>
                </tr>
              ) : (
                filteredFaqs.map(
                  (faq) => (
                    <tr
                      key={faq.id}
                      className="border-b"
                    >

                      <td className="px-4 py-4">
                        {faq.question}
                      </td>

                      <td className="px-4 py-4">
                        {
                          faq
                            .faq_categories
                            ?.name
                        }
                      </td>

                      <td className="px-4 py-4">
                        {
                          faq.sort_order
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
                              faq.is_active
                                ? "bg-green-100 text-green-700"
                                : "bg-red-100 text-red-700"
                            }
                          `}
                        >
                          {faq.is_active
                            ? "Active"
                            : "Inactive"}
                        </span>

                      </td>

                      <td className="px-4 py-4 flex gap-2">

                        <button
                        onClick={() => {

                            setSelectedFaq(faq);

                            setOpenModal(true);

                        }}
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
                              faq.id
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

      <FaqModal
  open={openModal}
  onClose={() =>
    setOpenModal(false)
  }
  onSubmit={handleSave}
  initialData={selectedFaq}
/>
    </AdminLayout>
  );
}

export default FaqsPage;