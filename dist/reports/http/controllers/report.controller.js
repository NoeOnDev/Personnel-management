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
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteReport = exports.updateReport = exports.getReportById = exports.getReports = exports.createReport = void 0;
const report_service_1 = require("../../services/report.service");
const customError_1 = require("../../../_helper/customError");
const reportService = new report_service_1.ReportService();
const createReport = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const { title, description } = req.body;
        const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
        console.log(userId);
        if (!userId) {
            throw new customError_1.CustomError("User ID is missing from token", 401);
        }
        const report = yield reportService.createReport({
            title,
            description,
            userId,
        });
        res.status(201).json(report);
    }
    catch (error) {
        if (error instanceof customError_1.CustomError) {
            res.status(error.statusCode).json({ message: error.message });
        }
        else {
            res.status(500).json({ message: "An unknown error occurred" });
        }
    }
});
exports.createReport = createReport;
const getReports = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const reports = yield reportService.getReports();
    res.status(200).json(reports);
});
exports.getReports = getReports;
const getReportById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const report = yield reportService.getReportById(Number(req.params.id));
        res.status(200).json(report);
    }
    catch (error) {
        if (error instanceof customError_1.CustomError) {
            res.status(error.statusCode).json({ message: error.message });
        }
        else {
            res.status(500).json({ message: "An unknown error occurred" });
        }
    }
});
exports.getReportById = getReportById;
const updateReport = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const report = yield reportService.updateReport(Number(req.params.id), req.body);
        res.status(200).json(report);
    }
    catch (error) {
        if (error instanceof customError_1.CustomError) {
            res.status(error.statusCode).json({ message: error.message });
        }
        else {
            res.status(500).json({ message: "An unknown error occurred" });
        }
    }
});
exports.updateReport = updateReport;
const deleteReport = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield reportService.deleteReport(Number(req.params.id));
        res.status(204).send();
    }
    catch (error) {
        if (error instanceof customError_1.CustomError) {
            res.status(error.statusCode).json({ message: error.message });
        }
        else {
            res.status(500).json({ message: "An unknown error occurred" });
        }
    }
});
exports.deleteReport = deleteReport;
