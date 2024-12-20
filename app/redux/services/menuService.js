import axios from 'axios';

// const API_URL = '/api/menu';
const API_URL = process.env.NEXT_PUBLIC_API_URL || '/api/menu';

export const fetchMenus = async () => {
  return await axios.get(API_URL);
};

export const fetchMenuById = async (id) => {
  return await axios.get(`${API_URL}/${id}`);
};

export const saveMenu = async (menuData) => {
  return await axios.post(API_URL, menuData);
};
