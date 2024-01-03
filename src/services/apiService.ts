import axios from 'axios';

const API_KEY: string = '39707189-cf35fc273df01ca9fa36884c9';
axios.defaults.baseURL = 'https://pixabay.com/api';

export const getImgs = async (
  value: string,
  page: number,
  pagination: number
): Promise<any> => {
  const params = new URLSearchParams({
    key: `${API_KEY}`,
    q: `${value}`,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: 'true',
    per_page: pagination.toString(),
  });
  const response = await axios.get(`/?${params}&page=${page}`);
  return response.data;
};
