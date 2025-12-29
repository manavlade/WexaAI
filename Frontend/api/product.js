import axios from "axios";
import { BASE_URL } from "./login";


export const getProducts = async () => {
  const res = await axios.get(`${BASE_URL}/product/getAllProducts`, {
    withCredentials: true,
  });
  return res.data;
};

export const createProduct = async (productData) => {

  const res = await axios.post(
    `${BASE_URL}/product`,
    productData,
    
    { withCredentials: true }
  );
  return res.data;
};



export const updateProduct = async (id, data) => {
  const res = await axios.put(`${BASE_URL}/product/${id}`, data, {
    withCredentials: true,
  });
  return res.data;
};

export const deleteProduct = async (id) => {
  const res = await axios.delete(`${BASE_URL}/product/${id}`, {
    withCredentials: true,
  });
  return res.data;
};