import { Employee } from "../domain/Employee";

export const serializeEmployee = (employee: Employee) => ({
  id: employee.id.toString(),
  uuid: employee.uuid,
  firstName: employee.firstName,
  lastName: employee.lastName,
  email: employee.email,
  storeId: employee.storeId.toString(),
  position: employee.position,
  hireDate: employee.hireDate,
  createdAt: employee.createdAt,
  updatedAt: employee.updatedAt,
});
