import axios from 'axios';

const BASE_URL = 'https://dev.anvarovich.uz/api';

const axiosClient = axios.create({
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
    // ⚠️ Errorni to‘liq tekshirish
    if (!error.response) {
      console.error('❌ Network error yoki serverga ulanishda xato:', error);
      return Promise.reject(error);
    }

    const originalRequest = error.config;

    // 401 bo‘lsa tokenni yangilash
    if (
      error.response.status === 401 &&
      !originalRequest._retry &&
      originalRequest.url !== '/auth/login'
    ) {
      originalRequest._retry = true;

      try {
        const refreshToken = localStorage.getItem('refreshToken');
        if (!refreshToken) throw new Error('Refresh token yo‘q');

        const res = await axios.post(`${BASE_URL}/auth/refresh-token`, null, {
          params: { refreshToken },
        });

        const newToken = res.data.accessToken;
        localStorage.setItem('accessToken', newToken);

        originalRequest.headers.Authorization = `Bearer ${newToken}`;
        return axiosClient(originalRequest);
      } catch (refreshErr) {
        console.error('♻️ Refresh token ishlamadi:', refreshErr);
        localStorage.clear();
        window.location.href = '/login';
        return Promise.reject(refreshErr);
      }
    }

    // Boshqa barcha xatolarni tashqariga yuborish
    return Promise.reject(error);
  }
);

export default axiosClient;
