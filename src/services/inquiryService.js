import axios from "axios";

import { supabase }
from "../lib/supabase";

const API_URL =
  "https://kkdmc.gladiatoraruna.com/api/inquiries";

const getHeaders =
async () => {

  const {
    data: { session },
  } =
    await supabase.auth
      .getSession();

  return {
    headers: {
      Authorization:
        `Bearer ${session.access_token}`,
    },
  };
};

export const getInquiries =
async () => {

  const res =
    await axios.get(
      API_URL,
      await getHeaders()
    );

  return res.data;
};

export const getInquiryById =
async (id) => {

  const res =
    await axios.get(
      `${API_URL}/${id}`,
      await getHeaders()
    );

  return res.data;
};

export const updateInquiry =
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