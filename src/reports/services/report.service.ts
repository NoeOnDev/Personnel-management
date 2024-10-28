import { Report } from "../models/report.model";
import { ReportRepository } from "../repositories/report.repository";
import { CustomError } from "../../_helper/customError";

export class ReportService {
  private reportRepository: ReportRepository;

  constructor() {
    this.reportRepository = new ReportRepository();
  }

  async createReport(report: Report): Promise<Report> {
    return this.reportRepository.create(report);
  }

  async getReports(): Promise<Report[]> {
    return this.reportRepository.findAll();
  }

  async getReportById(id: number): Promise<Report | null> {
    const report = await this.reportRepository.findById(id);
    if (!report) {
      throw new CustomError("Report not found", 404);
    }
    return report;
  }

  async updateReport(
    id: number,
    report: Partial<Report>
  ): Promise<Report | null> {
    const updatedReport = await this.reportRepository.update(id, report);
    if (!updatedReport) {
      throw new CustomError("Report not found", 404);
    }
    return updatedReport;
  }

  async deleteReport(id: number): Promise<void> {
    const report = await this.reportRepository.findById(id);
    if (!report) {
      throw new CustomError("Report not found", 404);
    }
    return this.reportRepository.delete(id);
  }
}
