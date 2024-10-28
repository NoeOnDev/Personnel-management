"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const env_config_1 = __importDefault(require("../_config/env.config"));
const authenticateJWT = (req, res, next) => {
    var _a;
    const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(" ")[1];
    if (!token) {
        res.status(401).json({ message: "Access token is missing or invalid" });
        return;
    }
    const secret = env_config_1.default.jwt.secret;
    console.log(secret);
    if (!secret) {
        res.status(500).json({ message: "Internal server error" });
        return;
    }
    jsonwebtoken_1.default.verify(token, secret, (err, user) => {
        if (err) {
            res.status(403).json({ message: "Invalid token" });
            return;
        }
        req.user = user;
        next();
    });
};
exports.default = authenticateJWT;
