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
exports.UserRepository = void 0;
const pg_1 = require("pg");
const db_config_1 = __importDefault(require("../../_config/db.config"));
const pool = new pg_1.Pool(db_config_1.default);
class UserRepository {
    create(user) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield pool.query(`INSERT INTO users (firstName, lastName, phone, email, username, password) 
       VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`, [
                user.firstName,
                user.lastName,
                user.phone,
                user.email,
                user.username,
                user.password,
            ]);
            return result.rows[0];
        });
    }
    findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield pool.query(`SELECT * FROM users`);
            return result.rows;
        });
    }
    findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield pool.query(`SELECT * FROM users WHERE id = $1`, [id]);
            return result.rows[0] || null;
        });
    }
    findByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield pool.query(`SELECT * FROM users WHERE email = $1`, [
                email,
            ]);
            return result.rows[0] || null;
        });
    }
    findByUsername(username) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield pool.query(`SELECT * FROM users WHERE username = $1`, [
                username,
            ]);
            return result.rows[0] || null;
        });
    }
    update(id, user) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield pool.query(`UPDATE users SET firstName = $1, lastName = $2, phone = $3, email = $4, username = $5, password = $6 
       WHERE id = $7 RETURNING *`, [
                user.firstName,
                user.lastName,
                user.phone,
                user.email,
                user.username,
                user.password,
                id,
            ]);
            return result.rows[0] || null;
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield pool.query(`DELETE FROM users WHERE id = $1`, [id]);
        });
    }
}
exports.UserRepository = UserRepository;
