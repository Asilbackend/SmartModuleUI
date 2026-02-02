import axiosClient from 'src/service/axiosClient';

export const getStartTest = (moduleId) =>
  axiosClient.get(`student/test/start?moduleId=${moduleId}`);
export const getAllQuestionsbyId = (moduleId) =>
  axiosClient.get(`student/test/userQuestion/byModuleId?moduleId=${moduleId}`);
export const postSubmitTest = (questionOptionId) =>
  axiosClient.post(`student/test/answer?questionOptionId=${questionOptionId}`);
export const postFinishTest = (moduleId) =>
  axiosClient.post(`student/test/finish?moduleId=${moduleId}`);
