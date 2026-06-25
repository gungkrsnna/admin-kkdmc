import axios from "axios";
import { supabase } from "../lib/supabase";

const API_URL =
  `${import.meta.env.VITE_API_URL}/api/faqs`;

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

export const getFaqs =
  async () => {

    const res =
      await axios.get(
        API_URL,
        await getHeaders()
      );

    return res.data;
  };

export const createFaq =
  async (payload) => {

    const res =
      await axios.post(
        API_URL,
        payload,
        await getHeaders()
      );

    return res.data;
  };

export const updateFaq =
  async (
    id,
    payload
  ) => {

    const res =
      await axios.put(
        `${API_URL}/${id}`,
        payload,
        await getHeaders()
      );

    return res.data;
  };

export const deleteFaq =
  async (id) => {

    const res =
      await axios.delete(
        `${API_URL}/${id}`,
        await getHeaders()
      );

    return res.data;
  };

export const getPublicFaqs =
  async () => {

    const res =
      await axios.get(
        `${API_URL}/public`
      );

    return res.data;
  };