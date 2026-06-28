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

import { toast } from "react-hot-toast";

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

  const [preview, setPreview] =
    useState(null);

  const [removeCurrentImage, setRemoveCurrentImage] =
    useState(false);

  const [form,
    setForm] =
    useState({

      title: "",

      slug: "",

      category_id: "",

      summary: "",

      content: "",

      featured_image: null,

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
            null,

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

        setPreview(
            article.featured_image
        );

      } catch (err) {

        console.error(err);

      } finally {

        setLoading(false);

      }

    };

  const MAX_FILE_SIZE =
    2 * 1024 * 1024;

  const ALLOWED_TYPES = [
    "image/jpeg",
    "image/png",
    "image/webp",
  ];

  const handleSubmit =
async () => {

    try{

        setSaving(true);

        const formData =
            new FormData();

        formData.append(
            "title",
            form.title
        );

        formData.append(
            "slug",
            form.slug
        );

        formData.append(
            "category_id",
            form.category_id
        );

        formData.append(
            "summary",
            form.summary
        );

        formData.append(
            "content",
            form.content
        );

        formData.append(
            "author",
            form.author
        );

        formData.append(
            "published_at",
            form.published_at
        );

        formData.append(
            "is_featured",
            form.is_featured
        );

        formData.append(
            "is_published",
            form.is_published
        );

        if(
            form.featured_image
        ){

            formData.append(
                "featured_image",
                form.featured_image
            );

        }

        formData.append(
          "remove_image",
          removeCurrentImage
        );

        await updateNews(
            id,
            formData
        );

        navigate("/news");

    }finally{

        setSaving(false);

    }

};

  

  const handleImageChange = (e) => {

    const file =
        e.target.files?.[0];

    if (!file) return;

    if (
        !ALLOWED_TYPES.includes(
            file.type
        )
    ) {
        toast.error(
            "Only JPG, PNG and WEBP images are allowed."
        );
        return;
    }

    if (
        file.size >
        MAX_FILE_SIZE
    ) {
        toast.error(
            "Maximum image size is 2 MB."
        );
        return;
    }

    setForm((prev)=>({

        ...prev,

        featured_image:file,

    }));

    setRemoveCurrentImage(false);

    setPreview(
        URL.createObjectURL(file)
    );

};

const removeImage = () => {

  setPreview(null);

  setRemoveCurrentImage(true);

  setForm((prev) => ({
    ...prev,
    featured_image: null,
  }));

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

        preview={preview}

        onImageChange={
            handleImageChange
        }

        onRemoveImage={
            removeImage
        }

        onSubmit={handleSubmit}

        submitLabel="Update Article"

    />

    </AdminLayout>

  );

}

export default EditNewsPage;