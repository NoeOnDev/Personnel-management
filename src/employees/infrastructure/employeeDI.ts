import { PostgresEmployeesRepository } from "./PostgresEmployeesRepository";
import { EmployeeService } from "../application/EmployeeService";
import { EmployeeController } from "./EmployeeController";
import { pool } from "../../config/dbConnection";

const employeeRepository = new PostgresEmployeesRepository(pool);
const employeeService = new EmployeeService(employeeRepository);
const employeeController = new EmployeeController(employeeService);

export { employeeController };
