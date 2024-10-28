"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateReportSchema = exports.createReportSchema = void 0;
const joi_1 = __importDefault(require("joi"));
exports.createReportSchema = joi_1.default.object({
    title: joi_1.default.string().min(1).max(255).required(),
    description: joi_1.default.string().min(1).max(1000).required(),
});
exports.updateReportSchema = joi_1.default.object({
    title: joi_1.default.string().min(1).max(255),
    description: joi_1.default.string().min(1).max(1000),
}).min(1);
