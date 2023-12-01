import { ImageRepository } from "../../../app.js";

export async function deleteImage(id, userName) {
  const image = await ImageRepository.findOne({
    where: { id },
    relations: ["author"],
  });

  if (!image) {
    throw new Error("Image not found");
  }

  if (image.author.userName !== userName) {
    throw new Error("You are not allowed to delete this image");
  }

  return ImageRepository.delete(image);
}
