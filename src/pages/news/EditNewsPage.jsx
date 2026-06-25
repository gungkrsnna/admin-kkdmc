import {
  useEffect,
  useState,
} from "react";

import {
  useNavigate,
  useParams,
} from "react-router-dom";

import AdminLayout from "../../layouts/AdminLayout";

import NewsForm from "./NewsForm";

import {
  getNewsById,
  updateNews,
  getNewsCategories,
} from "../../services/newsService";

function EditNewsPage() {

  const { id } =
    useParams();

  const navigate =
    useNavigate();

  const [loading,
    setLoading] =
    useState(true);

  const [saving,
    setSaving] =
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

      published_at: "",

      is_featured: false,

      is_published: true,

    });

  useEffect(() => {

    loadData();

  }, []);

  const loadData =
    async () => {

      try {

        const [
          article,
          categoryData,
        ] =
          await Promise.all([

            getNewsById(id),

            getNewsCategories(),

          ]);

        setCategories(
          categoryData
        );

        setForm({

          title:
            article.title,

          slug:
            article.slug,

          category_id:
            article.category_id,

          summary:
            article.summary || "",

          content:
            article.content || "",

          featured_image:
            article.featured_image || "",

          author:
            article.author || "",

          published_at:
            article.published_at?.slice(
              0,
              16
            ),

          is_featured:
            article.is_featured,

          is_published:
            article.is_published,

        });

      } catch (err) {

        console.error(err);

      } finally {

        setLoading(false);

      }

    };

  const handleSubmit =
    async () => {

      try {

        setSaving(true);

        await updateNews(
          id,
          form
        );

        navigate("/news");

      } catch (err) {

        console.error(err);

      } finally {

        setSaving(false);

      }

    };

  if (loading) {

    return (

      <AdminLayout>

        <div className="p-10">
          Loading...
        </div>

      </AdminLayout>

    );

  }

  return (

    <AdminLayout>

      <NewsForm

        form={form}

        setForm={setForm}

        categories={categories}

        loading={saving}

        onSubmit={handleSubmit}

        submitLabel="Update Article"

      />

    </AdminLayout>

  );

}

export default EditNewsPage;