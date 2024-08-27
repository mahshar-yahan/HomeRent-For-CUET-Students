// GET /posts?_sort=views&_order=asc
// GET /posts/1/comments?_sort=votes&_order=asc
import { jwtDecode } from "jwt-decode";
import axiosInstance from "../../utils/axios";

export const getLoggedInUser = async (data) => {
  const respose = await axiosInstance.post(`/users/login`, data);
  const token = respose.data.token;

  localStorage.setItem("token", token);
  let decoded = jwtDecode(respose.data.token);
  const expireTime = new Date(decoded.exp * 1000);
  localStorage.setItem("expireTime", expireTime);
  localStorage.setItem("role", respose.data.user.role);

  return respose.data;
};

export const getUser = async () => {
  const respose = await axiosInstance.get(`/users`);

  return respose.data;
};

export const getAllUser = async () => {
  const respose = await axiosInstance.get(`/allUsers`);

  return respose.data;
};

export const getRegisteredUser = async (data) => {
  const respose = await axiosInstance.post(`/users/register`, data);

  return respose.data;
};

export const getLoggedOutUser = async () => {
  const respose = await axiosInstance.get(`/users/logout`);

  return respose.data;
};
