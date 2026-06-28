import axios from "axios";
import { supabase } from "../lib/supabase";

const API_URL =
  `${import.meta.env.VITE_API_URL}/api/faq-categories`;

const getHeaders =
  async () => {

    const {
      data: { session },
    } =
      await supabase.auth.getSession();

    return {
      headers: {
        Authorization:
          `Bearer ${session.access_token}`,
      },
    };
  };

export const getFaqCategories =
  async () => {

    const res =
      await axios.get(
        API_URL,
        await getHeaders()
      );

    return res.data;
  };

export const createFaqCategory =
  async (data) => {
    const res =
      await axios.post(
        API_URL,
        data,
        await getHeaders()
      );

    return res.data;
  };

export const updateFaqCategory =
  async (id, data) => {
    const res =
      await axios.put(
        `${API_URL}/${id}`,
        data,
        await getHeaders()
      );

    return res.data;
  };

export const deleteFaqCategory =
  async (id) => {
    const res =
      await axios.delete(
        `${API_URL}/${id}`,
        await getHeaders()
      );

    return res.data;
  };