export const getIP = async () => {
  return fetch("https://api.ipify.org/?format=json")
    .then((response) => response.json())
    .then((response) => response.ip);
};
