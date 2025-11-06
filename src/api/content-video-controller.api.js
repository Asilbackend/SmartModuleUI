import axiosClient from 'src/service/axiosClient';
export const getVideoComments = (videoId) =>
  axiosClient.get(`student/content-video/comment?size=6&attachmentId=${videoId}`);
export const addVideoComment = (comment, videoId) =>
  axiosClient.post(`student/content-video/comment?attachmentId=${videoId}&comment=${comment}`);
export const getVideoRate = (videoId) =>
  axiosClient.get(`/student/content-video/rate-content?attachmentId=${videoId}`);
export const postVideoRate = (rate, videoId) =>
  axiosClient.post(`/student/content-video/rate-content?videoRate=${rate}&attachmentId=${videoId}`);
export const deleteVideoComment = (commentId) =>
  axiosClient.delete(`student/content-video/comment?commentId=${commentId}`);
export const updateVideoComment = (updComment, commentId) =>
  axiosClient.put(
    `student/content-video/comment?commentId=${commentId}&updatedComment=${updComment}`
  );
