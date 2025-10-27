import axiosClient from 'src/service/axiosClient';
export const getTopVideos = () => axiosClient.get('/student/dashboard/topVideos');
