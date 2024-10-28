"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const cors_1 = __importDefault(require("cors"));
const env_config_1 = __importDefault(require("./_config/env.config"));
const user_routes_1 = __importDefault(require("./users/http/routes/user.routes"));
const report_routes_1 = __importDefault(require("./reports/http/routes/report.routes"));
const db_connection_1 = require("./_helper/db.connection");
const app = (0, express_1.default)();
const port = env_config_1.default.port;
app.use((0, cors_1.default)());
app.use(express_1.default.json());
const limiter = (0, express_rate_limit_1.default)({
    windowMs: 15 * 60 * 1000,
    max: 100,
    message: "Too many requests from this IP, please try again after 15 minutes",
});
app.use(limiter);
app.use("/api/v1/users", user_routes_1.default);
app.use("/api/v1/reports", report_routes_1.default);
(0, db_connection_1.connectWithRetry)(10, 10000, () => {
    app.listen(port, () => {
        console.log(`Server running at http://localhost:${port} 🚀`);
    });
});
