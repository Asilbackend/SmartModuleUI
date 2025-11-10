import axiosClient from 'src/service/axiosClient';

export const newsLike = (id) => axiosClient.post(`/student/news/like?newsId=${id}`);
export const getStories = () => axiosClient.get('student/news/getNext?size=20');
export const getNewsData = (storyId) => axiosClient.get(`/student/news/${storyId}`);
