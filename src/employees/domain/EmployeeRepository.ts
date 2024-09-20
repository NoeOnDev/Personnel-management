import { Employee } from "./Employee";

export interface EmployeeRepository {
  findById(id: bigint): Promise<Employee | null>;
  findAll(): Promise<Employee[]>;
  findByUuid(uuid: string): Promise<Employee | null>;
  findByEmail(email: string): Promise<Employee | null>;
  save(employee: Employee): Promise<bigint>;
  update(employee: Employee): Promise<void>;
  delete(id: bigint): Promise<void>;
}
