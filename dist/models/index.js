"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path = require("path");
const basename = path.basename(module.filename);
const env = process.env.NODE_ENV || "development";
let config = require(path.resolve(`${__dirname}./../config/config.json`))[env];
console.log(config);
