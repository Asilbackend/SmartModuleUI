// src/api/axiosClient.js
import axios from 'axios';

const BASE_URL = 'https://dev.anvarovich.uz/api';
const axiosClient = axios.create({
  //   https://dev.anvarovich.uz/api   ==>serverga yuklashdan oldin buni activlashtrish kerak
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Tokenni requestga qo‘shish
axiosClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('accessToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// 401 bo‘lsa refresh qilish
axiosClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response && error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = localStorage.getItem('refreshToken');
        const res = await axios.post(`${BASE_URL}/auth/refresh-token`, null, {
          params: {
            refreshToken,
          },
        });

        const newToken = res.data.accessToken; // yoki res.data.accessToken
        localStorage.setItem('accessToken', newToken);
        originalRequest.headers.Authorization = `Bearer ${newToken}`;
        return axiosClient(originalRequest);
      } catch (refreshErr) {
        localStorage.clear();
        window.location.href = '/login';
        return Promise.reject(refreshErr);
      }
    }

    return Promise.reject(error);
  },
);

export default axiosClient;
