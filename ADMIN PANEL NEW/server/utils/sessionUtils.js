const crypto = require("crypto");

const generateSessionToken = () => {
  return crypto.randomBytes(32).toString("hex");
};

module.exports = { generateSessionToken };
