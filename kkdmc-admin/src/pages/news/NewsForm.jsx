function NewsForm({
  form,
  setForm,
  categories,
  loading,
  previews,
  onImageChange,
  onRemoveImage,
  onSubmit,
  submitLabel = "Save",
}) {

  const slugify = (text) => {

    return text
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-");

  };

  const handleChange = (
    field,
    value
  ) => {

    if (field === "title") {

      setForm({

        ...form,

        title: value,

        slug: slugify(value),

      });

      return;

    }

    setForm({

      ...form,

      [field]: value,

    });

  };

  return (

    <div className="space-y-6">

      <div className="bg-white rounded-2xl shadow-sm p-8">

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

          {/* Title */}

          <div className="lg:col-span-2">

            <label className="block mb-2 font-semibold">
              Title
            </label>

            <input
              type="text"
              value={form.title}
              onChange={(e) =>
                handleChange(
                  "title",
                  e.target.value
                )
              }
              className="
                w-full
                border
                rounded-xl
                px-4
                py-3
              "
            />

          </div>

          {/* Slug */}

          <div className="lg:col-span-2">

            <label className="block mb-2 font-semibold">
              Slug
            </label>

            <input
              readOnly
              value={form.slug}
              className="
                w-full
                border
                rounded-xl
                px-4
                py-3
                bg-gray-100
              "
            />

          </div>

          {/* Category */}

          <div>

            <label className="block mb-2 font-semibold">
              Category
            </label>

            <select

              value={form.category_id}

              onChange={(e)=>

                handleChange(

                  "category_id",

                  e.target.value

                )

              }

              className="
                w-full
                border
                rounded-xl
                px-4
                py-3
              "

            >

              <option value="">
                Select Category
              </option>

              {

                categories.map(

                  (item)=>(

                    <option

                      key={item.id}

                      value={item.id}

                    >

                      {item.name}

                    </option>

                  )

                )

              }

            </select>

          </div>

          {/* Author */}

          <div>

            <label className="block mb-2 font-semibold">
              Author
            </label>

            <input

              value={form.author}

              onChange={(e)=>

                handleChange(

                  "author",

                  e.target.value

                )

              }

              className="
                w-full
                border
                rounded-xl
                px-4
                py-3
              "

            />

          </div>

          {/* Featured Image */}

          <div className="lg:col-span-2">

            <label className="block mb-2 font-semibold">
              Featured Image
            </label>

            <input
              type="file"
              accept="image/*"
              multiple
              onChange={onImageChange}
              className="
                w-full
                border
                rounded-xl
                px-4
                py-3
                file:mr-4
                file:px-4
                file:py-2
                file:border-0
                file:rounded-lg
                file:bg-primary
                file:text-white
                file:cursor-pointer
                cursor-pointer
              "
            />

            <p className="mt-2 text-sm text-gray-500">
              JPG, PNG, WEBP • Max 2 MB per image • Maximum 5 images
            </p>

          </div>

          {previews.length > 0 && (
            <div className="lg:col-span-2">

              <label className="block mb-3 font-semibold">
                Selected Images ({previews.length}/5)
              </label>

              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">

                {previews.map((image, index) => (

                  <div
                    key={index}
                    className="relative group"
                  >

                    <img
                      src={image.url}
                      alt={`Preview ${index + 1}`}
                      className="
                        h-36
                        w-full
                        rounded-xl
                        border
                        object-cover
                      "
                    />

                    <button
                      type="button"
                      onClick={() => onRemoveImage(index)}
                      className="
                        absolute
                        top-2
                        right-2
                        w-8
                        h-8
                        rounded-full
                        bg-red-500
                        text-white
                        opacity-0
                        group-hover:opacity-100
                        transition
                      "
                    >
                      ✕
                    </button>

                    <p className="mt-2 text-xs truncate">
                      {image.name}
                    </p>

                  </div>

                ))}

              </div>

            </div>
          )}

          {/* Publish */}

          <div>

            <label className="block mb-2 font-semibold">
              Publish Date
            </label>

            <input

              type="datetime-local"

              value={form.published_at}

              onChange={(e)=>

                handleChange(

                  "published_at",

                  e.target.value

                )

              }

              className="
                w-full
                border
                rounded-xl
                px-4
                py-3
              "

            />

          </div>

          {/* Checkbox */}

          <div className="flex items-center gap-8 mt-8">

            <label className="flex items-center gap-2">

              <input

                type="checkbox"

                checked={
                  form.is_featured
                }

                onChange={(e)=>

                  handleChange(

                    "is_featured",

                    e.target.checked

                  )

                }

              />

              Featured

            </label>

            <label className="flex items-center gap-2">

              <input

                type="checkbox"

                checked={
                  form.is_published
                }

                onChange={(e)=>

                  handleChange(

                    "is_published",

                    e.target.checked

                  )

                }

              />

              Published

            </label>

          </div>

          {/* Summary */}

          <div className="lg:col-span-2">

            <label className="block mb-2 font-semibold">
              Summary
            </label>

            <textarea

              rows="4"

              value={form.summary}

              onChange={(e)=>

                handleChange(

                  "summary",

                  e.target.value

                )

              }

              className="
                w-full
                border
                rounded-xl
                px-4
                py-3
              "

            />

          </div>

          {/* Content */}

          <div className="lg:col-span-2">

            <label className="block mb-2 font-semibold">
              Content
            </label>

            <textarea
  rows={16}
  value={form.content}
  onChange={(e) =>
    handleChange(
      "content",
      e.target.value
    )
  }
  className="
    w-full
    border
    rounded-xl
    px-4
    py-3
    resize-none
    focus:outline-none
    focus:ring-2
    focus:ring-primary/20
    focus:border-primary
  "
/>

          </div>

        </div>

      </div>

      <div className="flex justify-end gap-3">

        <button

          type="button"

          className="
            px-6
            py-3
            rounded-xl
            border
          "

        >

          Cancel

        </button>

        <button

          onClick={onSubmit}

          disabled={loading}

          className="
            px-6
            py-3
            rounded-xl
            bg-primary
            text-white
          "

        >

          {

            loading

              ? "Saving..."

              : submitLabel

          }

        </button>

      </div>

    </div>

  );

}

export default NewsForm;