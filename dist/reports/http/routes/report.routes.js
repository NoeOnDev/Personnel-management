"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const report_controller_1 = require("../controllers/report.controller");
const validation_middleware_1 = require("../../../_middlewares/validation.middleware");
const auth_middleware_1 = __importDefault(require("../../../_middlewares/auth.middleware"));
const report_validation_1 = require("../validations/report.validation");
const reportRoutes = (0, express_1.Router)();
reportRoutes.post("/", auth_middleware_1.default, (0, validation_middleware_1.validateRequest)(report_validation_1.createReportSchema), report_controller_1.createReport);
reportRoutes.get("/", report_controller_1.getReports);
reportRoutes.get("/:id", report_controller_1.getReportById);
reportRoutes.put("/:id", (0, validation_middleware_1.validateRequest)(report_validation_1.updateReportSchema), report_controller_1.updateReport);
reportRoutes.delete("/:id", report_controller_1.deleteReport);
exports.default = reportRoutes;
