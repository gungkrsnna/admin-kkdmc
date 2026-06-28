import axios from "axios";

const API_URL =
  "https://kkdmc.gladiatoraruna.com/api/promotions";

export const getPromotions =
  async () => {
    const res =
      await axios.get(API_URL);

    return res.data;
  };

export const getPromotionById =
  async (id) => {
    const res =
      await axios.get(
        `${API_URL}/${id}`
      );

    return res.data;
  };

export const createPromotion =
  async (payload) => {
    const res =
      await axios.post(
        API_URL,
        payload
      );

    return res.data;
  };

export const updatePromotion =
  async (id, payload) => {
    const res =
      await axios.put(
        `${API_URL}/${id}`,
        payload
      );

    return res.data;
  };

export const deletePromotion =
  async (id) => {
    const res =
      await axios.delete(
        `${API_URL}/${id}`
      );

    return res.data;
  };