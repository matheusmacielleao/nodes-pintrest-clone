import { UserRepository } from "../../../app.js";
import { hashPassword } from "../../utils/hasher.js";

export async function loginUser({ userName, password }) {
  console.log("Logging in user", userName, password);
  const user = await UserRepository.findOne({
    where: { userName, password: hashPassword(password) },
  });

  if (!user) {
    throw new Error("User not found");
  }

  console.log(user);

  return user;
}
