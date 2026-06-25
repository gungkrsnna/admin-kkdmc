import axios from "axios";
import { supabase } from "../lib/supabase";

const API_URL =
  "https://kkdmc.gladiatoraruna.com/api/newsletter";

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

export const getSubscribers =
  async () => {

    const res =
      await axios.get(
        API_URL,
        await getHeaders()
      );

    return res.data;
  };

export const getSubscriberById =
  async (id) => {

    const res =
      await axios.get(
        `${API_URL}/${id}`,
        await getHeaders()
      );

    return res.data;
  };

export const updateSubscriberStatus =
  async (
    id,
    is_active
  ) => {

    const res =
      await axios.patch(
        `${API_URL}/${id}/status`,
        {
          is_active,
        },
        await getHeaders()
      );

    return res.data;
  };

export const deleteSubscriber =
  async (id) => {

    const res =
      await axios.delete(
        `${API_URL}/${id}`,
        await getHeaders()
      );

    return res.data;
  };

export const exportSubscribers =
  async () => {

    const res =
      await axios.get(
        `${API_URL}/export`,
        await getHeaders()
      );

    return res.data;
  };