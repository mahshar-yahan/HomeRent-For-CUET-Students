// GET /posts?_sort=views&_order=asc
// GET /posts/1/comments?_sort=votes&_order=asc

import axiosInstance from "../../utils/axios";

export const updateUserProfile = async (data) => {
  const respose = await axiosInstance.put(`/profile/edit`, data);

  return respose.data;
};

export const getProfile = async () => {
  const respose = await axiosInstance.get(`/profile/`);

  return respose.data;
};

export const createUserEmptyProfile = async (data) => {
  const respose = await axiosInstance.post(`/profile/create`);

  return respose.data;
};
