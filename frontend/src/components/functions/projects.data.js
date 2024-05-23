import { Crypt } from "../../lib/crypto";
import { fetcherLib } from "../../lib/fetcher";

export const addProject = async (values) => {
  const cryptValues = await Crypt(values);
  const options = {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: cryptValues,
  };
  const data = await fetcherLib("projects", options);
  return data;
};

export const getProjects = async () => {
  const options = { method: "GET", credentials: "include" };
  const data = await fetcherLib("projects", options);
  return data;
};

export const getProject = async (id, populate) => {
  const options = { method: "GET", credentials: "include" };
  const data = await fetcherLib(`projects/${id}?populate=${populate}`, options);
  return data;
};

export const updateProject = async (id, values) => {
  const cryptValues = await Crypt(values);
  const options = {
    method: "PUT",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: cryptValues,
  };
  const data = await fetcherLib(`projects/${id}`, options);
  return data;
};

export const deleteProject = async (id) => {
  const options = {
    method: "DELETE",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
  };
  const data = await fetcherLib(`projects/${id}`, options);
  return data;
};
