import axios from "axios";

const API_URL =
  "https://kkdmc.gladiatoraruna.com/api/tour-bookings";

export const getAllBookings =
  async () => {
    const res =
      await axios.get(
        `${API_URL}/admin/all`
      );

    return res.data;
};

export const getBookingById =
  async (id) => {
    const res =
      await axios.get(
        `${API_URL}/${id}`
      );

    return res.data;
};

export const updateBooking =
  async (id, payload) => {
    const res =
      await axios.put(
        `${API_URL}/${id}`,
        payload
      );

    return res.data;
};

export const updateBookingStatus =
  async (id, status) => {

    const res =
      await axios.put(
        `${API_URL}/admin/${id}/status`,
        { status }
      );

    return res.data;
};

export const updatePaymentStatus =
  async (
    id,
    payment_status
  ) => {

    const res =
      await axios.put(
        `${API_URL}/admin/${id}/payment-status`,
        {
          payment_status
        }
      );

    return res.data;
};

export const updateAdminNotes =
  async (
    id,
    admin_notes
  ) => {

    const res =
      await axios.put(
        `${API_URL}/admin/${id}/notes`,
        {
          admin_notes,
        }
      );

    return res.data;
};

export const createManualBooking =
  async (payload) => {

    const res =
      await axios.post(
        `${API_URL}/admin/manual`,
        payload
      );

    return res.data;
};

export const exportBookings =
  async () => {

    const response =
      await axios.get(
        `${API_URL}/admin/export`,
        {
          responseType: "blob",
        }
      );

    return response.data;

  };