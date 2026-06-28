import api from "./api";

export const getReservations =
  async () => {

    const res =
      await api.get(
        "/reservations"
      );

    return res.data;
  };

export const getReservationById =
  async (id) => {

    const res =
      await api.get(
        `/reservations/${id}`
      );

    return res.data;
  };

export const updateReservation =
  async (
    id,
    payload
  ) => {

    const res =
      await api.put(
        `/reservations/${id}`,
        payload
      );

    return res.data;
  };

export const exportReservations =
  async () => {

    const response =
      await api.get(
        "/reservations/export",
        {
          responseType: "blob",
        }
      );

    return response.data;

  };

export const downloadConfirmation =
async (id) => {

  const response =
    await api.get(
      `/reservations/${id}/confirmation`,
      {
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

  window.open(url, "_blank");

};