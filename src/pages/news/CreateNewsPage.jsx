import {
  useEffect,
  useState,
} from "react";

import {
  useNavigate,
} from "react-router-dom";

import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";
import NewsForm from "./NewsForm";

import AdminLayout from "../../layouts/AdminLayout";

import {
  createNews,
  getNewsCategories,
} from "../../services/newsService";

function CreateNewsPage() {

  const navigate =
    useNavigate();

  const [loading,
    setLoading] =
    useState(false);

  const [categories,
    setCategories] =
    useState([]);

  const [form,
    setForm] =
    useState({

      title: "",

      slug: "",

      category_id: "",

      summary: "",

      content: "",

      featured_image: "",

      author: "",

      published_at:
        new Date()
          .toISOString()
          .slice(0,16),

      is_featured: false,

      is_published: true,

    });

  useEffect(() => {

    loadCategories();

  }, []);

  const loadCategories =
    async () => {

      try {

        const data =
          await getNewsCategories();

        setCategories(data);

      } catch (error) {

        console.error(error);

      }

    };

  const slugify =
    (text) => {

      return text
        .toLowerCase()
        .trim()
        .replace(/[^\w\s-]/g,"")
        .replace(/\s+/g,"-")
        .replace(/-+/g,"-");

    };

  const handleChange =
    (field,value) => {

      if(field==="title"){

        setForm({

          ...form,

          title:value,

          slug:slugify(value),

        });

        return;

      }

      setForm({

        ...form,

        [field]:value,

      });

    };

  const handleSubmit =
    async () => {

      try {

        setLoading(true);

        await createNews(form);

        navigate("/news");

      } catch (error) {

        console.error(error);

      } finally {

        setLoading(false);

      }

    };

  return (

    <AdminLayout>

        <div className="space-y-6">

        <div>

            <h1 className="text-3xl font-black">
            New Travel News
            </h1>

            <p className="text-gray-500">
            Create a new article.
            </p>

        </div>

        <NewsForm

            form={form}

            setForm={setForm}

            categories={categories}

            loading={loading}

            onSubmit={handleSubmit}

            submitLabel="Publish Article"

        />

        </div>

    </AdminLayout>

    );

}

export default CreateNewsPage;