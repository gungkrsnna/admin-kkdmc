import { useEffect, useState } from "react";

import {
  Plus,
  Pencil,
  Trash2,
} from "lucide-react";

import { toast } from "react-hot-toast";

import AdminLayout
from "../../layouts/AdminLayout";

import {
  getPromotions,
  deletePromotion,
} from "../../services/promotionService";

import PromotionModal
from "./PromotionModal";

function PromotionsPage() {

  const [promotions,
  setPromotions] =
  useState([]);

  const [loading,
  setLoading] =
  useState(true);

  const [openModal,
  setOpenModal] =
  useState(false);

  const [selectedPromotion,
  setSelectedPromotion] =
  useState(null);

  const loadPromotions =
    async () => {

      try {

        const data =
          await getPromotions();

        setPromotions(data);

      } catch (error) {

        console.error(error);

      } finally {

        setLoading(false);

      }

    };

  useEffect(() => {

    loadPromotions();

  }, []);

  const handleDelete =
    async (promotion) => {

      if (
        !window.confirm(
          `Delete "${promotion.title}" ?`
        )
      ) {
        return;
      }

      try {

        const toastId =
          toast.loading(
            "Deleting..."
          );

        await deletePromotion(
          promotion.id
        );

        toast.success(
          "Promotion deleted",
          {
            id: toastId,
          }
        );

        loadPromotions();

      } catch (error) {

        toast.error(
          error?.response?.data
            ?.message ||
          "Failed to delete"
        );

      }

    };

  return (
    <AdminLayout>

      <div className="space-y-6">

        <div className="flex justify-between items-center">

          <div>

            <h1 className="text-3xl font-black">
              Promotions
            </h1>

            <p className="text-gray-500">
              Manage website promotions
            </p>

          </div>

          <button
            onClick={() => {

              setSelectedPromotion(
                null
              );

              setOpenModal(true);

            }}
            className="
              bg-[#14213D]
              text-white
              px-5
              py-3
              rounded-xl
            "
          >
            <Plus size={18} />

            Add Promotion
          </button>

        </div>

        <div
          className="
            bg-white
            rounded-2xl
            shadow-sm
            overflow-hidden
          "
        >

          {loading ? (

            <div className="p-10 text-center">
              Loading...
            </div>

          ) : (

            <table className="w-full">

              <thead className="bg-gray-50">

                <tr>

                  <th className="px-6 py-4 text-left">
                    Image
                  </th>

                  <th className="px-6 py-4 text-left">
                    Title
                  </th>

                  <th className="px-6 py-4 text-left">
                    Status
                  </th>

                  <th className="px-6 py-4 text-center">
                    Action
                  </th>

                </tr>

              </thead>

              <tbody>

                {promotions.map(
                  (promo) => (

                    <tr
                      key={promo.id}
                      className="border-t"
                    >

                      <td className="px-6 py-4">

                        <img
                          src={promo.image_url}
                          alt=""
                          className="
                            w-24
                            h-16
                            rounded-lg
                            object-cover
                          "
                        />

                      </td>

                      <td className="px-6 py-4">

                        <p className="font-semibold">
                          {promo.title}
                        </p>

                        <p className="text-sm text-gray-500">
                          {promo.subtitle}
                        </p>

                      </td>

                      <td className="px-6 py-4">

                        <span
                          className={`
                            px-3
                            py-1
                            rounded-full
                            text-xs

                            ${
                              promo.is_active
                                ? "bg-green-100 text-green-700"
                                : "bg-red-100 text-red-700"
                            }
                          `}
                        >
                          {promo.is_active
                            ? "Active"
                            : "Inactive"}
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
                            onClick={() => {

                              setSelectedPromotion(
                                promo
                              );

                              setOpenModal(
                                true
                              );

                            }}
                          >
                            <Pencil
                              size={18}
                            />
                          </button>

                          <button
                            onClick={() =>
                              handleDelete(
                                promo
                              )
                            }
                            className="
                              text-red-600
                            "
                          >
                            <Trash2
                              size={18}
                            />
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

      <PromotionModal
        open={openModal}
        promotion={
          selectedPromotion
        }
        onClose={() => {

          setOpenModal(false);

          setSelectedPromotion(
            null
          );

        }}
        onSuccess={
          loadPromotions
        }
      />

    </AdminLayout>
  );
}

export default PromotionsPage;