import { DataSource } from "typeorm";
import { UserModel } from "./modules/user/user.model.js";
import { ImageModel } from "./modules/image/image.model.js";
import { TagModel } from "./modules/image/tags.model.js";

export const database = new DataSource({
  type: "sqlite",
  database: "sqlite3",
  entities: [UserModel, ImageModel, TagModel],
  synchronize: true,
});
