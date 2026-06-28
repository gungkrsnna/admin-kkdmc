import axios from "axios";

const API_URL =
  `${import.meta.env.VITE_API_URL}/api/news`;

export const getNews =
  async () => {

    const res =
      await axios.get(
        API_URL
      );

    return res.data;

};

export const getNewsById =
  async (id) => {

    const res =
      await axios.get(
        `${API_URL}/${id}`
      );

    return res.data;

};

export const createNews = async (payload) => {

  const res = await axios.post(
    API_URL,
    payload,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return res.data;

};

export const updateNews = async (
  id,
  payload
) => {

  const res = await axios.put(
    `${API_URL}/${id}`,
    payload,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return res.data;

};

export const deleteNews =
  async (id) => {

    const res =
      await axios.delete(
        `${API_URL}/${id}`
      );

    return res.data;

};

export const getPublicNews =
  async () => {

    const res =
      await axios.get(
        `${API_URL}/public`
      );

    return res.data;

};

export const getNewsCategories =
  async () => {

    const res =
      await axios.get(
        `${API_URL}/categories`
      );

    return res.data;

  };