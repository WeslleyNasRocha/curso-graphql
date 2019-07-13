import * as fs from "fs";
import * as path from "path";
import * as Sequelize from "sequelize";
import { DbConnection } from "../interfaces/DbConnectionIterface";

const basename: string = path.basename(module.filename);
const env: string = process.env.NODE_ENV || "development";

let config = require(path.resolve(`${__dirname}./../config/config.json`))[env];

let db = null;

if (!db) {
  db = {};
  const sequelize: Sequelize.Sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config
  );
  // Carrega todos os models
  fs.readdirSync(__dirname)
    .filter(
      (file: string) =>
        file.indexOf(".") !== 0 &&
        file !== basename &&
        (file.slice(-3) === ".js" || file.slice(-3) === ".ts")
    )
    .forEach((file: string) => {
      const model = sequelize.import(path.join(__dirname, file));
      db[model["name"]] = model;
    });

  Object.keys(db).forEach((modelName: string) => {
    // se o model tem uma função associate
    if (db[modelName].associate) {
      // executa a função associate
      db[modelName].associate(db);
    }
  });

  db["sequelize"] = sequelize;
}

export default <DbConnection>db;
