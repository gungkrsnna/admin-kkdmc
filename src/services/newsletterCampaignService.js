import axios from "axios";
import { supabase } from "../lib/supabase";

const API_URL =
  `${import.meta.env.VITE_API_URL}/api/newsletter-campaigns`;

const getHeaders = async () => {
  const {
    data: { session },
  } = await supabase.auth.getSession();

  return {
    headers: {
      Authorization: `Bearer ${session.access_token}`,
    },
  };
};

export const getCampaigns =
  async () => {

    const res =
      await axios.get(
        API_URL,
        await getHeaders()
      );

    return res.data;
  };

export const getCampaignById =
  async (id) => {

    const res =
      await axios.get(
        `${API_URL}/${id}`,
        await getHeaders()
      );

    return res.data;
  };

export const createCampaign =
  async (payload) => {

    const res =
      await axios.post(
        API_URL,
        payload,
        await getHeaders()
      );

    return res.data;
  };

export const updateCampaign =
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

export const deleteCampaign =
  async (id) => {

    const res =
      await axios.delete(
        `${API_URL}/${id}`,
        await getHeaders()
      );

    return res.data;
  };

export const sendCampaign =
  async (id) => {

    const res =
      await axios.post(
        `${API_URL}/${id}/send`,
        {},
        await getHeaders()
      );

    return res.data;
  };