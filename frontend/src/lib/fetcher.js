import { HeliosAPI } from "./config";
import { Decrypt } from "./crypto";
import { Message } from "@arco-design/web-react";
import { getIP } from "./getIP";
import { errorCode } from "./config";

export const fetcherLib = async (route, options) => {
  const ip = await getIP();
  options.headers = { ...options.headers, ip };

  const fetchReq = fetch(`${HeliosAPI}/${route}`, options)
    .then((response) => response.json())
    .then(async (response) => {
      const decryptRes = await Decrypt(response);
      if (!decryptRes.success) {
        if (decryptRes.message === 75996 || decryptRes.message === 75997 || decryptRes.message === 75736) {
        }
        const message = errorCode.find((element) => element.code === decryptRes.message);
        if (message) {
          Message.error(`Erreur: ${message.message}`);
          return null;
        } else {
          Message.error(`Erreur: ${decryptRes.message}`);
          return null;
        }
      }
      return decryptRes;
    })
    .catch((err) => {
      //console.error(err);
      Message.error(`Erreur: ${err}`);
      return "error";
    });

  return fetchReq;
};
