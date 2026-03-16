import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8000"
});

export const getNodes = () => API.get("/nodes");

export const getWorkflows = (query = "") => API.get(`/workflows${query}`);

export const getWorkflow = (name) => API.get(`/workflows/${name}`);

export const getResults = (name) => API.get(`/workflows/${name}/results`);

export const deleteWorkflow = (name) => API.delete(`/workflows/${name}`);

export const submitWorkflow = (formData) =>
  API.post("/workflows", formData, {
    headers: { "Content-Type": "multipart/form-data" }
  });
