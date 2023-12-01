import { ImageRepository } from "../../app.js";
import { loginUser } from "./use-cases/login-user.js";
import { registerUser } from "./use-cases/register-user.js";

export class AuthController {
  async getProfile(req, res) {
    try {
      const { page = 0 } = req.query;

      const userName = req.params.userName;
      const user = req.session.user || undefined;

      const result = await ImageRepository.findAndCount({
        where: { author: { userName } },
        relations: ["author", "likedBy"],
        skip: page * 1,
        take: 10,
      });
      const images = result[0] || [];
      const totalPages = result[1] / 10;

      res.render("profile", {
        userName,
        user,
        images,
        currentPage: page,
        totalPages,
      });
    } catch (error) {
      console.log(error);
      res.redirect("/");
    }
  }
  async register(req, res) {
    try {
      const { userName, password } = req.body;
      const user = await registerUser(userName, password);
      req.session.user = user;
      res.redirect("/");
    } catch (error) {
      res.redirect("back");
    }
  }

  async login(req, res) {
    try {
      const { userName, password } = req.body;
      const user = await loginUser({ userName, password });
      req.session.user = user;
      res.redirect("/");
    } catch (error) {
      console.log(error);
      res.redirect("back");
    }
  }

  async logout(req, res) {
    try {
      req.session.destroy();
      res.redirect("/");
    } catch (error) {
      res.redirect("back");
    }
  }
}
