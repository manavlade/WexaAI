import axios from "axios";

export const BASE_URL = "http://localhost:8000/api/v1";

// Get all products
export const getProducts = async () => {
  const res = await axios.get(`${BASE_URL}/product/getAllProducts`, {
    withCredentials: true,
  });
  return res.data;
};

// Create product
export const createProduct = async (productData) => {

  const res = await axios.post(
    `${BASE_URL}/product`,
    productData,
    
    { withCredentials: true }
  );
  return res.data;
};
