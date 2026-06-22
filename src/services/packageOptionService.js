import axios from "axios";

const API_URL =
  "https://kkdmc.gladiatoraruna.com/api/tour-packages";

export const getOptionsByPackage =
  async (packageId) => {

    const res =
      await axios.get(
        `${API_URL}/${packageId}/options`
      );

    return res.data;
};