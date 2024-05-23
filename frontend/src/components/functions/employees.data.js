import { Crypt } from "../../lib/crypto";
import { fetcherLib } from "../../lib/fetcher";

export const addEmployee = async (values) => {
  const cryptValues = await Crypt(values);
  const options = {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: cryptValues,
  };
  return fetcherLib("employees", options);
};

export const getEmployees = async () => {
  const options = { method: "GET", credentials: "include" };
  return fetcherLib("employees", options);
};

export const getEmployee = async (id) => {
  const options = { method: "GET", credentials: "include" };
  return fetcherLib(`employees/${id}`, options);
};

export const updateEmployee = async (id, values) => {
  const cryptValues = await Crypt(values);
  const options = {
    method: "PUT",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: cryptValues,
  };
  return fetcherLib(`employees/${id}`, options);
};

export const deleteEmployee = async (id) => {
  const options = {
    method: "DELETE",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
  };
  return fetcherLib(`employees/${id}`, options);
};
