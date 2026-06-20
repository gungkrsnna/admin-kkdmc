import axios from "axios";

const API_URL =
  "https://kkdmc.gladiatoraruna.com/api/categories";

export const getCategories = async () => {
  const res = await axios.get(API_URL);
  return res.data;
};

export const createCategory = async (
  payload
) => {
  const response = await axios.post(
    API_URL,
    payload
  );

  return response.data;
};

export const updateCategory = async (
  id,
  payload
) => {
  const response = await axios.put(
    `${API_URL}/${id}`,
    payload
  );

  return response.data;
};

export const deleteCategory = async (
  id
) => {
  const response =
    await axios.delete(
      `${API_URL}/${id}`
    );

  return response.data;
};