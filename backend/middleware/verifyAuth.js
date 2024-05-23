const { auth } = require("express-oauth2-jwt-bearer");

const jwtCheck = auth({
  audience: "https://api.teldoogroup.com",
  issuerBaseURL: "https://teldoo.eu.auth0.com/",
  tokenSigningAlg: "RS256",
});

module.exports = jwtCheck;
