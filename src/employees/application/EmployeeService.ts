import { Employee } from "../domain/Employee";
import { EmployeeRepository } from "../domain/EmployeeRepository";

export class EmployeeService {
  constructor(private employeeRepository: EmployeeRepository) {}

  public async createEmployee(
    firstName: string,
    lastName: string,
    email: string,
    storeId: bigint,
    position: string | null = null,
    hireDate: Date | null = null
  ): Promise<Employee> {
    const newEmployee = new Employee(
      firstName,
      lastName,
      email,
      storeId,
      position,
      hireDate
    );

    const existingEmployee = await this.employeeRepository.findByUuid(
      newEmployee.uuid
    );
    if (existingEmployee) {
      throw new Error("UUID already exists");
    }

    const id = await this.employeeRepository.save(newEmployee);
    newEmployee.setId(id);
    return newEmployee;
  }

  public async getAllEmployees(): Promise<Employee[]> {
    return await this.employeeRepository.findAll();
  }

  public async getEmployeeById(id: bigint): Promise<Employee | null> {
    return await this.employeeRepository.findById(id);
  }

  public async getEmployeeByUuid(uuid: string): Promise<Employee | null> {
    return await this.employeeRepository.findByUuid(uuid);
  }

  public async getEmployeeByEmail(email: string): Promise<Employee | null> {
    return await this.employeeRepository.findByEmail(email);
  }

  public async updateEmployee(
    uuid: string,
    employeeData: Partial<Employee>
  ): Promise<void> {
    const employee = await this.employeeRepository.findByUuid(uuid);
    if (!employee) {
      throw new Error("Employee not found");
    }

    const updatedEmployee = new Employee(
      employeeData.firstName || employee.firstName,
      employeeData.lastName || employee.lastName,
      employeeData.email || employee.email,
      employeeData.storeId || employee.storeId,
      employeeData.position || employee.position,
      employeeData.hireDate || employee.hireDate,
      employee.id,
      employee.uuid,
      employee.createdAt,
      new Date()
    );
    await this.employeeRepository.update(updatedEmployee);
  }

  public async patchEmployee(
    uuid: string,
    employeeData: Partial<Employee>
  ): Promise<void> {
    const employee = await this.employeeRepository.findByUuid(uuid);
    if (!employee) {
      throw new Error("Employee not found");
    }

    const updatedEmployee = new Employee(
      employeeData.firstName || employee.firstName,
      employeeData.lastName || employee.lastName,
      employeeData.email || employee.email,
      employeeData.storeId || employee.storeId,
      employeeData.position || employee.position,
      employeeData.hireDate || employee.hireDate,
      employee.id,
      employee.uuid,
      employee.createdAt,
      new Date()
    );
    await this.employeeRepository.update(updatedEmployee);
  }

  public async deleteEmployee(uuid: string): Promise<void> {
    const employee = await this.employeeRepository.findByUuid(uuid);
    if (!employee) {
      throw new Error("Employee not found");
    }
    await this.employeeRepository.delete(employee.id);
  }
}
