import AdminLayout from "../../layouts/AdminLayout";
import {
  useEffect,
  useState,
} from "react";
import toast from "react-hot-toast";

function AboutContentPage() {
    const [hero, setHero] =
    useState(null);

    const [heroImage, setHeroImage] =
    useState(null);

    const [story, setStory] =
    useState(null);

    const [storyImage, setStoryImage] =
    useState(null);

    const [whyChooseUs, setWhyChooseUs] =
  useState(null);

  const [clients, setClients] =
  useState([]);

const [clientImage, setClientImage] =
  useState({});

  const [
  statistics,
  setStatistics
] = useState([]);


    useEffect(() => {

        loadHero();
        loadStory();
        loadWhyChooseUs();
        loadStatistics();
        loadClients();

    }, []);

    const loadHero =
    async () => {

        try {

        const response =
            await fetch(
            "https://kkdmc.gladiatoraruna.com/api/home-sections/about_hero"
            );

        const data =
            await response.json();

        setHero(data);

        } catch (error) {

        console.error(error);

        }

    };

    const loadClients =
  async () => {

    try {

      const response =
        await fetch(
          "https://kkdmc.gladiatoraruna.com/api/home-sections/about-clients"
        );

      const data =
        await response.json();

      setClients(data);

    } catch (error) {

      console.error(error);

    }

  };

    const loadStatistics =
  async () => {

    try {

      const response =
        await fetch(
          "https://kkdmc.gladiatoraruna.com/api/about/statistics"
        );

      const data =
        await response.json();

      setStatistics(data);

    } catch (error) {

      console.error(error);

    }

  };

    const loadStory =
  async () => {

    try {

      const response =
        await fetch(
          "https://kkdmc.gladiatoraruna.com/api/home-sections/about_story"
        );

      const data =
        await response.json();

      setStory(data);

    } catch (error) {

      console.error(error);

    }

  };

  const loadWhyChooseUs =
  async () => {

    try {

      const response =
        await fetch(
          "https://kkdmc.gladiatoraruna.com/api/home-sections/about_why_choose_us"
        );

      const data =
        await response.json();

      setWhyChooseUs(data);

    } catch (error) {

      console.error(error);

    }

  };

  const addClient =
  () => {

    setClients([
      ...clients,
      {
        id:
          `temp-${Date.now()}`,
        name: "",
        description: "",
        image_url: "",
        sort_order:
          clients.length + 1,
        is_active: true,
      },
    ]);

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
            "https://kkdmc.gladiatoraruna.com/api/upload/tour-package",
            {
              method: "POST",
              body: formData,
            }
          );

        const uploadData =
        await uploadResponse.json();

        imageUrl =
        uploadData.url;

      }

      await fetch(
        "https://kkdmc.gladiatoraruna.com/api/home-sections/about_hero",
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

  const saveStory =
  async () => {

    try {

      let imageUrl =
        story.image_url;

      if (storyImage) {

        const formData =
          new FormData();

        formData.append(
          "image",
          storyImage
        );

        const uploadResponse =
          await fetch(
            "https://kkdmc.gladiatoraruna.com/api/upload/tour-package",
            {
              method: "POST",
              body: formData,
            }
          );

        const uploadData =
        await uploadResponse.json();

        imageUrl =
        uploadData.url;

      }

      await fetch(
        "https://kkdmc.gladiatoraruna.com/api/home-sections/about_story",
        {
          method: "PUT",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify({
            badge:
              story.badge,

            title:
              story.title,

            description:
              story.description,

            content:
              story.content,

            image_url:
              imageUrl,
          }),
        }
      );

      setStory({
        ...story,
        image_url:
          imageUrl,
      });

      toast.success(
        "Story updated successfully"
      );

    } catch (error) {

      console.error(error);

      toast.error(
        "Failed to update story"
      );

    }

  };

  const saveWhyChooseUs =
  async () => {

    try {

      await fetch(
        "https://kkdmc.gladiatoraruna.com/api/home-sections/about_why_choose_us",
        {
          method: "PUT",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify({
            badge:
              whyChooseUs.badge,

            title:
              whyChooseUs.title,

            description:
              whyChooseUs.description,
          }),
        }
      );

      toast.success(
        "Why Choose Us updated"
      );

    } catch (error) {

      console.error(error);

      toast.error(
        "Failed to update section"
      );

    }

  };

  const saveStatistic =
  async (item) => {

    try {

      await fetch(
        `https://kkdmc.gladiatoraruna.com/api/home-sections/about-statistics/${item.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify({
            title:
              item.title,

            value:
              item.value,

            sort_order:
              item.sort_order,

            is_active:
              item.is_active,
          }),
        }
      );

      toast.success(
        "Statistic updated"
      );

    } catch (error) {

      console.error(error);

      toast.error(
        "Failed to update statistic"
      );

    }

  };


  const saveClient =
  async (client) => {

    try {

      let imageUrl =
        client.image_url;

      const imageFile =
        clientImage[
          client.id
        ];

      if (imageFile) {

        const formData =
          new FormData();

        formData.append(
          "image",
          imageFile
        );

        const uploadResponse =
          await fetch(
            "https://kkdmc.gladiatoraruna.com/api/upload/tour-package",
            {
              method: "POST",
              body: formData,
            }
          );

        const uploadData =
        await uploadResponse.json();

        imageUrl =
        uploadData.url;

      }

      const isNew =
        String(
          client.id
        ).startsWith(
          "temp-"
        );

      const url =
        isNew
          ? "https://kkdmc.gladiatoraruna.com/api/home-sections/about-clients"
          : `https://kkdmc.gladiatoraruna.com/api/home-sections/about-clients/${client.id}`;

      const method =
        isNew
          ? "POST"
          : "PUT";

      await fetch(
        url,
        {
          method,
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify({
            ...client,
            image_url:
              imageUrl,
          }),
        }
      );

      toast.success(
        "Client saved"
      );

      loadClients();

    } catch (error) {

      console.error(error);

      toast.error(
        "Failed to save client"
      );

    }

  };

  const deleteClient =
  async (id) => {

    try {

      await fetch(
        `https://kkdmc.gladiatoraruna.com/api/home-sections/about-clients/${id}`,
        {
          method:
            "DELETE",
        }
      );

      toast.success(
        "Client deleted"
      );

      loadClients();

    } catch (error) {

      toast.error(
        "Failed to delete"
      );

    }

  };

  return (
    <AdminLayout>
      <div className="p-8">
        <h1 className="text-3xl font-black">
          About Content
        </h1>

<div className="mt-6 bg-white rounded-3xl p-8 shadow-sm">

  <h2 className="text-xl font-bold mb-6">
    About Hero
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
          h-60
          object-cover
          rounded-2xl
        "
      />

    )}

    <button
      onClick={saveHero}
      className="
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

</div>

        <div className="mt-8 bg-white rounded-3xl p-8 shadow-sm">

  <h2 className="text-xl font-bold mb-6">
    Our Story
  </h2>

  <div className="space-y-5">

    <div>

      <label className="block mb-2 font-medium">
        Badge
      </label>

      <input
        value={
          story?.badge || ""
        }
        onChange={(e) =>
          setStory({
            ...story,
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
          story?.title || ""
        }
        onChange={(e) =>
          setStory({
            ...story,
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
        rows="4"
        value={
          story?.description || ""
        }
        onChange={(e) =>
          setStory({
            ...story,
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
        Content
      </label>

      <textarea
        rows="8"
        value={
          story?.content || ""
        }
        onChange={(e) =>
          setStory({
            ...story,
            content:
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
        Story Image
      </label>

      <input
        type="file"
        accept="image/*"
        onChange={(e) =>
          setStoryImage(
            e.target.files[0]
          )
        }
      />

    </div>

    {story?.image_url && (

      <img
        src={
          storyImage
            ? URL.createObjectURL(
                storyImage
              )
            : story.image_url
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

    <button
      onClick={saveStory}
      className="
        bg-primary
        text-white
        px-6
        py-3
        rounded-xl
        font-semibold
      "
    >
      Save Story
    </button>

  </div>

</div>


<div className="mt-8 bg-white rounded-3xl p-8 shadow-sm">

  <h2 className="text-xl font-bold mb-6">
    Why Choose Us
  </h2>

  <div className="space-y-5">

    <div>

      <label className="block mb-2 font-medium">
        Badge
      </label>

      <input
        value={
          whyChooseUs?.badge || ""
        }
        onChange={(e) =>
          setWhyChooseUs({
            ...whyChooseUs,
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
          whyChooseUs?.title || ""
        }
        onChange={(e) =>
          setWhyChooseUs({
            ...whyChooseUs,
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
          whyChooseUs?.description || ""
        }
        onChange={(e) =>
          setWhyChooseUs({
            ...whyChooseUs,
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

    <button
      onClick={saveWhyChooseUs}
      className="
        bg-primary
        text-white
        px-6
        py-3
        rounded-xl
        font-semibold
      "
    >
      Save Why Choose Us
    </button>

  </div>

</div>

<div className="mt-8 bg-white rounded-3xl p-8 shadow-sm">

  <h2 className="text-xl font-bold mb-6">
    Statistics
  </h2>

  <div className="space-y-5">

    {statistics.map(
      (item, index) => (

        <div
          key={item.id}
          className="
            border
            rounded-2xl
            p-5
          "
        >

          <div className="grid md:grid-cols-2 gap-4">

            <div>

              <label className="block mb-2 font-medium">
                Title
              </label>

              <input
                value={
                  item.title
                }
                onChange={(e) => {

                  const updated =
                    [...statistics];

                  updated[index] = {
                    ...item,
                    title:
                      e.target.value,
                  };

                  setStatistics(
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
                Value
              </label>

              <input
                value={
                  item.value
                }
                onChange={(e) => {

                  const updated =
                    [...statistics];

                  updated[index] = {
                    ...item,
                    value:
                      e.target.value,
                  };

                  setStatistics(
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

          <button
            onClick={() =>
              saveStatistic(
                item
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
            Save Statistic
          </button>

        </div>

      )
    )}

  </div>

</div>


<div className="mt-8 bg-white rounded-3xl p-8 shadow-sm">

  <div className="flex items-center justify-between mb-6">

    <h2 className="text-xl font-bold">
      Clients
    </h2>

    <button
      onClick={addClient}
      className="
        bg-primary
        text-white
        px-5
        py-3
        rounded-xl
        font-semibold
      "
    >
      Add Client
    </button>

  </div>

  <div className="space-y-6">

    {clients.map(
      (client, index) => (

        <div
          key={client.id}
          className="
            border
            rounded-2xl
            p-6
          "
        >

          <div className="grid md:grid-cols-2 gap-5">

            <div>

              <label className="block mb-2 font-medium">
                Client Name
              </label>

              <input
                value={
                  client.name || ""
                }
                onChange={(e) => {

                  const updated =
                    [...clients];

                  updated[index] = {
                    ...client,
                    name:
                      e.target.value,
                  };

                  setClients(
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
                Sort Order
              </label>

              <input
                type="number"
                value={
                  client.sort_order || 0
                }
                onChange={(e) => {

                  const updated =
                    [...clients];

                  updated[index] = {
                    ...client,
                    sort_order:
                      Number(
                        e.target.value
                      ),
                  };

                  setClients(
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

          <div className="mt-5">

            <label className="block mb-2 font-medium">
              Description
            </label>

            <textarea
              rows="4"
              value={
                client.description || ""
              }
              onChange={(e) => {

                const updated =
                  [...clients];

                updated[index] = {
                  ...client,
                  description:
                    e.target.value,
                };

                setClients(
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

          <div className="mt-5">

            <label className="block mb-2 font-medium">
              Client Image
            </label>

            <input
              type="file"
              accept="image/*"
              onChange={(e) =>
                setClientImage({
                  ...clientImage,
                  [client.id]:
                    e.target.files[0],
                })
              }
            />

          </div>

          {(clientImage[
            client.id
          ] ||
            client.image_url) && (

            <img
              src={
                clientImage[
                  client.id
                ]
                  ? URL.createObjectURL(
                      clientImage[
                        client.id
                      ]
                    )
                  : client.image_url
              }
              alt=""
              className="
                mt-4
                w-full
                h-52
                object-cover
                rounded-2xl
              "
            />

          )}

          <div className="mt-5">

            <label className="flex items-center gap-3">

              <input
                type="checkbox"
                checked={
                  client.is_active
                }
                onChange={(e) => {

                  const updated =
                    [...clients];

                  updated[index] = {
                    ...client,
                    is_active:
                      e.target.checked,
                  };

                  setClients(
                    updated
                  );

                }}
              />

              Active

            </label>

          </div>

          <div className="flex gap-3 mt-6">

            <button
              onClick={() =>
                saveClient(
                  client
                )
              }
              className="
                bg-primary
                text-white
                px-5
                py-2
                rounded-xl
              "
            >
              Save
            </button>

            {!String(
              client.id
            ).startsWith(
              "temp-"
            ) && (

              <button
                onClick={() =>
                  deleteClient(
                    client.id
                  )
                }
                className="
                  bg-red-500
                  text-white
                  px-5
                  py-2
                  rounded-xl
                "
              >
                Delete
              </button>

            )}

          </div>

        </div>

      )
    )}

  </div>

</div>


      </div>
    </AdminLayout>
  );
}

export default AboutContentPage;