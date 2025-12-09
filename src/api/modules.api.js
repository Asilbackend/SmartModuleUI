import axiosClient from '../service/axiosClient';

export const getAllModules = () => axiosClient.get('/student/module-content/module');

export const getModuleById = (id) =>
  axiosClient.get(`/student/module-content/findContents-byModuleId`, {
    params: { moduleId: id },
  });

export const postStartContent = (contentId) =>
  axiosClient.post(`student/module-content/startContent?contentId=${contentId}`);

export const postTextContent = (title, contentId) =>
  axiosClient.post(
    '/student/module-content/readTextFromContent',
    {},
    { params: { title, contentId } }
  );

export const postPictureContent = (attachmentId, contentId) =>
  axiosClient.post('student/module-content/readFileFromContent', null, {
    params: { attachmentId, contentId },
  });

export const getContentText = (title) =>
  axiosClient.get(`student/module-content/findContentTextByTitle?title=${title}`);
