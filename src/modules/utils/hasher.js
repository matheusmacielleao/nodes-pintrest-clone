import crypto from "crypto";
export function hashPassword(password) {
  const salt = "flamengo";
  const hash = crypto.createHash("sha256");
  hash.update(password + salt);
  const hashedPassword = hash.digest("hex");
  return hashedPassword;
}
export function decodePassword(enteredPassword) {
  const salt = "flamengo";
  const hash = crypto.createHash("sha256");
  hash.update(enteredPassword + salt);
  const enteredPasswordHash = hash.digest("hex");
  return enteredPasswordHash;
}
