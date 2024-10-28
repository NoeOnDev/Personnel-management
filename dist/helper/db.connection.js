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
exports.connectWithRetry = connectWithRetry;
const pg_1 = require("pg");
const db_config_1 = __importDefault(require("../_config/db.config"));
const pool = new pg_1.Pool(db_config_1.default);
function connectWithRetry(retries, delay, callback) {
    return __awaiter(this, void 0, void 0, function* () {
        for (let i = 0; i < retries; i++) {
            try {
                yield pool.connect();
                console.log("Database connection successful ✅");
                callback();
                return;
            }
            catch (error) {
                console.error(`Error connecting to the database (attempt ${i + 1} of ${retries}): ❗`, error);
                if (i < retries - 1) {
                    yield new Promise((res) => setTimeout(res, delay));
                }
            }
        }
        console.error("Could not connect to the database after multiple attempts. Exiting... ❌");
        process.exit(1);
    });
}
