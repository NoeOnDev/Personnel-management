"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const env_config_1 = __importDefault(require("./env.config"));
const pgConfig = {
    host: env_config_1.default.db.host,
    port: env_config_1.default.db.port,
    database: env_config_1.default.db.name,
    user: env_config_1.default.db.user,
    password: env_config_1.default.db.password,
};
exports.default = pgConfig;
