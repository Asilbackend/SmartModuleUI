import axiosClient from 'src/service/axiosClient';

export const newsLike = (id) =>
  axiosClient.post(`/student/news/like`, {
    params: { newsId: id },
  });
