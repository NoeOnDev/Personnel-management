import { Pool } from "pg";
import { Employee } from "../domain/Employee";
import { EmployeeRepository } from "../domain/EmployeeRepository";

export class PostgresEmployeesRepository implements EmployeeRepository {
  constructor(private pool: Pool) {}

  public async findById(id: bigint): Promise<Employee | null> {
    const result = await this.pool.query(
      "SELECT * FROM employees WHERE id = $1",
      [id]
    );
    if (result.rows.length === 0) {
      return null;
    }
    return this.mapRowToEmployee(result.rows[0]);
  }

  public async findByUuid(uuid: string): Promise<Employee | null> {
    const result = await this.pool.query(
      "SELECT * FROM employees WHERE uuid = $1",
      [uuid]
    );
    if (result.rows.length === 0) {
      return null;
    }
    return this.mapRowToEmployee(result.rows[0]);
  }

  public async findByEmail(email: string): Promise<Employee | null> {
    const result = await this.pool.query(
      "SELECT * FROM employees WHERE email = $1",
      [email]
    );
    if (result.rows.length === 0) {
      return null;
    }
    return this.mapRowToEmployee(result.rows[0]);
  }

  public async save(employee: Employee): Promise<bigint> {
    const result = await this.pool.query(
      `INSERT INTO employees (uuid, first_name, last_name, email, store_id, position, hire_date, created_at, updated_at)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING id`,
      [
        employee.uuid,
        employee.firstName,
        employee.lastName,
        employee.email,
        employee.storeId,
        employee.position,
        employee.hireDate,
        employee.createdAt,
        employee.updatedAt,
      ]
    );
    return BigInt(result.rows[0].id);
  }

  public async update(employee: Employee): Promise<void> {
    await this.pool.query(
      `UPDATE employees SET first_name = $1, last_name = $2, email = $3, store_id = $4, position = $5, hire_date = $6, updated_at = $7 WHERE id = $8`,
      [
        employee.firstName,
        employee.lastName,
        employee.email,
        employee.storeId,
        employee.position,
        employee.hireDate,
        employee.updatedAt,
        employee.id,
      ]
    );
  }

  public async delete(id: bigint): Promise<void> {
    await this.pool.query("DELETE FROM employees WHERE id = $1", [id]);
  }

  private mapRowToEmployee(row: any): Employee {
    return new Employee(
      row.first_name,
      row.last_name,
      row.email,
      BigInt(row.store_id),
      row.position,
      row.hire_date,
      BigInt(row.id),
      row.uuid,
      row.created_at,
      row.updated_at
    );
  }
}
