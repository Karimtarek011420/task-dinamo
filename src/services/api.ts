import axios from "axios";

const apiClient = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com",
});

export const fetchPosts = () => apiClient.get("/posts");
export const createPost = (data: { title: string; body: string }) =>
  apiClient.post("/posts", data);
export const updatePost = (id: number, data: { title: string; body: string }) =>
  apiClient.put(`/posts/${id}`, data);
export const deletePost = (id: number) => apiClient.delete(`/posts/${id}`);
