import { Router } from "express";
import {
  createReport,
  getReports,
  getReportById,
  updateReport,
  deleteReport,
} from "../controllers/report.controller";
import { validateRequest } from "../../../_middlewares/validation.middleware";
import authenticateJWT from "../../../_middlewares/auth.middleware";
import {
  createReportSchema,
  updateReportSchema,
} from "../validations/report.validation";

const reportRoutes = Router();

reportRoutes.post(
  "/",
  authenticateJWT,
  validateRequest(createReportSchema),
  createReport
);
reportRoutes.get("/", getReports);
reportRoutes.get("/:id", getReportById);
reportRoutes.put("/:id", validateRequest(updateReportSchema), updateReport);
reportRoutes.delete("/:id", deleteReport);

export default reportRoutes;
