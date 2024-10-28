import { Request, Response } from "express";
import { ReportService } from "../../services/report.service";
import { CustomError } from "../../../_helper/customError";
import { AuthRequest } from "../../../_middlewares/auth.middleware";

const reportService = new ReportService();

export const createReport = async (req: AuthRequest, res: Response) => {
  try {
    const { title, description } = req.body;
    const userId = req.user?.id;
    console.log(userId);
    if (!userId) {
      throw new CustomError("User ID is missing from token", 401);
    }

    const report = await reportService.createReport({
      title,
      description,
      userId,
    });
    res.status(201).json(report);
  } catch (error) {
    if (error instanceof CustomError) {
      res.status(error.statusCode).json({ message: error.message });
    } else {
      res.status(500).json({ message: "An unknown error occurred" });
    }
  }
};

export const getReports = async (_req: Request, res: Response) => {
  const reports = await reportService.getReports();
  res.status(200).json(reports);
};

export const getReportById = async (req: Request, res: Response) => {
  try {
    const report = await reportService.getReportById(Number(req.params.id));
    res.status(200).json(report);
  } catch (error) {
    if (error instanceof CustomError) {
      res.status(error.statusCode).json({ message: error.message });
    } else {
      res.status(500).json({ message: "An unknown error occurred" });
    }
  }
};

export const updateReport = async (req: Request, res: Response) => {
  try {
    const report = await reportService.updateReport(
      Number(req.params.id),
      req.body
    );
    res.status(200).json(report);
  } catch (error) {
    if (error instanceof CustomError) {
      res.status(error.statusCode).json({ message: error.message });
    } else {
      res.status(500).json({ message: "An unknown error occurred" });
    }
  }
};

export const deleteReport = async (req: Request, res: Response) => {
  try {
    await reportService.deleteReport(Number(req.params.id));
    res.status(204).send();
  } catch (error) {
    if (error instanceof CustomError) {
      res.status(error.statusCode).json({ message: error.message });
    } else {
      res.status(500).json({ message: "An unknown error occurred" });
    }
  }
};
