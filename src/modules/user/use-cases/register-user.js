import { UserRepository } from "../../../app.js";
import { hashPassword } from "../../utils/hasher.js";

export async function registerUser(userName, password) {
  const userExists = await UserRepository.findOne({
    where: { userName },
  });

  if (userExists) {
    throw new Error("User already exists");
  }

  console.log("Creating user", userName, password);
  return UserRepository.save({ userName, password: hashPassword(password) });
}
