import axios from "axios";
import { BASE_URL } from "./login";


export const getDashboardSummary = async () => {
  const response = await axios.get(
    `${BASE_URL}/dashboard`,
    {
      withCredentials: true, 
    }
  );

  return response.data;
};
