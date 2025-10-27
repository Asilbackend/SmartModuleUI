import axiosClient from 'src/service/axiosClient';
export const getVideoComments = (videoId) =>
  axiosClient.get(`student/module-content/comment?size=6&attachmentId=${videoId}`);
