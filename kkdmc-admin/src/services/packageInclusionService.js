import axios from "axios";

const API_URL =
  "https://kkdmc.gladiatoraruna.com/api/package-inclusions";

export const getInclusions =
  async (packageId) => {

    const res =
      await axios.get(
        `${API_URL}/package/${packageId}`
      );

    return res.data;
  };

export const createInclusion =
  async (
    packageId,
    payload
  ) => {

    const res =
      await axios.post(
        `${API_URL}/package/${packageId}`,
        payload
      );

    return res.data;
  };

export const updateInclusion =
  async (
    id,
    payload
  ) => {

    const res =
      await axios.put(
        `${API_URL}/${id}`,
        payload
      );

    return res.data;
  };

export const deleteInclusion =
  async (id) => {

    const res =
      await axios.delete(
        `${API_URL}/${id}`
      );

    return res.data;
  };