import * as Sequelize from "sequelize";
import { BaseModelInterface } from "../interfaces/BaseModelInterface";
import { ModelsInterface } from "../interfaces/ModelsInterface";

export interface CommentAtributes {
  id?: number;
  comment?: string;
  post?: string;
  user?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface CommentInstance extends Sequelize.Instance<CommentAtributes> {}

export interface CommentModel
  extends BaseModelInterface,
    Sequelize.Model<CommentInstance, CommentAtributes> {}

export default (
  sequelize: Sequelize.Sequelize,
  dataTypes: Sequelize.DataTypes
): CommentModel => {
  const Comment: CommentModel = sequelize.define(
    "Comment",
    {
      id: {
        type: dataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      comment: {
        type: dataTypes.TEXT,
        allowNull: false
      }
    },
    { tableName: "comments" }
  );

  Comment.associate = (models: ModelsInterface): void => {
    Comment.belongsTo(models.Post, {
      foreignKey: {
        allowNull: false,
        field: "post",
        name: "post"
      }
    });

    Comment.belongsTo(models.User, {
      foreignKey: {
        allowNull: false,
        field: "user",
        name: "user"
      }
    });
  };

  return Comment;
};
