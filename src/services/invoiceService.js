import axios from "axios";
import { supabase } from "../lib/supabase";

const API_URL =
  "https://kkdmc.gladiatoraruna.com/api/invoices";

export const downloadInvoicePdf = async (id) => {
  const headers =
    await getHeaders();

  const response =
    await axios.get(
      `${API_URL}/${id}/pdf`,
      {
        ...headers,
        responseType: "blob",
      }
    );

  const blob = new Blob(
    [response.data],
    {
      type: "application/pdf",
    }
  );

  const url =
    window.URL.createObjectURL(blob);

  const link =
    document.createElement("a");

  link.href = url;
  link.download = `invoice-${id}.pdf`;

  document.body.appendChild(link);
  link.click();
  link.remove();

  window.URL.revokeObjectURL(url);
};

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

export const getInvoices =
  async () => {

    const res =
      await axios.get(
        API_URL,
        await getHeaders()
      );

    return res.data;
  };

export const getInvoiceById =
  async (id) => {

    const res =
      await axios.get(
        `${API_URL}/${id}`,
        await getHeaders()
      );

    return res.data;
  };

export const createInvoice =
  async (payload) => {

    const res =
      await axios.post(
        API_URL,
        payload,
        await getHeaders()
      );

    return res.data;
  };

export const updateInvoice =
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

export const deleteInvoice =
  async (id) => {

    const res =
      await axios.delete(
        `${API_URL}/${id}`,
        await getHeaders()
      );

    return res.data;
  };

export const addInvoiceItem =
  async (
    invoiceId,
    payload
  ) => {

    const res =
      await axios.post(
        `${API_URL}/${invoiceId}/items`,
        payload,
        await getHeaders()
      );

    return res.data;
  };

export const deleteInvoiceItem =
  async (itemId) => {

    const res =
      await axios.delete(
        `${API_URL}/items/${itemId}`,
        await getHeaders()
      );

    return res.data;
  };

export const updateInvoiceItem =
  async (
    itemId,
    payload
  ) => {

    const res =
      await axios.put(
        `${API_URL}/items/${itemId}`,
        payload,
        await getHeaders()
      );

    return res.data;
  };

export const viewInvoicePdf = async (id) => {
  const headers =
    await getHeaders();

  const response =
    await axios.get(
      `${API_URL}/${id}/pdf`,
      {
        ...headers,
        responseType: "blob",
      }
    );

  const blob = new Blob(
    [response.data],
    {
      type: "application/pdf",
    }
  );

  const url =
    URL.createObjectURL(blob);

  window.open(
    url,
    "_blank"
  );
};