import axiosClient from '../service/axiosClient';

export const getAllMoudles = () => axiosClient.get('/student/module-content/module');
export const getModuleById = (id) =>
  axiosClient.get(`/student/module-content/findContents-byModuleId`, {
    params: { moduleId: id },
  });
// export const createUser = (data: any) => axiosClient.post('/users', data);
// export const updateUser = (id: number, data: any) => axiosClient.put(`/users/${id}`, data);
// export const deleteUser = (id: number) => axiosClient.delete(`/users/${id}`);
