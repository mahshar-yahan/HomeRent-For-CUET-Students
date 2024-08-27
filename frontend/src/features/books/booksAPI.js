import axiosInstance from "../../utils/axios";

export const getBookedPosts = async () => {
  const response = await axiosInstance.get(`/books`);

  return response.data;
};
