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

import { toast } from "react-hot-toast";

function CreateNewsPage() {

  const [preview, setPreview] = useState(null);

  const navigate =
    useNavigate();

  const [loading,
    setLoading] =
    useState(false);

  const [categories,
    setCategories] =
    useState([]);

  const [form, setForm] = useState({
    title: "",
    slug: "",
    category_id: "",
    summary: "",
    content: "",
    featured_image: null,
    author: "",
    published_at: new Date().toISOString().slice(0, 16),
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

  const handleSubmit = async () => {
    try {
      setLoading(true);

      const formData = new FormData();

      formData.append("title", form.title);
      formData.append("slug", form.slug);
      formData.append("category_id", form.category_id);
      formData.append("summary", form.summary);
      formData.append("content", form.content);
      formData.append("author", form.author);
      formData.append("published_at", form.published_at);
      formData.append("is_featured", form.is_featured);
      formData.append("is_published", form.is_published);

      if (form.featured_image) {
        formData.append("featured_image", form.featured_image);
      }

      await createNews(formData);

      navigate("/news");
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2 MB

  const ALLOWED_TYPES = [
    "image/jpeg",
    "image/jpg",
    "image/png",
    "image/webp",
  ];

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    // Validasi tipe file
    if (!ALLOWED_TYPES.includes(file.type)) {
      toast.error("Only JPG, PNG, and WEBP images are allowed.");
      e.target.value = "";
      return;
    }

    // Validasi ukuran file
    if (file.size > MAX_FILE_SIZE) {
      toast.error("Image size must not exceed 2 MB.");
      e.target.value = "";
      return;
    }

    setForm((prev) => ({
      ...prev,
      featured_image: file,
    }));

    setPreview(URL.createObjectURL(file));
  };

  const removeImage = () => {
    setPreview(null);

    setForm((prev) => ({
      ...prev,
      featured_image: null,
    }));
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
          preview={preview}
          onImageChange={handleImageChange}
          onRemoveImage={removeImage}
          onSubmit={handleSubmit}
          submitLabel="Publish Article"
        />

        </div>

    </AdminLayout>

    );

}

export default CreateNewsPage;