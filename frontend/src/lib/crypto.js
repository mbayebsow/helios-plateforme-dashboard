import tripledes from "crypto-js/tripledes";
import { enc } from "crypto-js/core";

const key = process.env.REACT_APP_SECRET_KEY;

export const Crypt = async (values, noBody) => {
  const stringifyValues = JSON.stringify(values);
  const cryptValues = await tripledes.encrypt(stringifyValues, key);
  if (noBody) return cryptValues.toString();
  return JSON.stringify({ body: cryptValues.toString() });
};

export const Decrypt = async (values) => {
  const decrypted = await tripledes.decrypt(values, key);
  const parsedValues = JSON.parse(decrypted.toString(enc.Utf8));
  return parsedValues;
};
