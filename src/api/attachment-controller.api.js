import axiosClient from 'src/service/axiosClient';

export const VideoImg = (attachmentId) => axiosClient.get(`/attachment/${attachmentId}`);
