import axios from "axios";
import { supabase } from "../lib/supabase";

const API_URL =
  "https://kkdmc.gladiatoraruna.com/api/social-media";

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

export const getSocialMedia =
  async () => {

    const res =
      await axios.get(
        API_URL,
        await getHeaders()
      );

    return res.data;
  };

export const getSocialMediaById =
  async (id) => {

    const res =
      await axios.get(
        `${API_URL}/${id}`,
        await getHeaders()
      );

    return res.data;
  };

export const createSocialMedia =
  async (payload) => {

    const res =
      await axios.post(
        API_URL,
        payload,
        await getHeaders()
      );

    return res.data;
  };

export const updateSocialMedia =
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

export const deleteSocialMedia =
  async (id) => {

    const res =
      await axios.delete(
        `${API_URL}/${id}`,
        await getHeaders()
      );

    return res.data;
  };