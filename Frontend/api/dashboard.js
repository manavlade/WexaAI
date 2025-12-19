import axios from "axios";

export const BASE_URL = "http://localhost:8000/api/v1";

export const getDashboardSummary = async () => {
  const response = await axios.get(
    `${BASE_URL}/dashboard`,
    {
      withCredentials: true, 
    }
  );

  return response.data;
};
