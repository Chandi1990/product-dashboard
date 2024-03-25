import axios from 'axios';

const API_URL = 'https://dummyjson.com/products'; // Replace with your actual API URL

const fetchCategories = async () => {
  const response = await axios.get(`${API_URL}/categories`);
  return response.data;
};

const fetchProducts = async (categoryId: string) => {
  const response = await axios.get(`${API_URL}/category/${categoryId}`);
  return response.data;
};

export { fetchCategories, fetchProducts };
