import axiosClient from '../service/axiosClient';

// api faylini o'zgartiring
export const getCertificate = (id) =>
  axiosClient.post(
    `/certificate?moduleId=${id}`,
    {},
    {
      responseType: 'arraybuffer', // blob o'rniga arraybuffer
    }
  );
