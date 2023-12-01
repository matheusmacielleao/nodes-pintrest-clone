import express from "express";
import { ImageController } from "./images.controller.js";
import { uploadImages } from "./use-cases/upload-image.js";

export const imageRouter = express.Router();
const imageController = new ImageController();
imageRouter
  .get("/addImage", async (req, res) => {
    const user = req.session.user || undefined;
    res.render("add-image", { user });
  })
  .post("/addImage", uploadImages.single("image"), async (req, res) => {
    await imageController.create(req, res);
  });
imageRouter.get("/", async (req, res) => {
  await imageController.getHomepage(req, res);
});

imageRouter.get("/myImages", async (req, res) => {
  await imageController.getMyImages(req, res);
});

imageRouter.post("/deleteImage/:url", async (req, res) => {
  await imageController.deleteImage(req, res);
});

imageRouter.post("/likeImage/:url", async (req, res) => {
  await imageController.likeImages(req, res);
});
