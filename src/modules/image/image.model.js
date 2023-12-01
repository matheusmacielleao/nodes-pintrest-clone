import { EntitySchema } from "typeorm";

export const ImageModel = new EntitySchema({
  name: "Image",
  tableName: "image",
  columns: {
    id: {
      primary: true,
      type: "int",
      generated: true,
    },
    title: {
      nullable: false,
      type: "varchar",
    },
    url: {
      nullable: false,
      type: "varchar",
    },
    description: {
      nullable: false,
      type: "varchar",
    },
    createdAt: {
      type: "date",
    },
  },
  relations: {
    tags: {
      target: "Tag",
      type: "many-to-many",
      joinTable: true,
      cascade: true,
    },
    author: {
      target: "User",
      type: "many-to-one",
      joinColumn: {
        name: "user_userName",
      },
      inverseSide: "images",
    },
    likedBy: {
      target: "User",
      type: "many-to-many",
      joinTable: true,
      cascade: true,
    },
  },
});
