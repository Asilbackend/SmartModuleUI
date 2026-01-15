import axiosClient from 'src/service/axiosClient';

export const getStudentData = () => axiosClient.get('student/profile/get-student-data');
export const getLastViewedVideos = () =>
  axiosClient.get('student/profile/lastVideos?page=0&size=20');
export const getModuleStatus = (status) =>
  axiosClient.get(`student/profile/filter-by-status?userModuleStatus=${status}`);
export const getModuleIdByContentId = (contentId) =>
  axiosClient.get(`student/profile/getModuleIdByContentId?contentId=${contentId}`);
