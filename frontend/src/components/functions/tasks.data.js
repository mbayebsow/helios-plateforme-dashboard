import { Crypt } from "../../lib/crypto";
import { fetcherLib } from "../../lib/fetcher";
import { Message } from "@arco-design/web-react";

export const addTask = async (values) => {
  const cryptValues = await Crypt(values);
  const options = {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: cryptValues,
  };
  const data = await fetcherLib("tasks", options);
  return data;
};

export const setStatus = async (id, status) => {
  const options = {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
  };
  const data = await fetcherLib(`tasks/${id}/${status}`, options);
  if (data) {
    Message.success(data?.message);
  }
  return;
};

export const getTasks = async () => {
  const options = { method: "GET", credentials: "include" };
  const data = await fetcherLib("tasks", options);
  return data;
};

export const getTask = async (id) => {
  const options = { method: "GET", credentials: "include" };
  const data = await fetcherLib(`tasks/${id}`, options);
  return data;
};

export const updateTask = async (id, values) => {
  const cryptValues = await Crypt(values);
  const options = {
    method: "PUT",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: cryptValues,
  };
  const data = await fetcherLib(`tasks/${id}`, options);
  return data;
};

export const deleteTask = async (id) => {
  const options = {
    method: "DELETE",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
  };
  const data = await fetcherLib(`tasks/${id}`, options);
  return data;
};
