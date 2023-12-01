import { ImageRepository, TagRepository } from "../../app.js";
import { addImage } from "./use-cases/add-image.js";
import { deleteImage } from "./use-cases/delete-image.js";
import { likeImage } from "./use-cases/like-image.js";

export class ImageController {
  async likeImages(req, res) {
    try {
      const { url } = req.params;
      const { userName } = req.session.user;
      await likeImage({ imageId: url, userName });
      res.redirect("back");
    } catch (error) {
      console.log(error);
      res.redirect("back");
    }
  }

  async create(req, res) {
    const { title, description, tags } = req.body;
    const author = req.session.user;
    const url = req.file.filename;
    await addImage({ title, url, description, tags, author });
    res.redirect("/");
  }

  async deleteImage(req, res) {
    try {
      const { url } = req.params;
      const { userName } = req.session.user;
      await deleteImage(url, userName);
      res.redirect("/myImages");
    } catch (error) {
      console.log(error);
      res.redirect("/myImages");
    }
  }

  async getMyImages(req, res) {
    const images =
      (await ImageRepository.find({
        where: { author: req.session.user },
        relations: ["author", "likedBy"],
      })) || [];

    res.render("my-images", {
      user: req.session.user || undefined,
      images,
    });
  }

  async getHomepage(req, res) {
    const { page = 0 } = req.query;
    const result = await ImageRepository.findAndCount({
      relations: ["likedBy", "author", "tags"],
      take: 2,
      skip: page * 2,
    });

    const images = result[0] || [];
    const totalPages = result[1] / 2;

    const allTags = await TagRepository.find();
    res.render("images-cards", {
      allTags,
      user: req.session.user || undefined,
      images,
      currentPage: page,
      totalPages,
    });
  }
}
