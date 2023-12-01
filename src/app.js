import express, { json } from "express";
import { database } from "./database.js";
database.initialize();
import path, { join } from "path";
import session from "express-session";
import bodyparser from "body-parser";
import { authRouther } from "./modules/user/auth-routes.js";
import { fileURLToPath } from "url";
import { UserModel } from "./modules/user/user.model.js";
import { ImageModel } from "./modules/image/image.model.js";
import { imageRouter } from "./modules/image/image.routes.js";
import { TagModel } from "./modules/image/tags.model.js";
export const UserRepository = database.getRepository(UserModel);
export const ImageRepository = database.getRepository(ImageModel);
export const TagRepository = database.getRepository(TagModel);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
console.log("directory-name 👉️", __dirname);

const app = express();
app.use("/uploads", express.static(join(__dirname, "../uploads")));

app.use(json());
app.set("view engine", "ejs");
app.set("views", [
  join(__dirname, "views/"),
  join(__dirname, "modules/image/views/"),
  join(__dirname, "modules/user/views/"),
]);
app.use(bodyparser.urlencoded({ extended: true }));

const oneDay = 1000 * 60 * 60 * 24;
app.use(
  session({
    secret: "thisismysecrctekeyfhrgfgrfrty84fwir767",
    cookie: { maxAge: oneDay },
    resave: true,
    saveUninitialized: true,
  })
);

app.use(authRouther);
app.use(imageRouter);
app.listen(3000, () => {
  console.log("runing on port 3000");
});
