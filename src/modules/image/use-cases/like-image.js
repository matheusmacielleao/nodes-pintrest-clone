import { ImageRepository, UserRepository } from "../../../app.js";

export async function likeImage({ imageId, userName }) {
  const image = await ImageRepository.findOne({
    where: { id: imageId },
    relations: ["likedBy"],
  });
  if (image === null) {
    throw new Error("Image not found");
  }

  const user = await UserRepository.findOne({ where: { userName } });
  if (user === null) {
    throw new Error("User not found");
  }
  if (!image.likedBy) {
    image.likedBy = [];
  }

  const userAlreadyLiked = image.likedBy.some(
    (like) => like.userName === userName
  );

  if (userAlreadyLiked) {
    throw new Error("User already liked this image");
  }

  image.likedBy.push(user);

  await ImageRepository.save(image);
}
