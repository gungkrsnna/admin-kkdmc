import {
  useEffect,
  useState,
} from "react";

import AdminLayout
from "../../layouts/AdminLayout";

import toast from "react-hot-toast";

function ProductContentPage() {

  const [hero, setHero] =
    useState(null);

  const [heroImage, setHeroImage] =
    useState(null);

  useEffect(() => {

    loadHero();

  }, []);

  const loadHero =
    async () => {

      try {

        const response =
          await fetch(
            "https://kkdmc.gladiatoraruna.com/api/home-sections/activities_hero"
          );

        const data =
          await response.json();

        setHero(data);

      } catch (error) {

        console.error(error);

      }

    };

  const saveHero =
    async () => {

      try {

        let imageUrl =
          hero.image_url;

        if (heroImage) {

          const formData =
            new FormData();

          formData.append(
            "image",
            heroImage
          );

          const uploadResponse =
            await fetch(
              "https://kkdmc.gladiatoraruna.com/api/cms/upload",
              {
                method: "POST",
                body: formData,
              }
            );

          const uploadData =
            await uploadResponse.json();

          imageUrl =
            uploadData.image_url;

        }

        const response =
          await fetch(
            "https://kkdmc.gladiatoraruna.com/api/home-sections/activities_hero",
            {
              method: "PUT",
              headers: {
                "Content-Type":
                  "application/json",
              },
              body: JSON.stringify({
                badge:
                  hero.badge,
                title:
                  hero.title,
                description:
                  hero.description,
                image_url:
                  imageUrl,
              }),
            }
          );

        if (!response.ok) {

          throw new Error(
            "Failed to update"
          );

        }

        setHero({
          ...hero,
          image_url:
            imageUrl,
        });

        toast.success(
          "Product Hero updated successfully"
        );

      } catch (error) {

        console.error(error);

        toast.error(
          "Failed to update Product Hero"
        );

      }

    };

  return (

    <AdminLayout>

      <div className="p-8">

        <h1 className="text-3xl font-black mb-8">
          Product Content
        </h1>

        <div className="bg-white rounded-3xl p-8 shadow-sm">

          <h2 className="text-xl font-bold mb-6">
            Products Hero Section
          </h2>

          <div className="space-y-5">

            <div>

              <label className="block mb-2 font-medium">
                Badge
              </label>

              <input
                value={
                  hero?.badge || ""
                }
                onChange={(e) =>
                  setHero({
                    ...hero,
                    badge:
                      e.target.value,
                  })
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
                Title
              </label>

              <input
                value={
                  hero?.title || ""
                }
                onChange={(e) =>
                  setHero({
                    ...hero,
                    title:
                      e.target.value,
                  })
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
                Description
              </label>

              <textarea
                rows="5"
                value={
                  hero?.description || ""
                }
                onChange={(e) =>
                  setHero({
                    ...hero,
                    description:
                      e.target.value,
                  })
                }
                className="
                  w-full
                  border
                  rounded-xl
                  p-4
                "
              />

            </div>

            <div>

              <label className="block mb-2 font-medium">
                Background Image
              </label>

              <input
                type="file"
                accept="image/*"
                onChange={(e) =>
                  setHeroImage(
                    e.target.files[0]
                  )
                }
              />

            </div>

            {hero?.image_url && (

              <img
                src={
                  heroImage
                    ? URL.createObjectURL(
                        heroImage
                      )
                    : hero.image_url
                }
                alt=""
                className="
                  w-full
                  h-72
                  object-cover
                  rounded-2xl
                "
              />

            )}

          </div>

          <button
            onClick={saveHero}
            className="
              mt-6
              bg-primary
              text-white
              px-6
              py-3
              rounded-xl
              font-semibold
            "
          >
            Save Product Hero
          </button>

        </div>

      </div>

    </AdminLayout>

  );

}

export default ProductContentPage;