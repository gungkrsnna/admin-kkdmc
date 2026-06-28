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

  const [previews, setPreviews] = useState([]);

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
    featured_images: [],
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

      form.featured_images.forEach((image) => {
        formData.append("featured_images", image);
      });

      await createNews(formData);

      navigate("/news");
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const MAX_FILE_SIZE = 2 * 1024 * 1024;

  const ALLOWED_TYPES = [
    "image/jpeg",
    "image/jpg",
    "image/png",
    "image/webp",
  ];

  const MAX_IMAGES = 5;

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);

    if (!files.length) return;

    const currentImages = form.featured_images;

    if (currentImages.length + files.length > MAX_IMAGES) {
      toast.error(`Maximum ${MAX_IMAGES} images.`);
      return;
    }

    const validFiles = [];

    for (const file of files) {
      if (!ALLOWED_TYPES.includes(file.type)) {
        toast.error(`${file.name} is not a supported image.`);
        continue;
      }

      if (file.size > MAX_FILE_SIZE) {
        toast.error(`${file.name} exceeds 2 MB.`);
        continue;
      }

      validFiles.push(file);
    }

    if (!validFiles.length) return;

    setForm((prev) => ({
      ...prev,
      featured_images: [
        ...prev.featured_images,
        ...validFiles,
      ],
    }));

    setPreviews((prev) => [
      ...prev,
      ...validFiles.map((file) => ({
        url: URL.createObjectURL(file),
        name: file.name,
      })),
    ]);

    e.target.value = "";
  };

  const removeImage = (index) => {
    URL.revokeObjectURL(previews[index].url);

    setForm((prev) => ({
      ...prev,
      featured_images: prev.featured_images.filter(
        (_, i) => i !== index
      ),
    }));

    setPreviews((prev) =>
      prev.filter((_, i) => i !== index)
    );
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
          previews={previews}
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