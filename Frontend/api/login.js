import axios from "axios";

export const BASE_URL = "http://localhost:8000/api/v1";

export async function LoginUser(email, password) {
  try {
    const response = await axios.post(
      `${BASE_URL}/user/login`,
      { email, password },
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,  
      }
    );

    const data = response.data;

    if (response.status !== 200) {
      throw new Error(data.message || "Login failed");
    }

    return data;
  } catch (error) {
    throw error;
  }
}



export async function SignUpUser(email, password,organizationName) {
  try {
    const response = await axios.post(
      `${BASE_URL}/user/register`,
      { email, password,organizationName },
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,  
      }
    );

    const data = response.data;

    if (response.status !== 200) {
      throw new Error(data.message || "Register failed");
    }

    return data;
  } catch (error) {
    throw error;
  }
}

