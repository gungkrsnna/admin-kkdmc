import axios from "axios";

const API_URL =
  "https://kkdmc.gladiatoraruna.com/api/dashboard";

export const getDashboard =
  async () => {

    const res =
      await axios.get(
        API_URL
      );

    return res.data;

};