import {
  useEffect,
  useState,
} from "react";

import {
  Search,
  Plus,
  Pencil,
  Trash2,
} from "lucide-react";

import {
  useNavigate,
} from "react-router-dom";

import { toast } from "react-hot-toast";

import AdminLayout from "../../layouts/AdminLayout";

import {
  getNews,
  deleteNews,
} from "../../services/newsService";

function NewsPage() {
  const [deleteModal, setDeleteModal] = useState(false);

  const [selectedArticle, setSelectedArticle] =
    useState(null);

  const [deleting, setDeleting] =
    useState(false);

  const navigate =
    useNavigate();

  const [articles, setArticles] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [search, setSearch] =
    useState("");

  useEffect(() => {

    loadNews();

  }, []);

  const loadNews =
    async () => {

      try {

        setLoading(true);

        const data =
          await getNews();

        setArticles(data);

      } catch (error) {

        console.error(error);

      } finally {

        setLoading(false);

      }

    };

  const filteredArticles = articles.filter((item) =>
    item.title.toLowerCase().includes(search.toLowerCase())
  );

  const handleDelete = async (id) => {

  const confirmed = window.confirm(
    "Delete this article?"
  );

  if (!confirmed) return;

  try {

    await deleteNews(id);

    toast.success("Article deleted.");

    loadNews();

  } catch (error) {

    console.error(error);

    toast.error("Failed to delete article.");

  }

};

const confirmDelete = async () => {

  if (!selectedArticle) return;

  try {

    setDeleting(true);

    await deleteNews(
      selectedArticle.id
    );

    toast.success(
      "Article deleted successfully."
    );

    setDeleteModal(false);

    setSelectedArticle(null);

    loadNews();

  } catch (error) {

    console.error(error);

    toast.error(
      "Failed to delete article."
    );

  } finally {

    setDeleting(false);

  }

};

  return (

    <AdminLayout>

      <div className="flex justify-between items-center">

  <div>

    <h1 className="text-3xl font-black">
      Travel News
    </h1>

    <p className="text-gray-500">
      Manage articles and travel updates.
    </p>

  </div>

  <button
    onClick={() =>
      navigate("/news/create")
    }
    className="
      flex
      items-center
      gap-2
      px-5
      py-3
      rounded-xl
      bg-primary
      text-white
    "
  >

    <Plus size={18} />

    New Article

  </button>

</div>

<div
  className="
    mt-8
    bg-white
    rounded-2xl
    p-5
    shadow-sm
  "
>

  <div
    className="
      flex
      items-center
      border
      rounded-xl
      px-4
      h-14
      focus-within:border-primary
      focus-within:ring-4
      focus-within:ring-primary/10
    "
  >

    <Search
      size={20}
      className="text-gray-400"
    />

    <input
      value={search}
      onChange={(e)=>
        setSearch(
          e.target.value
        )
      }
      placeholder="Search article..."
      className="
        flex-1
        px-3
        outline-none
      "
    />

  </div>

</div>

<div className="mt-6 bg-white rounded-2xl shadow-sm overflow-hidden">

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
          Category
        </th>

        <th className="px-6 py-4 text-left">
          Author
        </th>

        <th className="px-6 py-4 text-center">
          Action
        </th>

      </tr>

    </thead>

    <tbody>

      {loading ? (

        <tr>

          <td
            colSpan={5}
            className="py-10 text-center"
          >
            Loading...
          </td>

        </tr>

      ) : filteredArticles.length === 0 ? (

        <tr>

          <td
            colSpan={5}
            className="py-10 text-center text-gray-500"
          >
            No articles found.
          </td>

        </tr>

      ) : (

        filteredArticles.map((item) => (

          <tr
            key={item.id}
            className="border-t"
          >

            <td className="px-6 py-4">

              {item.featured_image ? (

                <img
                  src={item.featured_image}
                  alt={item.title}
                  className="
                    w-24
                    h-16
                    object-cover
                    rounded-lg
                    border
                  "
                  onError={(e) => {
                    e.target.style.display = "none";
                  }}
                />

              ) : (

                <div
                  className="
                    w-24
                    h-16
                    rounded-lg
                    bg-gray-100
                    flex
                    items-center
                    justify-center
                    text-xs
                    text-gray-400
                  "
                >
                  No Image
                </div>

              )}

            </td>

            <td className="px-6 py-4 font-semibold">

              {item.title}

            </td>

            <td className="px-6 py-4">

              {item.news_categories?.name}

            </td>

            <td className="px-6 py-4">

              {item.author}

            </td>

            <td className="px-6 py-4">

              <div className="flex justify-center gap-2">

                <button
                  onClick={() =>
                    navigate(`/news/edit/${item.id}`)
                  }
                  className="p-2 rounded-lg border hover:bg-gray-50"
                >
                  <Pencil size={18} />
                </button>

                <button
                  onClick={() => {
                    setSelectedArticle(item);
                    setDeleteModal(true);
                  }}
                  className="
                    p-2
                    rounded-lg
                    border
                    text-red-500
                    hover:bg-red-50
                  "
                >
                  <Trash2 size={18} />
                </button>

              </div>

            </td>

          </tr>

        ))

      )}

    </tbody>

  </table>

</div>


{
  deleteModal && (

    <div
      className="
        fixed
        inset-0
        bg-black/50
        z-50
        flex
        items-center
        justify-center
        p-4
      "
    >

      <div
        className="
          w-full
          max-w-md
          rounded-2xl
          bg-white
          p-6
          shadow-xl
        "
      >

        <h2
          className="
            text-xl
            font-bold
          "
        >
          Delete Article
        </h2>

        <p
          className="
            mt-3
            text-gray-600
          "
        >
          Are you sure you want to delete

          <span className="font-semibold">
            {" "}
            {selectedArticle?.title}
          </span>

          ?

        </p>

        <p
          className="
            mt-2
            text-sm
            text-red-500
          "
        >
          This action cannot be undone.
        </p>

        <div
          className="
            mt-8
            flex
            justify-end
            gap-3
          "
        >

          <button

            onClick={() => {

              setDeleteModal(false);

              setSelectedArticle(null);

            }}

            className="
              px-5
              py-2.5
              rounded-xl
              border
            "

          >

            Cancel

          </button>

          <button

            onClick={confirmDelete}

            disabled={deleting}

            className="
              px-5
              py-2.5
              rounded-xl
              bg-red-600
              text-white
              hover:bg-red-700
              disabled:opacity-50
            "

          >

            {

              deleting

                ? "Deleting..."

                : "Delete Article"

            }

          </button>

        </div>

      </div>

    </div>

  )
}


    </AdminLayout>

  );

}

export default NewsPage;