import {
  useEffect,
  useState,
} from "react";

import {
  Plus,
  Search,
  Pencil,
  Trash2,
} from "lucide-react";

import AdminLayout
from "../../layouts/AdminLayout";

import {
  getTourPackages,
  deleteTourPackage,
} from "../../services/tourPackageService";
import { useNavigate } from "react-router-dom";
import { toast }
from "react-hot-toast";


function TourPackagesPage() {

    const navigate = useNavigate();

  const [packages,
    setPackages] =
    useState([]);

  const [loading,
    setLoading] =
    useState(true);

  const [search,
    setSearch] =
    useState("");

  const [openDeleteModal,
    setOpenDeleteModal] =
    useState(false);
  
  const [selectedPackage,
    setSelectedPackage] =
    useState(null);
  
  const [deleteConfirmText,
    setDeleteConfirmText] =
    useState("");

  const loadPackages =
    async () => {
      try {

        const data =
          await getTourPackages();

        setPackages(data);

      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

  useEffect(() => {
    loadPackages();
  }, []);

  const filteredPackages =
    packages.filter(
      (item) =>
        item.title
          ?.toLowerCase()
          .includes(
            search.toLowerCase()
          )
    );

    const confirmDeletePackage =
      async () => {

        try {

          const toastId =
            toast.loading(
              "Deleting package..."
            );

          await deleteTourPackage(
            selectedPackage.id
          );

          setPackages(
            packages.filter(
              (p) =>
                p.id !==
                selectedPackage.id
            )
          );

          setOpenDeleteModal(false);

          setSelectedPackage(null);

          setDeleteConfirmText("");

          toast.success(
            "Package deleted successfully",
            {
              id: toastId,
            }
          );

        } catch (error) {

          console.error(error);

          toast.error(
            error?.response?.data
              ?.message ||
            "Failed to delete package"
          );

        }

    };

  return (
    <AdminLayout>

      <div className="space-y-6">

        {/* Header */}
        <div className="flex items-center justify-between">

          <div>
            <h1 className="text-3xl font-black">
              Tour Packages
            </h1>

            <p className="text-gray-500">
              Manage all tour packages
            </p>
          </div>

          <button
  onClick={() =>
    navigate("/tour-packages/create")
  }
  className="
    bg-[#14213D]
    text-white
    px-5
    py-3
    rounded-xl
    flex
    items-center
    gap-2
  "
>
  <Plus size={18} />
  Add Package
</button>

        </div>

        {/* Search */}
        <div
          className="
            bg-white
            rounded-2xl
            p-4
            shadow-sm
          "
        >
          <div
            className="
              flex
              items-center
              gap-3
              border
              rounded-xl
              px-4
              h-12
            "
          >
            <Search size={18} />

            <input
              value={search}
              onChange={(e) =>
                setSearch(
                  e.target.value
                )
              }
              placeholder="Search package..."
              className="
                flex-1
                outline-none
              "
            />
          </div>
        </div>

        {/* Table */}
        <div
          className="
            bg-white
            rounded-2xl
            overflow-hidden
            shadow-sm
          "
        >

          {loading ? (

            <div className="p-10 text-center">
              Loading...
            </div>

          ) : (

            <table className="w-full">

              <thead
                className="
                  bg-gray-50
                  border-b
                "
              >
                <tr>

                  <th className="text-left px-6 py-4">
                    Package
                  </th>

                  <th className="text-left px-6 py-4">
                    Category
                  </th>

                  <th className="text-left px-6 py-4">
                    Location
                  </th>

                  <th className="text-left px-6 py-4">
                    Status
                  </th>

                  <th className="text-center px-6 py-4">
                    Action
                  </th>

                </tr>
              </thead>

              <tbody>

                {filteredPackages.map(
                  (pkg) => (
                    <tr
                      key={pkg.id}
                      className="border-b"
                    >
                      <td className="px-6 py-4">

                        <div>
                          <p className="font-semibold">
                            {pkg.title}
                          </p>

                          <p
                            className="
                              text-sm
                              text-gray-500
                            "
                          >
                            {pkg.slug}
                          </p>
                        </div>

                      </td>

                      <td className="px-6 py-4">
                        {
                          pkg.categories
                            ?.title
                        }
                      </td>

                      <td className="px-6 py-4">
                        {pkg.location}
                      </td>

                      <td className="px-6 py-4">

                        <span
                          className={`
                            px-3
                            py-1
                            rounded-full
                            text-xs

                            ${
                              pkg.is_active
                                ? "bg-green-100 text-green-700"
                                : "bg-red-100 text-red-700"
                            }
                          `}
                        >
                          {
                            pkg.is_active
                              ? "Active"
                              : "Inactive"
                          }
                        </span>

                      </td>

                      <td className="px-6 py-4">

                        <div
                          className="
                            flex
                            justify-center
                            gap-2
                          "
                        >
                          <button
                            onClick={() =>
                              navigate(
                                `/tour-packages/edit/${pkg.id}`
                              )
                            }
                          >
                            <Pencil size={18} />
                          </button>

                          <button
                            type="button"
                            className="
                              text-red-600
                            "
                            onClick={() => {

                              setSelectedPackage(pkg);

                              setDeleteConfirmText("");

                              setOpenDeleteModal(true);

                            }}
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>

                      </td>
                    </tr>
                  )
                )}

              </tbody>

            </table>

          )}

        </div>

      </div>

      {openDeleteModal && (

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
      Delete Tour Package
    </h2>

    <p
      className="
        text-gray-600
        mb-4
      "
    >
      This action cannot be undone.
    </p>

    <p
      className="
        text-sm
        mb-4
      "
    >
      Type package title:
    </p>

    <div
      className="
        bg-gray-100
        rounded-xl
        px-4
        py-3
        font-semibold
        mb-4
      "
    >
      {selectedPackage?.title}
    </div>

    <input
      value={
        deleteConfirmText
      }
      onChange={(e) =>
        setDeleteConfirmText(
          e.target.value
        )
      }
      placeholder="Type package title"
      className="
        w-full
        h-12
        border
        rounded-xl
        px-4
        mb-6
      "
    />

    <div
      className="
        flex
        justify-end
        gap-3
      "
    >

      <button
        type="button"
        onClick={() => {

          setOpenDeleteModal(false);

          setSelectedPackage(null);

          setDeleteConfirmText("");

        }}
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
        type="button"
        disabled={
          deleteConfirmText !==
          selectedPackage?.title
        }
        onClick={
          confirmDeletePackage
        }
        className={`
          px-4
          py-2
          rounded-xl
          text-white

          ${
            deleteConfirmText ===
            selectedPackage?.title
              ? "bg-red-600"
              : "bg-gray-300 cursor-not-allowed"
          }
        `}
      >
        Delete Package
      </button>

    </div>

  </div>

</div>

)}

    </AdminLayout>
  );
}

export default TourPackagesPage;