import { ImageRepository } from "../../../app.js";

export async function addImage({ title, url, description, tags, author }) {
  const image = {
    title,
    url,
    description,
    tags: tags.split(",").map((tag) => {
      return { name: tag };
    }),
    author,
    createdAt: new Date(),
  };

  await ImageRepository.save(image);
  return image;
}
