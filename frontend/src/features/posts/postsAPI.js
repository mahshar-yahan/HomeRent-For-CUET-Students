import axiosInstance from "../../utils/axios";

export const getPosts = async (query) => {
  const response = await axiosInstance.get(`/posts?${query}`);

  return response.data;
};
