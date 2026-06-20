import {
  useEffect,
  useState,
} from "react";

import {
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";

import AdminLayout from "../../layouts/AdminLayout";

import {
  getCategories,
} from "../../services/categoryService";

import {
  createTourPackage,
  updateTourPackage,
  getTourPackageById,
  uploadTourPackageImage,
} from "../../services/tourPackageService";

import {
  getPackageOptions,
  createPackageOption,
  updatePackageOption,
  deletePackageOption,
} from "../../services/tourPackageService";

import {
  getHighlights,
  createHighlight,
  updateHighlight,
  deleteHighlight,
} from "../../services/packageHighlightService";

import {
  getInclusions,
  createInclusion,
  updateInclusion,
  deleteInclusion,
} from "../../services/packageInclusionService";

import {
  getTerms,
  saveTerms,
} from "../../services/packageTermsService";

import toast
from "react-hot-toast";

function TourPackageFormPage() {
  const navigate = useNavigate();

  const [currentStep, setCurrentStep] =
  useState(1);

  const { id } = useParams();

  const isEdit = !!id;

  const [loading, setLoading] =
    useState(false);

  const [categories, setCategories] =
    useState([]);

    const [searchParams] =
    useSearchParams();

    const [uploading,
  setUploading] =
  useState(false);

  const [options, setOptions] =
  useState([]);

  const [highlights,
  setHighlights] =
  useState([]);

const [inclusions,
  setInclusions] =
  useState([]);

  const [openDeleteOptionModal,
  setOpenDeleteOptionModal] =
  useState(false);

const [selectedOption,
  setSelectedOption] =
  useState(null);

const [optionLoading,
  setOptionLoading] =
  useState(false);

const [termsContent,
  setTermsContent] =
  useState("");

  const steps = [
    "Package Info",
    "Pricing",
    "Highlights",
    "Inclusions",
    "Terms",
  ];

  const [form, setForm] = useState({
    category_id: "",
    title: "",
    short_description: "",
    description: "",
    location: "",
    duration: "",
    featured_badge: "",
    image_url: "",
    minimum_pax: "",
    maximum_pax: "",
    is_active: true,
  });

  const loadOptions =
  async () => {

    try {

      const data =
        await getPackageOptions(
          id
        );

        setOptions(
          data.map(item => ({
            ...item,
            isEditing: false,
          }))
        );

    } catch (error) {
      console.error(error);
    }
  };

  const editOption = (index) => {

    const updated = [...options];
  
    updated[index].isEditing = true;
  
    setOptions(updated);
  
  };

  const loadCategories =
    async () => {
      try {
        const data =
          await getCategories();

        setCategories(data);
      } catch (error) {
        console.error(error);
      }
    };

    const loadHighlights =
  async () => {

    try {

      const data =
        await getHighlights(id);

        setHighlights(
          data.map(item => ({
            ...item,
            isEditing: false,
          }))
        );

    } catch (error) {

      console.error(error);

    }

  };

  const editHighlight =
  (index) => {

    const updated =
      [...highlights];

    updated[index].isEditing =
      true;

    setHighlights(updated);

  };

  const loadTerms =
async () => {

  try {

    const data =
      await getTerms(id);

    setTermsContent(
      data?.content || ""
    );

  } catch (error) {

    console.error(error);

  }

};

  const loadPackage =
    async () => {
      try {
        const data =
          await getTourPackageById(
            id
          );

        setForm({
          category_id:
            data.category_id || "",

          title:
            data.title || "",

          short_description:
            data.short_description ||
            "",

          description:
            data.description || "",

          location:
            data.location || "",

          duration:
            data.duration || "",

          featured_badge:
            data.featured_badge ||
            "",

          image_url:
            data.image_url || "",

          minimum_pax:
            data.minimum_pax || "",

          maximum_pax:
            data.maximum_pax || "",

          is_active:
            data.is_active,
        });

      } catch (error) {
        console.error(error);
      }
    };

    const addOption = () => {

      setOptions([
        ...options,
        {
          id: null,
          name: "",
          price: "",
          is_default: false,
          is_active: true,
          isEditing: true,
        },
      ]);
    
    };

useEffect(() => {

  loadCategories();

  if (isEdit) {

  loadPackage();

  loadOptions();

  loadHighlights();

  loadInclusions();

  loadTerms();

}

}, []);

useEffect(() => {

  const step =
    Number(
      searchParams.get("step")
    );

  if (step) {
    setCurrentStep(step);
  }

}, [searchParams]);

  const handleChange = (
    field,
    value
  ) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleCreateAndContinue =
    async () => {

      try {

        const toastId =
          toast.loading(
            "Creating package..."
          );

        const result =
          await createTourPackage(
            form
          );

        toast.success(
          "Package created",
          {
            id: toastId,
          }
        );

        navigate(
          `/tour-packages/edit/${result.id}?step=2`
        );

      } catch (error) {

        console.error(error);

        toast.error(
          error?.response?.data
            ?.message ||
          "Failed create package"
        );

      }

  };

  const handleSubmit =
    async (e) => {

      console.log(
        "FORM SUBMITTED",
        currentStep
      );

      e.preventDefault();

      try {
        setLoading(true);

        const toastId = toast.loading(
            isEdit
                ? "Updating package..."
                : "Creating package..."
            );

            if (isEdit) {

            await updateTourPackage(
                id,
                form
            );

            toast.success(
                "Package updated successfully",
                {
                id: toastId,
                }
            );

            } else {

            await createTourPackage(
                form
            );

            toast.success(
                "Package created successfully",
                {
                id: toastId,
                }
            );

            }

            navigate("/tour-packages");

      } catch (error) {
        console.error(error);

        toast.error(
        error?.response?.data?.message ||
        "Failed to save package"
        );
      } finally {
        setLoading(false);
      }
    };

    const handleImageUpload =
        async (e) => {

            const file =
            e.target.files[0];

            if (!file) return;

            try {

            setUploading(true);

            const result =
                await uploadTourPackageImage(
                file
                );

            setForm({
                ...form,
                image_url:
                result.url,
            });

            } catch (error) {
            console.error(error);
            } finally {
            setUploading(false);
            }
        };

    const updateOptionField = (
  index,
  field,
  value
) => {

  const updated =
    [...options];

  updated[index][field] =
    value;

  setOptions(updated);

};

const setDefaultOption =
  (index) => {

    const updated =
      options.map(
        (item, i) => ({
          ...item,
          is_default:
            i === index,
        })
      );

    setOptions(updated);

};

const saveOption = async (option) => {
  try {

    if (!option.name) {
      return toast.error(
        "Option name required"
      );
    }

    if (!option.price) {
      return toast.error(
        "Price required"
      );
    }

    const toastId = toast.loading(
      option.id
        ? "Updating option..."
        : "Creating option..."
    );

    if (option.id) {

      await updatePackageOption(
        option.id,
        option
      );

      toast.success(
        "Package option updated",
        {
          id: toastId,
        }
      );

    } else {

      await createPackageOption(
        id,
        option
      );

      toast.success(
        "Package option created",
        {
          id: toastId,
        }
      );
    }

    await loadOptions();

  } catch (error) {

    console.error(error);

    toast.error(
      error?.response?.data?.message ||
      "Failed to save option"
    );

  }
};

const loadInclusions =
async () => {

  try {

    const data =
      await getInclusions(id);

      setInclusions(
        data.map(item => ({
          ...item,
          isEditing: false,
        }))
      );

  } catch (error) {

    console.error(error);

  }

};

const editInclusion =
(index) => {

  const updated =
    [...inclusions];

  updated[index].isEditing =
    true;

  setInclusions(updated);

};

const handleSaveTerms =
async () => {

  try {

    const toastId =
      toast.loading(
        "Saving terms..."
      );

    await saveTerms(
      id,
      termsContent
    );

    toast.success(
      "Terms saved",
      {
        id: toastId,
      }
    );

  } catch (error) {

    toast.error(
      error?.response?.data
        ?.message ||
      "Failed to save terms"
    );

  }

};

  const removeOption =
  async (option) => {

    if (!option.id) {

      setOptions(
        options.filter(
          (o) => o !== option
        )
      );

      return;
    }

    const confirmDelete =
      window.confirm(
        `Delete ${option.name}?`
      );

    if (!confirmDelete)
      return;

    const toastId = toast.loading(
    "Deleting option..."
    );

    await deletePackageOption(
    option.id
    );

    toast.success(
    "Package option deleted",
    {
        id: toastId,
    }
    );

    loadOptions();

    loadOptions();

  };

  const confirmDeleteOption =
  async () => {

    try {

      const toastId =
        toast.loading(
          "Deleting option..."
        );

      await deletePackageOption(
        selectedOption.id
      );

      toast.success(
        "Package option deleted",
        {
          id: toastId,
        }
      );

      setOpenDeleteOptionModal(false);
      setSelectedOption(null);

      loadOptions();

    } catch (error) {

      toast.error(
        error?.response?.data
          ?.message ||
        "Failed to delete option"
      );

    }

  };

  const addHighlight = () => {

    setHighlights([
      ...highlights,
      {
        id: null,
        title: "",
        isEditing: true,
      },
    ]);
  
  };

const updateHighlightField =
  (
    index,
    value
  ) => {

    const updated =
      [...highlights];

    updated[index].title =
      value;

    setHighlights(updated);

  };

  const saveHighlight =
  async (highlight) => {

    try {

      if (
        !highlight.title
      ) {
        return toast.error(
          "Highlight required"
        );
      }

      const toastId =
        toast.loading(
          "Saving highlight..."
        );

      if (highlight.id) {

        await updateHighlight(
          highlight.id,
          highlight
        );

      } else {

        await createHighlight(
          id,
          highlight
        );

      }

      toast.success(
        "Highlight saved",
        {
          id: toastId,
        }
      );

      loadHighlights();

    } catch (error) {

      toast.error(
        error?.response?.data
          ?.message ||
        "Failed to save highlight"
      );

    }

  };

  const removeHighlight =
  async (highlight) => {

    if (!highlight.id) {

      setHighlights(
        highlights.filter(
          (h) =>
            h !== highlight
        )
      );

      return;
    }

    await deleteHighlight(
      highlight.id
    );

    toast.success(
      "Highlight deleted"
    );

    loadHighlights();

  };

  const addInclusion = () => {

    setInclusions([
      ...inclusions,
      {
        id: null,
        title: "",
        isEditing: true,
      },
    ]);
  
  };

const updateInclusionField =
(index, value) => {

  const updated =
    [...inclusions];

  updated[index].title =
    value;

  setInclusions(updated);

};

const saveInclusion =
async (inclusion) => {

  try {

    if (!inclusion.title) {

      return toast.error(
        "Inclusion required"
      );

    }

    const toastId =
      toast.loading(
        "Saving inclusion..."
      );

    if (inclusion.id) {

      await updateInclusion(
        inclusion.id,
        inclusion
      );

    } else {

      await createInclusion(
        id,
        inclusion
      );

    }

    toast.success(
      "Inclusion saved",
      {
        id: toastId,
      }
    );

    loadInclusions();

  } catch (error) {

    toast.error(
      error?.response?.data
        ?.message ||
      "Failed to save inclusion"
    );

  }

};

const removeInclusion =
async (inclusion) => {

  if (!inclusion.id) {

    setInclusions(
      inclusions.filter(
        (i) =>
          i !== inclusion
      )
    );

    return;

  }

  await deleteInclusion(
    inclusion.id
  );

  toast.success(
    "Inclusion deleted"
  );

  loadInclusions();

};

  return (
    <AdminLayout>
      <div className="max-w-5xl mx-auto">

        <div className="mb-8">
          <h1 className="text-3xl font-black">
            {isEdit
              ? "Edit Tour Package"
              : "Create Tour Package"}
          </h1>

          <p className="text-gray-500 mt-2">
            Manage package information
          </p>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm mb-6">

          <div className="flex items-center justify-between">

            {steps.map((step, index) => {

              const stepNumber = index + 1;

              return (

                <div
                  key={step}
                  className="flex flex-col items-center flex-1"
                >

                  <div
                    className={`
                      w-10 h-10 rounded-full
                      flex items-center justify-center
                      font-bold
                      ${
                        currentStep >= stepNumber
                          ? "bg-[#14213D] text-white"
                          : "bg-gray-200 text-gray-500"
                      }
                    `}
                  >
                    {stepNumber}
                  </div>

                  <span className="text-xs mt-2 text-center">
                    {step}
                  </span>

                </div>

              );

            })}

          </div>

        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-6"
        >

          {/* BASIC INFO */}
          {currentStep === 1 && (
            <>
              <div className="bg-white rounded-2xl shadow-sm p-6">

                <h2 className="font-bold text-lg mb-6">
                  Basic Information
                </h2>

                <div className="grid md:grid-cols-2 gap-5">

                  <div>
                    <label className="block mb-2 font-medium">
                      Category
                    </label>

                    <select
                      value={
                        form.category_id
                      }
                      onChange={(e) =>
                        handleChange(
                          "category_id",
                          e.target.value
                        )
                      }
                      className="
                        w-full
                        h-12
                        px-4
                        border
                        rounded-xl
                      "
                    >
                      <option value="">
                        Select Category
                      </option>

                      {categories.map(
                        (item) => (
                          <option
                            key={item.id}
                            value={item.id}
                          >
                            {item.title}
                          </option>
                        )
                      )}
                    </select>
                  </div>

                  <div>
                    <label className="block mb-2 font-medium">
                      Duration
                    </label>

                    <input
                      value={
                        form.duration
                      }
                      onChange={(e) =>
                        handleChange(
                          "duration",
                          e.target.value
                        )
                      }
                      placeholder="8 Hours"
                      className="
                        w-full
                        h-12
                        px-4
                        border
                        rounded-xl
                      "
                    />
                  </div>

                </div>

                <div className="mt-5">

                  <label className="block mb-2 font-medium">
                    Package Title
                  </label>

                  <input
                    value={form.title}
                    onChange={(e) =>
                      handleChange(
                        "title",
                        e.target.value
                      )
                    }
                    placeholder="Ubud ATV Adventure"
                    className="
                      w-full
                      h-12
                      px-4
                      border
                      rounded-xl
                    "
                  />

                </div>

                <div className="mt-5">

                  <label className="block mb-2 font-medium">
                    Location
                  </label>

                  <input
                    value={
                      form.location
                    }
                    onChange={(e) =>
                      handleChange(
                        "location",
                        e.target.value
                      )
                    }
                    placeholder="Ubud"
                    className="
                      w-full
                      h-12
                      px-4
                      border
                      rounded-xl
                    "
                  />

                </div>

                </div>

                {/* DESCRIPTION */}

                <div className="bg-white rounded-2xl shadow-sm p-6">

                <h2 className="font-bold text-lg mb-6">
                  Description
                </h2>

                <div className="space-y-5">

                  <div>
                    <label className="block mb-2 font-medium">
                      Short Description
                    </label>

                    <textarea
                      rows="3"
                      value={
                        form.short_description
                      }
                      onChange={(e) =>
                        handleChange(
                          "short_description",
                          e.target.value
                        )
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
                      Full Description
                    </label>

                    <textarea
                      rows="8"
                      value={
                        form.description
                      }
                      onChange={(e) =>
                        handleChange(
                          "description",
                          e.target.value
                        )
                      }
                      className="
                        w-full
                        border
                        rounded-xl
                        p-4
                      "
                    />
                  </div>

                </div>

                </div>  

                {/* PACKAGE INFO */}

                  <div className="bg-white rounded-2xl shadow-sm p-6">


                  <h2 className="font-bold text-lg mb-6">
                    Package Settings
                  </h2>

                  <div className="grid md:grid-cols-3 gap-5">

                    <div>
                      <label className="block mb-2 font-medium">
                        Minimum Pax
                      </label>

                      <input
                        type="number"
                        value={
                          form.minimum_pax
                        }
                        onChange={(e) =>
                          handleChange(
                            "minimum_pax",
                            e.target.value
                          )
                        }
                        className="
                          w-full
                          h-12
                          px-4
                          border
                          rounded-xl
                        "
                      />
                    </div>

                    <div>
                      <label className="block mb-2 font-medium">
                        Maximum Pax
                      </label>

                      <input
                        type="number"
                        value={
                          form.maximum_pax
                        }
                        onChange={(e) =>
                          handleChange(
                            "maximum_pax",
                            e.target.value
                          )
                        }
                        className="
                          w-full
                          h-12
                          px-4
                          border
                          rounded-xl
                        "
                      />
                    </div>

                    <div>
                      <label className="block mb-2 font-medium">
                        Badge
                      </label>

                      <input
                        value={
                          form.featured_badge
                        }
                        onChange={(e) =>
                          handleChange(
                            "featured_badge",
                            e.target.value
                          )
                        }
                        placeholder="Best Seller"
                        className="
                          w-full
                          h-12
                          px-4
                          border
                          rounded-xl
                        "
                      />
                    </div>

                  </div>

                  <div className="mt-5">

                    <label className="block mb-2 font-medium">
                      Cover Image URL
                    </label>

                    <input
                      type="file"
                      accept="image/*"
                      onChange={
                        handleImageUpload
                      }
                    />

                    {form.image_url && (
                      <div className="mt-4">
                        <img
                          src={form.image_url}
                          alt="Preview"
                          className="
                            h-64
                            w-full
                            object-cover
                            rounded-2xl
                            border
                          "
                        />

                        <p className="text-xs text-gray-500 mt-2">
                          Cover image preview
                        </p>
                      </div>
                    )}

                  </div>

                  <div className="mt-5">

                    <label className="flex items-center gap-3">

                      <input
                        type="checkbox"
                        checked={
                          form.is_active
                        }
                        onChange={(e) =>
                          handleChange(
                            "is_active",
                            e.target.checked
                          )
                        }
                      />

                      Active Package

                    </label>

                  </div>
                </div>
            </>
          )}

          {currentStep === 2 && (
            <div>
              <div className="bg-white rounded-2xl shadow-sm p-6">

                <div className="flex justify-between items-center mb-6">

                  <h2 className="font-bold text-lg">
                    Package Options
                  </h2>

                  <button
                    type="button"
                    onClick={addOption}
                    className="
                      px-4
                      py-2
                      bg-[#14213D]
                      text-white
                      rounded-xl
                    "
                  >
                    Add Option
                  </button>

                </div>


                <div className="space-y-4">

                {options.map((option, index) => (

                  option.isEditing ? (

                      <div
                        key={
                          option.id ||
                          index
                        }
                        className="
                          border
                          rounded-2xl
                          p-5
                        "
                      >

                        <div className="grid md:grid-cols-2 gap-4">

                          <input
                            placeholder="Option Name"
                            value={
                              option.name
                            }
                            onChange={(e) =>
                              updateOptionField(
                                index,
                                "name",
                                e.target.value
                              )
                            }
                            className="
                              h-12
                              border
                              rounded-xl
                              px-4
                            "
                          />

                          <input
                            type="number"
                            placeholder="Price"
                            value={
                              option.price
                            }
                            onChange={(e) =>
                              updateOptionField(
                                index,
                                "price",
                                e.target.value
                              )
                            }
                            className="
                              h-12
                              border
                              rounded-xl
                              px-4
                            "
                          />

                        </div>

                        <div className="flex justify-between mt-4">

                          <label className="flex items-center gap-2">

                            <input
                              type="checkbox"
                              checked={
                                option.is_default
                              }
                              onChange={() =>
                                setDefaultOption(
                                  index
                                )
                              }
                            />

                            Default Package

                          </label>

                          <div className="flex gap-2">

                            <button
                              type="button"
                              onClick={() =>
                                saveOption(
                                  option
                                )
                              }
                              className="
                                px-4
                                py-2
                                bg-green-600
                                text-white
                                rounded-xl
                              "
                            >
                              Save
                            </button>

                            <button
                              type="button"
                              onClick={() => {

                                if (!option.id) {
                              
                                  setOptions(
                                    options.filter(
                                      (o) => o !== option
                                    )
                                  );
                              
                                  return;
                              
                                }
                              
                                setSelectedOption(option);
                                setOpenDeleteOptionModal(true);
                              
                              }}
                              className="
                                px-4
                                py-2
                                bg-red-600
                                text-white
                                rounded-xl
                              "
                            >
                              Delete
                            </button>

                          </div>

                        </div>

                      </div>

                  ) : (

                    // CARD VIEW

                    <div
                      className="
                        border
                        rounded-2xl
                        p-5
                        flex
                        justify-between
                        items-center
                      "
                    >

                      <div>

                        <h3 className="font-semibold text-lg">
                          {option.name}
                        </h3>

                        <p className="text-[#14213D] font-bold">
                          Rp {Number(option.price)
                            .toLocaleString("id-ID")}
                        </p>

                        {option.is_default && (
                          <span
                            className="
                              text-xs
                              bg-green-100
                              text-green-700
                              px-2
                              py-1
                              rounded-full
                            "
                          >
                            Default Package
                          </span>
                        )}

                      </div>

                      <div className="flex gap-2">

                        <button
                          type="button"
                          onClick={() =>
                            editOption(index)
                          }
                          className="
                            px-3
                            py-2
                            border
                            rounded-lg
                          "
                        >
                          Edit
                        </button>

                        <button
                          type="button"
                          onClick={() => {
                            setSelectedOption(option);
                            setOpenDeleteOptionModal(true);
                          }}
                          className="
                            px-3
                            py-2
                            bg-red-600
                            text-white
                            rounded-lg
                          "
                        >
                          Delete
                        </button>

                      </div>

                    </div>

                  )

                  ))}

                </div>

                </div>  
            </div>
          )}

          {currentStep === 3 && (
            <div className="bg-white rounded-2xl shadow-sm p-6">

              <div className="flex justify-between items-center mb-6">
          
                <h2 className="font-bold text-lg">
                  Package Highlights
                </h2>
          
                <button
                  type="button"
                  onClick={addHighlight}
                  className="
                    px-4
                    py-2
                    bg-[#14213D]
                    text-white
                    rounded-xl
                  "
                >
                  Add Highlight
                </button>
          
              </div>
          
              <div className="space-y-4">
          
              {highlights.map(
                (highlight, index) => (

                  highlight.isEditing ? (
          
                    <div
                      key={
                        highlight.id ||
                        index
                      }
                      className="
                        border
                        rounded-2xl
                        p-4
                        flex
                        gap-3
                      "
                    >
          
                      <input
                        value={
                          highlight.title
                        }
                        onChange={(e) =>
                          updateHighlightField(
                            index,
                            e.target.value
                          )
                        }
                        placeholder="Professional Tour Guide"
                        className="
                          flex-1
                          h-12
                          border
                          rounded-xl
                          px-4
                        "
                      />
          
                      <button
                        type="button"
                        onClick={() =>
                          saveHighlight(
                            highlight
                          )
                        }
                        className="
                          px-4
                          bg-green-600
                          text-white
                          rounded-xl
                        "
                      >
                        Save
                      </button>
          
                      <button
                        type="button"
                        onClick={() =>
                          removeHighlight(
                            highlight
                          )
                        }
                        className="
                          px-4
                          bg-red-600
                          text-white
                          rounded-xl
                        "
                      >
                        Delete
                      </button>
          
                    </div>
          
                  ) : (

                    <div
                      className="
                        border
                        rounded-2xl
                        p-4
                        flex
                        justify-between
                        items-center
                      "
                    >

                      <div className="flex items-center gap-3">

                        <div
                          className="
                            w-8
                            h-8
                            rounded-full
                            bg-green-100
                            text-green-700
                            flex
                            items-center
                            justify-center
                          "
                        >
                          ✓
                        </div>

                        <span className="font-medium">
                          {highlight.title}
                        </span>

                      </div>

                      <div className="flex gap-2">

                      <button
                        type="button"
                        onClick={() =>
                          editHighlight(index)
                        }
                        className="
                          px-3
                          py-2
                          border
                          rounded-lg
                        "
                      >
                        Edit
                      </button>

                      <button
                        type="button"
                        onClick={() =>
                          removeHighlight(
                            highlight
                          )
                        }
                        className="
                          px-3
                          py-2
                          bg-red-600
                          text-white
                          rounded-lg
                        "
                      >
                        Delete
                      </button>

                      </div>

                    </div>
              
                  )
              
              ))}
          
              </div>
          
            </div>
          
          )}

          {currentStep === 4 && (
            <div className="bg-white rounded-2xl shadow-sm p-6">

              <div className="flex justify-between items-center mb-6">
            
                <h2 className="font-bold text-lg">
                  Package Inclusions
                </h2>
            
                <button
                  type="button"
                  onClick={addInclusion}
                  className="
                    px-4
                    py-2
                    bg-[#14213D]
                    text-white
                    rounded-xl
                  "
                >
                  Add Inclusion
                </button>
            
              </div>
            
              <div className="space-y-4">
            
              {inclusions.map(
  (
                inclusion,
                index
              ) => (

                inclusion.isEditing ? (
            
                    <div
                      key={
                        inclusion.id ||
                        index
                      }
                      className="
                        border
                        rounded-2xl
                        p-4
                        flex
                        gap-3
                      "
                    >
            
                      <input
                        value={
                          inclusion.title
                        }
                        onChange={(e) =>
                          updateInclusionField(
                            index,
                            e.target.value
                          )
                        }
                        placeholder="Lunch Included"
                        className="
                          flex-1
                          h-12
                          border
                          rounded-xl
                          px-4
                        "
                      />
            
                      <button
                        type="button"
                        onClick={() =>
                          saveInclusion(
                            inclusion
                          )
                        }
                        className="
                          px-4
                          bg-green-600
                          text-white
                          rounded-xl
                        "
                      >
                        Save
                      </button>
            
                      <button
                        type="button"
                        onClick={() =>
                          removeInclusion(
                            inclusion
                          )
                        }
                        className="
                          px-4
                          bg-red-600
                          text-white
                          rounded-xl
                        "
                      >
                        Delete
                      </button>
            
                    </div>
            
                    ) : (

                      // CARD
                      <div
                        className="
                          border
                          rounded-2xl
                          p-4
                          flex
                          justify-between
                          items-center
                        "
                      >

                        <div className="flex items-center gap-3">

                          <div
                            className="
                              w-8
                              h-8
                              rounded-full
                              bg-green-100
                              text-green-700
                              flex
                              items-center
                              justify-center
                            "
                          >
                            ✓
                          </div>

                          <span className="font-medium">
                            {inclusion.title}
                          </span>

                        </div>

                        <div className="flex gap-2">

                          <button
                            type="button"
                            onClick={() =>
                              editInclusion(index)
                            }
                            className="
                              px-3
                              py-2
                              border
                              rounded-lg
                            "
                          >
                            Edit
                          </button>

                          <button
                            type="button"
                            onClick={() =>
                              removeInclusion(
                                inclusion
                              )
                            }
                            className="
                              px-3
                              py-2
                              bg-red-600
                              text-white
                              rounded-lg
                            "
                          >
                            Delete
                          </button>

                        </div>

                      </div>
                
                    )
                
                ))}
            
              </div>
            
            </div>
          )}

          {currentStep === 5 && (
            <div className="bg-white rounded-2xl shadow-sm p-6">

            <h2 className="font-bold text-lg mb-6">
              Terms & Conditions
            </h2>
          
            <textarea
              rows="8"
              value={termsContent}
              onChange={(e) =>
                setTermsContent(
                  e.target.value
                )
              }
              placeholder="
                Children under 5 years old are free.
                
                Cancellation less than 24 hours is non-refundable.
                
                Minimum booking 2 persons.
                "
                    className="
                      w-full
                      border
                      rounded-xl
                      p-4
                    "
                  />
                
                  <div className="mt-4 flex justify-end">
                
                    <button
                      type="button"
                      onClick={handleSaveTerms}
                      className="
                        px-5
                        py-3
                        bg-[#14213D]
                        text-white
                        rounded-xl
                      "
                    >
                      Save Terms
                    </button>
                
                  </div>
                
                </div>
          )}

          {/* ACTIONS */}

          <div className="flex justify-between">

            <button
              type="button"
              disabled={currentStep === 1}
              onClick={() =>
                setCurrentStep(currentStep - 1)
              }
              className="
                px-5
                py-3
                border
                rounded-xl
              "
            >
              Back
            </button>

            <div className="flex gap-3">

              {currentStep === 1 && !isEdit ? (

                <button
                  type="button"
                  onClick={
                    handleCreateAndContinue
                  }
                  className="
                    px-5
                    py-3
                    bg-[#14213D]
                    text-white
                    rounded-xl
                  "
                >
                  Create Package & Continue
                </button>

              ) : currentStep < 5 ? (

                <button
                  type="button"
                  onClick={() =>
                    setCurrentStep(
                      currentStep + 1
                    )
                  }
                  className="
                    px-5
                    py-3
                    bg-[#14213D]
                    text-white
                    rounded-xl
                  "
                >
                  Next Step
                </button>

              ) : (

                <button
                  type="button"
                  className="
                    px-5
                    py-3
                    bg-green-600
                    text-white
                    rounded-xl
                  "
                  onClick={handleSaveTerms}
                >
                  Save Package
                </button>

              )}

            </div>

          </div>

        </form>

      </div>

      {openDeleteOptionModal && (
  <div
    className="
      fixed
      inset-0
      bg-black/40
      backdrop-blur-sm
      flex
      items-center
      justify-center
      z-50
    "
  >
    <div
      className="
        bg-white
        rounded-3xl
        w-full
        max-w-md
        p-6
      "
    >

      <h3
        className="
          text-xl
          font-bold
          mb-3
        "
      >
        Delete Package Option
      </h3>

      <p className="text-gray-500">
        Are you sure you want to delete
        <strong>
          {" "}
          {selectedOption?.name}
        </strong>
        ?
      </p>

      <div
        className="
          flex
          justify-end
          gap-3
          mt-6
        "
      >

        <button
          type="button"
          onClick={() => {
            setOpenDeleteOptionModal(false);
            setSelectedOption(null);
          }}
          className="
            px-4
            py-2
            border
            rounded-xl
          "
        >
          Cancel
        </button>

        <button
          type="button"
          onClick={
            confirmDeleteOption
          }
          className="
            px-4
            py-2
            bg-red-600
            text-white
            rounded-xl
          "
        >
          Delete
        </button>

      </div>

    </div>
  </div>
)}
    </AdminLayout>
  );
}

export default TourPackageFormPage;