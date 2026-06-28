import axios from "axios";

const API_URL =
  "https://kkdmc.gladiatoraruna.com/api/upload/tour-package";

export const uploadImage =
  async (file) => {

    const formData =
      new FormData();

    formData.append(
      "image",
      file
    );

    const res =
      await axios.post(
        API_URL,
        formData,
        {
          headers: {
            "Content-Type":
              "multipart/form-data",
          },
        }
      );

    return res.data;
  };