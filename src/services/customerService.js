import axios from "axios";
import { supabase } from "../lib/supabase";

const API_URL =
  "https://kkdmc.gladiatoraruna.com/api/customers";

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

export const getCustomers =
  async () => {

    const res =
      await axios.get(
        API_URL,
        await getHeaders()
      );

    return res.data;
  };

export const getCustomerById =
  async (id) => {

    const res =
      await axios.get(
        `${API_URL}/${id}`,
        await getHeaders()
      );

    return res.data;
  };