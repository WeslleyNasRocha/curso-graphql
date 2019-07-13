import * as Sequelize from "sequelize";
import { genSaltSync, hashSync, compareSync } from "bcryptjs";
import { BaseModelInterface } from "../interfaces/BaseModelInterface";
import { ModelsInterface } from "../interfaces/ModelsInterface";

export interface UserAtributes {
  id?: number;
  name?: string;
  email?: string;
  password?: string;
  photo?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface UserInstance
  extends Sequelize.Instance<UserAtributes>,
    UserAtributes {
  isPassword(encodedPassword: string, password: string): boolean;
}

export interface UserModel
  extends BaseModelInterface,
    Sequelize.Model<UserInstance, UserAtributes> {}

export default (
  sequelize: Sequelize.Sequelize,
  dataTypes: Sequelize.DataTypes
): UserModel => {
  const User: UserModel = sequelize.define(
    "User",
    {
      id: {
        type: dataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      name: {
        type: dataTypes.STRING(128),
        allowNull: false
      },
      email: {
        type: dataTypes.STRING(128),
        allowNull: false,
        unique: true
      },
      password: {
        type: dataTypes.STRING(128),
        allowNull: false,
        validate: {
          notEmpty: true
        }
      },
      photo: {
        type: dataTypes.BLOB({ length: "long" }),
        allowNull: true,
        defaultValue: null
      }
    },
    {
      tableName: "users",
      hooks: {
        beforeCreate: (
          user: UserInstance,
          options: Sequelize.CreateOptions
        ): void => {
          const salt = genSaltSync();
          user.password = hashSync(user.password, salt);
        }
      }
    }
  );

  User.associate = (models: ModelsInterface): void => {};

  User.prototype.isPassword = (
    encodedPassword: string,
    password: string
  ): boolean => {
    return compareSync(password, encodedPassword);
  };
  return User;
};
