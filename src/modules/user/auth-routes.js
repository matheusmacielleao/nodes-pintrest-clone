import express from "express";
import { AuthController } from "./auth-controller.js";
export const authRouther = express.Router();
const authController = new AuthController();

authRouther.get("/users/:userName", async (req, res) => {
  await authController.getProfile(req, res);
});
authRouther
  .post("/register", async (req, res) => {
    await authController.register(req, res);
  })
  .get("/register", async (req, res) => {
    const user = req.session.user || undefined;
    res.render("register-form", { user });
  });

authRouther
  .post("/login", async (req, res) => {
    await authController.login(req, res);
  })
  .get("/login", async (req, res) => {
    const user = req.session.user || undefined;
    res.render("login-form", { user });
  });

authRouther.get("/logout", async (req, res) => {
  await authController.logout(req, res);
});
