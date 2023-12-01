import { EntitySchema } from "typeorm";

export const TagModel = new EntitySchema({
  name: "Tag",
  tableName: "tag",
  columns: {
    name: {
      primary: true,
      nullable: false,
      type: "varchar",
    },
  },
  relations: {
    images: {
      target: "Image",
      type: "many-to-many",
      joinTable: true,
      cascade: true,
    },
  },
});
