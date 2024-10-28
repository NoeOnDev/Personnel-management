"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const user_repository_1 = require("../repositories/user.repository");
const argon2_1 = __importDefault(require("argon2"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const customError_1 = require("../../_helper/customError");
const env_config_1 = __importDefault(require("../../_config/env.config"));
class UserService {
    constructor() {
        this.userRepository = new user_repository_1.UserRepository();
    }
    createUser(user) {
        return __awaiter(this, void 0, void 0, function* () {
            const existingUserByEmail = yield this.userRepository.findByEmail(user.email);
            if (existingUserByEmail) {
                throw new customError_1.CustomError("Email already in use", 400);
            }
            const existingUserByUsername = yield this.userRepository.findByUsername(user.username);
            if (existingUserByUsername) {
                throw new customError_1.CustomError("Username already in use", 400);
            }
            user.password = yield argon2_1.default.hash(user.password);
            return this.userRepository.create(user);
        });
    }
    getUsers() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.userRepository.findAll();
        });
    }
    getUserById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.userRepository.findById(id);
            if (!user) {
                throw new customError_1.CustomError("User not found", 404);
            }
            return user;
        });
    }
    updateUser(id, user) {
        return __awaiter(this, void 0, void 0, function* () {
            if (user.password) {
                user.password = yield argon2_1.default.hash(user.password);
            }
            const updatedUser = yield this.userRepository.update(id, user);
            if (!updatedUser) {
                throw new customError_1.CustomError("User not found", 404);
            }
            return updatedUser;
        });
    }
    deleteUser(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.userRepository.findById(id);
            if (!user) {
                throw new customError_1.CustomError("User not found", 404);
            }
            return this.userRepository.delete(id);
        });
    }
    authenticateUser(identifier, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = (yield this.userRepository.findByEmail(identifier)) ||
                (yield this.userRepository.findByUsername(identifier));
            if (!user) {
                throw new customError_1.CustomError("Invalid email/username or password", 401);
            }
            const validPassword = yield argon2_1.default.verify(user.password, password);
            if (!validPassword) {
                throw new customError_1.CustomError("Invalid email/username or password", 401);
            }
            const secret = env_config_1.default.jwt.secret;
            console.log("JWT Secret:", secret);
            const token = jsonwebtoken_1.default.sign({ id: user.id }, secret, {
                expiresIn: env_config_1.default.jwt.expiresIn,
            });
            return { user, token };
        });
    }
}
exports.UserService = UserService;
