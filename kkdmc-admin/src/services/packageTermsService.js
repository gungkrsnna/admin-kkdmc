import axios from "axios";

const API_URL =
"https://kkdmc.gladiatoraruna.com/api/package-terms";

export const getTerms =
async (packageId) => {

  const res =
    await axios.get(
      `${API_URL}/package/${packageId}`
    );

  return res.data;

};

export const saveTerms =
async (
  packageId,
  content
) => {

  const res =
    await axios.post(
      `${API_URL}/package/${packageId}`,
      {
        content,
      }
    );

  return res.data;

};