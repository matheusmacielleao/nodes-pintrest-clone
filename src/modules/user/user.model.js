import { EntitySchema } from "typeorm";

export const UserModel = new EntitySchema({
  name: "User",
  tableName: "user",
  columns: {
    userName: {
      primary: true,
      type: "varchar",
    },
    password: {
      type: "varchar",
      required: true,
    },
  },
  relations: {
    images: {
      name: "userImages",
      target: "Image",
      type: "one-to-many",
      inverseSide: "author",
      cascade: true,
    },
  },
});
