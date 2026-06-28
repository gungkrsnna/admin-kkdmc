import { useEffect, useState } from "react";
import {
  Trash2,
  Power,
} from "lucide-react";
import AdminLayout from "../../layouts/AdminLayout";

import {
    updateSubscriberStatus,
  deleteSubscriber,
  getSubscribers,
  exportSubscribers,
} from "../../services/newsletterService";

function NewsletterPage() {
  const [subscribers, setSubscribers] =
    useState([]);

    const [loading, setLoading] =
    useState(true);

    const [search, setSearch] =
    useState("");

  useEffect(() => {
  loadSubscribers();
}, []);

const handleToggleStatus =
  async (subscriber) => {
    try {
      await updateSubscriberStatus(
        subscriber.id,
        !subscriber.is_active
      );

      loadSubscribers();
    } catch (error) {
      console.error(error);
    }
  };

const handleDelete =
  async (subscriber) => {

    const confirmed =
      window.confirm(
        `Delete ${subscriber.email}?`
      );

    if (!confirmed) return;

    try {
      await deleteSubscriber(
        subscriber.id
      );

      loadSubscribers();
    } catch (error) {
      console.error(error);
    }
  };

const loadSubscribers =
  async () => {
    try {
      setLoading(true);

      const data =
        await getSubscribers();

      setSubscribers(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleExport =
  async () => {
    try {

      const data =
        await exportSubscribers();

      const csv = [
        [
          "Email",
          "Source",
          "Status",
          "Subscribed At",
        ],

        ...data.map(
          (item) => [
            item.email,
            item.source,
            item.is_active
              ? "Active"
              : "Inactive",
            item.created_at,
          ]
        ),
      ]
        .map((row) =>
          row.join(",")
        )
        .join("\n");

      const blob =
        new Blob([csv], {
          type:
            "text/csv;charset=utf-8;",
        });

      const url =
        URL.createObjectURL(blob);

      const link =
        document.createElement(
          "a"
        );

      link.href = url;

      link.download =
        "newsletter-subscribers.csv";

      link.click();
    } catch (error) {
      console.error(error);
    }
  };

  const filteredSubscribers =
  subscribers.filter(
    (subscriber) =>
      subscriber.email
        ?.toLowerCase()
        .includes(
          search.toLowerCase()
        )
  );

  return (
    <AdminLayout>
      <div className="space-y-6">

        <div>
          <h1 className="text-3xl font-bold">
            Newsletter Subscribers
          </h1>

          <p className="text-gray-500">
            Manage newsletter subscribers.
          </p>
        </div>

        <div
  className="
    bg-white
    rounded-2xl
    p-6
    shadow-sm
  "
>
  <p className="text-gray-500">
    Total Subscribers
  </p>

  <h2 className="text-3xl font-bold mt-2">
    {subscribers.length}
  </h2>
</div>

<div className="flex items-center gap-3">

  <input
    type="text"
    placeholder="Search email..."
    value={search}
    onChange={(e) =>
      setSearch(e.target.value)
    }
    className="
      w-80
      px-4
      py-3
      border
      rounded-xl
      bg-white
    "
  />

  <button
   onClick={handleExport}
    className="
      px-4
      py-3
      bg-primary
      text-white
      rounded-xl
    "
  >
    Export CSV
  </button>

</div>

<div
  className="
    bg-white
    rounded-2xl
    p-4
    shadow-sm
  "
>
  <div className="overflow-x-auto">
  <table className="w-full">
    <thead>
      <tr className="border-b">
        <th className="text-left py-3 px-4">
          Email
        </th>

        <th className="text-left py-3 px-4">
          Source
        </th>

        <th className="text-left py-3 px-4">
          Status
        </th>

        <th className="text-left py-3 px-4">
          Subscribed At
        </th>

        <th className="text-left py-3 px-4">
          Actions
        </th>
      </tr>
    </thead>

    <tbody>
      {loading ? (
        <tr>
          <td
            colSpan="5"
            className="py-10 text-center"
          >
            Loading...
          </td>
        </tr>
      ) : filteredSubscribers.length ===
        0 ? (
        <tr>
          <td
            colSpan="5"
            className="py-10 text-center text-gray-500"
          >
            No subscribers found
          </td>
        </tr>
      ) : (
        filteredSubscribers.map(
          (subscriber) => (
            <tr
              key={subscriber.id}
              className="border-b hover:bg-gray-50"
            >
              <td className="px-4 py-4">
                {subscriber.email}
              </td>

              <td className="px-4 py-4">
                {subscriber.source}
              </td>

              <td className="px-4 py-4">
                <span
                  className={
                    subscriber.is_active
                      ? "text-green-600 font-medium"
                      : "text-red-600 font-medium"
                  }
                >
                  {subscriber.is_active
                    ? "Active"
                    : "Inactive"}
                </span>
              </td>

              <td className="px-4 py-4">
                {new Date(
                  subscriber.created_at
                ).toLocaleDateString()}
              </td>

              <td className="px-4 py-4">
  <div className="flex gap-2">

    <button
      onClick={() =>
        handleToggleStatus(
          subscriber
        )
      }
      className="
        p-2
        rounded-lg
        bg-yellow-100
        hover:bg-yellow-200
      "
    >
      <Power size={16} />
    </button>

    <button
      onClick={() =>
        handleDelete(
          subscriber
        )
      }
      className="
        p-2
        rounded-lg
        bg-red-100
        hover:bg-red-200
      "
    >
      <Trash2 size={16} />
    </button>

  </div>
</td>
            </tr>
          )
        )
      )}
    </tbody>
  </table>
</div>
</div>

      </div>
    </AdminLayout>
  );
}

export default NewsletterPage;