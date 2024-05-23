import { Crypt } from "../../lib/crypto";
import { fetcherLib } from "../../lib/fetcher";

export const addUser = async (values) => {
  const cryptValues = await Crypt(values);
  const options = {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: cryptValues,
  };
  return fetcherLib("users", options);
};

export const getUsers = async () => {
  const options = { method: "GET", credentials: "include" };
  return fetcherLib("users", options);
};

export const getUser = async (id) => {
  const options = { method: "GET", credentials: "include" };
  return fetcherLib(`users/${id}`, options);
};

export const updateUser = async (id, values) => {
  const cryptValues = await Crypt(values);
  const options = {
    method: "PUT",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: cryptValues,
  };
  return fetcherLib(`users/${id}`, options);
};
export const deleteUser = async (id) => {
  const options = {
    method: "DELETE",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
  };
  return fetcherLib(`users/${id}`, options);
};
