import { Request, Response } from "express";
import { EmployeeService } from "../application/EmployeeService";
import { serializeEmployee } from "./serializeEmployee";

type AppError = {
  message: string;
};

export class EmployeeController {
  constructor(private employeeService: EmployeeService) {}

  private isAppError(error: unknown): error is AppError {
    return (
      typeof error === "object" &&
      error !== null &&
      "message" in error &&
      typeof (error as AppError).message === "string"
    );
  }

  public async createEmployee(req: Request, res: Response): Promise<void> {
    try {
      const { firstName, lastName, email, storeId, position, hireDate } =
        req.body;
      const employee = await this.employeeService.createEmployee(
        firstName,
        lastName,
        email,
        storeId,
        position,
        hireDate
      );
      res.status(201).json(serializeEmployee(employee));
    } catch (error) {
      if (this.isAppError(error)) {
        res.status(400).json({ error: error.message });
      } else {
        res.status(500).json({ error: "An unexpected error occurred" });
      }
    }
  }

  public async getEmployeeByUuid(req: Request, res: Response): Promise<void> {
    try {
      const { uuid } = req.params;
      const employee = await this.employeeService.getEmployeeByUuid(uuid);
      if (employee) {
        res.status(200).json(serializeEmployee(employee));
      } else {
        res.status(404).json({ error: "Employee not found" });
      }
    } catch (error) {
      if (this.isAppError(error)) {
        res.status(400).json({ error: error.message });
      } else {
        res.status(500).json({ error: "An unexpected error occurred" });
      }
    }
  }

  public async getEmployeeByEmail(req: Request, res: Response): Promise<void> {
    try {
      const { email } = req.params;
      const employee = await this.employeeService.getEmployeeByEmail(email);
      if (employee) {
        res.status(200).json(serializeEmployee(employee));
      } else {
        res.status(404).json({ error: "Employee not found" });
      }
    } catch (error) {
      if (this.isAppError(error)) {
        res.status(400).json({ error: error.message });
      } else {
        res.status(500).json({ error: "An unexpected error occurred" });
      }
    }
  }

  public async updateEmployee(req: Request, res: Response): Promise<void> {
    try {
      const { uuid } = req.params;
      await this.employeeService.updateEmployee(uuid, req.body);
      const updatedEmployee = await this.employeeService.getEmployeeByUuid(
        uuid
      );
      if (updatedEmployee) {
        res.status(200).json(serializeEmployee(updatedEmployee));
      } else {
        res.status(404).json({ error: "Employee not found" });
      }
    } catch (error) {
      if (this.isAppError(error)) {
        res.status(400).json({ error: error.message });
      } else {
        res.status(500).json({ error: "An unexpected error occurred" });
      }
    }
  }

  public async patchEmployee(req: Request, res: Response): Promise<void> {
    try {
      const { uuid } = req.params;
      await this.employeeService.patchEmployee(uuid, req.body);
      const updatedEmployee = await this.employeeService.getEmployeeByUuid(
        uuid
      );
      if (updatedEmployee) {
        res.status(200).json(serializeEmployee(updatedEmployee));
      } else {
        res.status(404).json({ error: "Employee not found" });
      }
    } catch (error) {
      if (this.isAppError(error)) {
        res.status(400).json({ error: error.message });
      } else {
        res.status(500).json({ error: "An unexpected error occurred" });
      }
    }
  }

  public async deleteEmployee(req: Request, res: Response): Promise<void> {
    try {
      const { uuid } = req.params;
      await this.employeeService.deleteEmployee(uuid);
      res.status(200).json({ message: "Employee deleted successfully" });
    } catch (error) {
      if (this.isAppError(error)) {
        res.status(400).json({ error: error.message });
      } else {
        res.status(500).json({ error: "An unexpected error occurred" });
      }
    }
  }
}
