"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginUserSchema = exports.updateUserSchema = exports.createUserSchema = void 0;
const joi_1 = __importDefault(require("joi"));
exports.createUserSchema = joi_1.default.object({
    firstName: joi_1.default.string().min(1).max(255).required(),
    lastName: joi_1.default.string().min(1).max(255).required(),
    phone: joi_1.default.string().min(10).max(20).required(),
    email: joi_1.default.string().email().required(),
    username: joi_1.default.string().min(3).max(50).required(),
    password: joi_1.default.string().min(6).max(255).required(),
});
exports.updateUserSchema = joi_1.default.object({
    firstName: joi_1.default.string().min(1).max(255),
    lastName: joi_1.default.string().min(1).max(255),
    phone: joi_1.default.string().min(10).max(20),
    email: joi_1.default.string().email(),
    username: joi_1.default.string().min(3).max(50),
    password: joi_1.default.string().min(6).max(255),
}).min(1);
exports.loginUserSchema = joi_1.default.object({
    identifier: joi_1.default.string().required(),
    password: joi_1.default.string().min(6).max(255).required(),
});
