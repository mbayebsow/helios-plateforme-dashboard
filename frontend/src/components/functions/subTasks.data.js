import { Crypt } from "../../lib/crypto";
import { fetcherLib } from "../../lib/fetcher";

export const addSubTask = async (values) => {
  const cryptValues = await Crypt(values);
  const options = {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: cryptValues,
  };
  const data = await fetcherLib("sub_tasks", options);
  return data;
};

export const setCompleted = async (id, completed) => {
  const options = {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
  };
  const data = await fetcherLib(`sub_tasks/${id}/${completed}`, options);
  return data;
};

export const getSubTasks = async (id) => {
  const options = { method: "GET", credentials: "include" };
  const data = await fetcherLib(`sub_tasks/${id}`, options);
  return data;
};

export const updateSubTask = async (id, values) => {
  const cryptValues = await Crypt(values);
  const options = {
    method: "PUT",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: cryptValues,
  };
  const data = await fetcherLib(`sub_tasks/${id}`, options);
  return data;
};

export const deleteSubTask = async (id) => {
  const options = {
    method: "DELETE",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
  };
  const data = await fetcherLib(`sub_tasks/${id}`, options);
  return data;
};
