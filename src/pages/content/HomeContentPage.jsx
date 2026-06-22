import {
  useEffect,
  useState,
} from "react";

import {
  FaShieldAlt,
  FaWallet,
  FaHeadset,
} from "react-icons/fa";

import {
  MdEventAvailable,
} from "react-icons/md";

import AdminLayout
from "../../layouts/AdminLayout";

import toast from "react-hot-toast";

function HomeContentPage() {

  const [hero, setHero] =
    useState(null);

    const [sections, setSections] =
  useState([]);

  const [benefits, setBenefits] =
  useState([]);

const [heroImage, setHeroImage] =
  useState(null);

  const iconMap = {
  shield: FaShieldAlt,
  wallet: FaWallet,
  headset: FaHeadset,
  calendar: MdEventAvailable,
};

useEffect(() => {

  loadHero();
  loadSections();
  loadBenefits();

}, []);

  const loadSections =
  async () => {

    try {

      const response =
        await fetch(
          "https://kkdmc.gladiatoraruna.com/api/home-sections"
        );

      const data =
        await response.json();

      const order = [
        "popular_activities",
        "destinations",
        "why_choose_us",
      ];

      setSections(
        data
          .filter((item) =>
            order.includes(
              item.section_key
            )
          )
          .sort(
            (a, b) =>
              order.indexOf(
                a.section_key
              ) -
              order.indexOf(
                b.section_key
              )
          )
      );

    } catch (error) {

      console.error(error);

    }

  };

  const loadBenefits =
  async () => {

    try {

      const response =
        await fetch(
          "https://kkdmc.gladiatoraruna.com/api/home-sections/benefits"
        );

      const data =
        await response.json();

      setBenefits(data);

    } catch (error) {

      console.error(error);

    }

  };

  const loadHero =
    async () => {

      try {

        const response =
          await fetch(
            "https://kkdmc.gladiatoraruna.com/api/cms/home_hero"
          );

        const data =
          await response.json();

        setHero(data);

      } catch (error) {

        console.error(error);

      }

    };

const saveHero = async () => {

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

    await fetch(
      "https://kkdmc.gladiatoraruna.com/api/cms/home_hero",
      {
        method: "PUT",
        headers: {
          "Content-Type":
            "application/json",
        },
        body: JSON.stringify({
          title:
            hero.title,

          subtitle:
            hero.subtitle,

          description:
            hero.description,

          image_url:
            imageUrl,
        }),
      }
    );

    setHero({
      ...hero,
      image_url:
        imageUrl,
    });

    toast.success(
      "Hero updated successfully"
    );

  } catch (error) {

    console.error(error);

    toast.error(
      "Failed to update hero"
    );

  }

};

const saveSection =
  async (section) => {

    try {

      const response =
        await fetch(
          `https://kkdmc.gladiatoraruna.com/api/home-sections/${section.section_key}`,
          {
            method: "PUT",
            headers: {
              "Content-Type":
                "application/json",
            },
            body: JSON.stringify({
              badge:
                section.badge,
              title:
                section.title,
              description:
                section.description,
            }),
          }
        );

      if (!response.ok) {
        throw new Error(
          "Failed to update"
        );
      }

      toast.success(
        `${section.title} updated`
      );

    } catch (error) {

      console.error(error);

      toast.error(
        "Failed to update section"
      );

    }

  };

  const getSectionName =
  (key) => {

    switch (key) {

      case "popular_activities":
        return "Popular Activities";

      case "destinations":
        return "Top Destinations";

      case "why_choose_us":
        return "Why Choose Us";

      default:
        return key;
    }

  };

  const saveBenefit =
  async (benefit) => {

    try {

      const response =
        await fetch(
          `https://kkdmc.gladiatoraruna.com/api/home-sections/benefits/${benefit.id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type":
                "application/json",
            },
            body: JSON.stringify(
              benefit
            ),
          }
        );

      if (!response.ok) {
        throw new Error();
      }

      toast.success(
        "Benefit updated"
      );

    } catch (error) {

      console.error(error);

      toast.error(
        "Failed to update benefit"
      );

    }

  };

  return (

    <AdminLayout>

      <div className="p-8">

        <h1 className="text-3xl font-black mb-8">
          Home Content
        </h1>

        <div className="bg-white rounded-3xl p-8 shadow-sm">

            <h2 className="text-xl font-bold mb-6">
                Hero Section
            </h2>

            <div className="space-y-5">

                <div>

                <label className="block mb-2 font-medium">
                    Subtitle
                </label>

                <input
                    value={
                    hero?.subtitle || ""
                    }
                    onChange={(e) =>
                    setHero({
                        ...hero,
                        subtitle:
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
      : hero?.image_url
  }
  alt=""
  className="
    w-full
    h-60
    object-cover
    rounded-2xl
    mt-4
  "
/>

)}

            </div>

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
  Save Hero
</button>

      </div>


      <div className="mt-8 bg-white rounded-3xl p-8 shadow-sm">

  <h2 className="text-xl font-bold mb-6">
    Home Sections
  </h2>

  <div className="space-y-6">

    {sections.map(
      (section, index) => (

        <div
          key={section.section_key}
          className="
            border
            rounded-2xl
            p-6
          "
        >

          <h3 className="text-lg font-bold mb-6">
  {getSectionName(
    section.section_key
  )}
</h3>



          <div className="grid md:grid-cols-2 gap-4">

            <div>

              <label className="block mb-2 font-medium">
                Badge
              </label>

              <input
                value={
                  section.badge || ""
                }
                onChange={(e) => {

                  const updated =
                    [...sections];

                  updated[index] = {
                    ...section,
                    badge:
                      e.target.value,
                  };

                  setSections(
                    updated
                  );

                }}
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
                  section.title || ""
                }
                onChange={(e) => {

                  const updated =
                    [...sections];

                  updated[index] = {
                    ...section,
                    title:
                      e.target.value,
                  };

                  setSections(
                    updated
                  );

                }}
                className="
                  w-full
                  h-12
                  border
                  rounded-xl
                  px-4
                "
              />

            </div>

          </div>

          {section.section_key ===
            "why_choose_us" && (

            <div className="mt-4">

              <label className="block mb-2 font-medium">
                Description
              </label>

              <textarea
                rows="4"
                value={
                  section.description || ""
                }
                onChange={(e) => {

                  const updated =
                    [...sections];

                  updated[index] = {
                    ...section,
                    description:
                      e.target.value,
                  };

                  setSections(
                    updated
                  );

                }}
                className="
                  w-full
                  border
                  rounded-xl
                  p-4
                "
              />

            </div>

          )}

          <button
            onClick={() =>
              saveSection(
                section
              )
            }
            className="
              mt-4
              bg-primary
              text-white
              px-5
              py-2
              rounded-xl
            "
          >
            Save Section
          </button>

        </div>

      )
    )}

  </div>

</div>

<div className="mt-8 bg-white rounded-3xl p-8 shadow-sm">

  <h2 className="text-xl font-bold mb-6">
    Why Choose Us Benefits
  </h2>

  <div className="space-y-6">

    {benefits.map(
      (benefit, index) => (

        <div
          key={benefit.id}
          className="
            border
            rounded-2xl
            p-6
          "
        >

          <div className="grid md:grid-cols-2 gap-4">

            <div>

              <label className="block mb-2 font-medium">
                Title
              </label>

              <input
                value={benefit.title}
                onChange={(e) => {

                  const updated =
                    [...benefits];

                  updated[index] = {
                    ...benefit,
                    title:
                      e.target.value,
                  };

                  setBenefits(
                    updated
                  );

                }}
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
    Icon
  </label>

  <div className="flex items-center gap-4">

    <div
      className="
        w-14
        h-14
        rounded-2xl
        bg-soft
        flex
        items-center
        justify-center
        text-primary
        text-2xl
      "
    >
      {(() => {
        const Icon =
          iconMap[
            benefit.icon
          ];

        return Icon ? (
          <Icon />
        ) : null;
      })()}
    </div>

    <select
      value={benefit.icon}
      onChange={(e) => {

        const updated =
          [...benefits];

        updated[index] = {
          ...benefit,
          icon:
            e.target.value,
        };

        setBenefits(
          updated
        );

      }}
      className="
        flex-1
        h-12
        border
        rounded-xl
        px-4
      "
    >
      <option value="shield">
        Shield
      </option>

      <option value="wallet">
        Wallet
      </option>

      <option value="calendar">
        Calendar
      </option>

      <option value="headset">
        Headset
      </option>

    </select>

  </div>

</div>

<div>

  <label className="block mb-2 font-medium">
    Sort Order
  </label>

  <input
    type="number"
    value={
      benefit.sort_order || 0
    }
    onChange={(e) => {

      const updated =
        [...benefits];

      updated[index] = {
        ...benefit,
        sort_order:
          Number(
            e.target.value
          ),
      };

      setBenefits(
        updated
      );

    }}
    className="
      w-full
      h-12
      border
      rounded-xl
      px-4
    "
  />

</div>

<label className="flex items-center gap-3">

  <input
    type="checkbox"
    checked={
      benefit.is_active
    }
    onChange={(e) => {

      const updated =
        [...benefits];

      updated[index] = {
        ...benefit,
        is_active:
          e.target.checked,
      };

      setBenefits(
        updated
      );

    }}
  />

  Active

</label>

          </div>

          <div className="mt-4">

            <label className="block mb-2 font-medium">
              Description
            </label>

            <textarea
              rows="3"
              value={
                benefit.description
              }
              onChange={(e) => {

                const updated =
                  [...benefits];

                updated[index] = {
                  ...benefit,
                  description:
                    e.target.value,
                };

                setBenefits(
                  updated
                );

              }}
              className="
                w-full
                border
                rounded-xl
                p-4
              "
            />

          </div>

          <button
            onClick={() =>
              saveBenefit(
                benefit
              )
            }
            className="
              mt-4
              bg-primary
              text-white
              px-5
              py-2
              rounded-xl
            "
          >
            Save Benefit
          </button>

        </div>

      )
    )}

  </div>

</div>

    </AdminLayout>

  );

}

export default HomeContentPage;