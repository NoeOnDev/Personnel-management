import { Pool } from "pg";
import { Report } from "../models/report.model";
import pgConfig from "../../_config/db.config";

const pool = new Pool(pgConfig);

export class ReportRepository {
  async create(report: Report): Promise<Report> {
    const result = await pool.query(
      `INSERT INTO reports (title, description, userId) 
       VALUES ($1, $2, $3) RETURNING *`,
      [report.title, report.description, report.userId]
    );
    return result.rows[0];
  }

  async findAll(): Promise<Report[]> {
    const result = await pool.query(`SELECT * FROM reports`);
    return result.rows;
  }

  async findById(id: number): Promise<Report | null> {
    const result = await pool.query(`SELECT * FROM reports WHERE id = $1`, [
      id,
    ]);
    return result.rows[0] || null;
  }

  async update(id: number, report: Partial<Report>): Promise<Report | null> {
    const result = await pool.query(
      `UPDATE reports SET title = $1, description = $2, userId = $3 
       WHERE id = $4 RETURNING *`,
      [report.title, report.description, report.userId, id]
    );
    return result.rows[0] || null;
  }

  async delete(id: number): Promise<void> {
    await pool.query(`DELETE FROM reports WHERE id = $1`, [id]);
  }
}
