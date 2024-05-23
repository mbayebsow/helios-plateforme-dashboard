import { Crypt } from "../../lib/crypto";
import { fetcherLib } from "../../lib/fetcher";
import Cookies from "js-cookie";
import { Message } from "@arco-design/web-react";
import { getIP } from "../../lib/getIP";

// TODO: importer le setSession sur le login et le logout
export const loginFunc = async (values) => {
  const ip = await getIP();
  const cryptValues = await Crypt({ ...values, ip });

  const options = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: cryptValues,
  };
  const session = await fetcherLib("auth/login", options);

  if (session && session !== "error") {
    const setSessionCookie = await Cookies.set("helios_session", session.session, {
      path: "/",
      expires: 1,
      secure: true,
      sameSite: "strict",
    });
    if (setSessionCookie) {
      return true;
    }
  } else {
    return session;
  }
};

export const logoutFunc = async () => {
  Message.loading({
    id: "shouldLogout",
    content: "Deconection en cour...",
  });

  const cryptValues = await Crypt("logout");
  const options = {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: cryptValues,
  };

  const shouldLogout = await fetcherLib("auth/logout", options);

  if (!shouldLogout || shouldLogout === "error") {
    return null;
  } else {
    await Cookies.remove("helios_session");
    Message.success({
      id: "shouldLogout",
      content: "Vous vous etes deconecter avec success.",
    });
    return true;
  }
};

export const otpGenerateFunc = async () => {
  const options = { method: "GET", credentials: "include" };
  return fetcherLib("otpauth/generate", options);
};

export const otpVerifyFunc = async (values) => {
  const cryptValues = await Crypt(values);
  const options = {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: cryptValues,
  };

  return fetcherLib("otpauth/verify", options);
};

export const otpValidateFunc = async (values) => {
  const cryptValues = await Crypt(values);
  const options = {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: cryptValues,
  };

  return fetcherLib("otpauth/validate", options);
};

export const getUserSession = async () => {
  const options = {
    method: "GET",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
  };
  const serverSession = await fetcherLib("auth/me", options);
  return serverSession;
};
