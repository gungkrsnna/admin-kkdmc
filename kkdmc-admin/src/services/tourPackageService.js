import axios from "axios";

const API_URL =
  "https://kkdmc.gladiatoraruna.com/api/tour-packages";

export const getTourPackages =
  async () => {
    const res =
      await axios.get(API_URL);

    return res.data;
  };

export const getCategories = async () => {
  const res = await axios.get(
    "https://kkdmc.gladiatoraruna.com/api/categories"
  );

  return res.data;
};

export const createTourPackage =
  async (payload) => {
    const res =
      await axios.post(
        API_URL,
        payload
      );

    return res.data;
  };

export const updateTourPackage =
  async (id, payload) => {
    const res =
      await axios.put(
        `${API_URL}/${id}`,
        payload
      );

    return res.data;
  };


export const getTourPackageById =
  async (id) => {
    const res =
      await axios.get(
        `${API_URL}/${id}`
      );

    return res.data;
  };

// export const deleteTourPackage =
//   async (id) => {
//     const res =
//       await axios.delete(
//         `${API_URL}/${id}`
//       );

//     return res.data;
//   };

export const deleteTourPackage =
  async (id) => {

    const res =
      await axios.delete(
        `${API_URL}/${id}`
      );

    return res.data;

  };

export const uploadTourPackageImage =
  async (file) => {

    const formData =
      new FormData();

    formData.append(
      "image",
      file
    );

    const res =
      await axios.post(
        "https://kkdmc.gladiatoraruna.com/api/upload/tour-package",
        formData
      );

    return res.data;
  };

export const getPackageOptions =
  async (packageId) => {

    const res =
      await axios.get(
        `${API_URL}/${packageId}/options`
      );

    return res.data;
  };

export const createPackageOption =
  async (
    packageId,
    payload
  ) => {

    const res =
      await axios.post(
        `${API_URL}/${packageId}/options`,
        payload
      );

    return res.data;
  };

export const updatePackageOption =
  async (
    id,
    payload
  ) => {

    const res =
      await axios.put(
        `https://kkdmc.gladiatoraruna.com/api/package-options/${id}`,
        payload
      );

    return res.data;
  };

export const deletePackageOption =
  async (id) => {

    const res =
      await axios.delete(
        `https://kkdmc.gladiatoraruna.com/api/package-options/${id}`
      );

    return res.data;
  };