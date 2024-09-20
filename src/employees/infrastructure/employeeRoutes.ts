import { Router } from "express";
import { employeeController } from "./employeeDI";

const router = Router();

router.post(
  "/employees",
  employeeController.createEmployee.bind(employeeController)
);
router.get(
  "/employees",
  employeeController.getAllEmployees.bind(employeeController)
);
router.get(
  "/employees/:uuid",
  employeeController.getEmployeeByUuid.bind(employeeController)
);
router.put(
  "/employees/:uuid",
  employeeController.updateEmployee.bind(employeeController)
);
router.patch(
  "/employees/:uuid",
  employeeController.patchEmployee.bind(employeeController)
);
router.delete(
  "/employees/:uuid",
  employeeController.deleteEmployee.bind(employeeController)
);

export default router;
