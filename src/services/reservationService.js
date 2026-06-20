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