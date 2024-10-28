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
exports.ReportRepository = void 0;
const pg_1 = require("pg");
const db_config_1 = __importDefault(require("../../_config/db.config"));
const pool = new pg_1.Pool(db_config_1.default);
class ReportRepository {
    create(report) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield pool.query(`INSERT INTO reports (title, description, userId) 
       VALUES ($1, $2, $3) RETURNING *`, [report.title, report.description, report.userId]);
            return result.rows[0];
        });
    }
    findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield pool.query(`SELECT * FROM reports`);
            return result.rows;
        });
    }
    findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield pool.query(`SELECT * FROM reports WHERE id = $1`, [
                id,
            ]);
            return result.rows[0] || null;
        });
    }
    update(id, report) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield pool.query(`UPDATE reports SET title = $1, description = $2, userId = $3 
       WHERE id = $4 RETURNING *`, [report.title, report.description, report.userId, id]);
            return result.rows[0] || null;
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield pool.query(`DELETE FROM reports WHERE id = $1`, [id]);
        });
    }
}
exports.ReportRepository = ReportRepository;
