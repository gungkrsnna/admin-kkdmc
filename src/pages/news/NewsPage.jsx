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

import AdminLayout from "../../layouts/AdminLayout";

import {
  getNews,
  deleteNews,
} from "../../services/newsService";

function NewsPage() {

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



    </AdminLayout>

  );

}

export default NewsPage;