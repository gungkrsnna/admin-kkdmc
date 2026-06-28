import axios from "axios";

const API_URL =
  "https://kkdmc.gladiatoraruna.com/api/tour-packages";

export const getHighlights =
  async (packageId) => {

    const res =
      await axios.get(
        `https://kkdmc.gladiatoraruna.com/api/package-highlights/package/${packageId}`
      );

    return res.data;
  };

export const createHighlight =
  async (
    packageId,
    payload
  ) => {

    const res =
      await axios.post(
        `https://kkdmc.gladiatoraruna.com/api/package-highlights/package/${packageId}`,
        payload
      );

    return res.data;
  };

export const updateHighlight =
  async (
    id,
    payload
  ) => {

    const res =
      await axios.put(
        `https://kkdmc.gladiatoraruna.com/api/package-highlights/${id}`,
        payload
      );

    return res.data;
  };

export const deleteHighlight =
  async (id) => {

    const res =
      await axios.delete(
        `https://kkdmc.gladiatoraruna.com/api/package-highlights/${id}`
      );

    return res.data;
  };