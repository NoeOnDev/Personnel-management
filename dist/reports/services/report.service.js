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
exports.ReportService = void 0;
const report_repository_1 = require("../repositories/report.repository");
const customError_1 = require("../../_helper/customError");
class ReportService {
    constructor() {
        this.reportRepository = new report_repository_1.ReportRepository();
    }
    createReport(report) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.reportRepository.create(report);
        });
    }
    getReports() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.reportRepository.findAll();
        });
    }
    getReportById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const report = yield this.reportRepository.findById(id);
            if (!report) {
                throw new customError_1.CustomError("Report not found", 404);
            }
            return report;
        });
    }
    updateReport(id, report) {
        return __awaiter(this, void 0, void 0, function* () {
            const updatedReport = yield this.reportRepository.update(id, report);
            if (!updatedReport) {
                throw new customError_1.CustomError("Report not found", 404);
            }
            return updatedReport;
        });
    }
    deleteReport(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const report = yield this.reportRepository.findById(id);
            if (!report) {
                throw new customError_1.CustomError("Report not found", 404);
            }
            return this.reportRepository.delete(id);
        });
    }
}
exports.ReportService = ReportService;
