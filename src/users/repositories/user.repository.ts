import { Pool } from "pg";
import { User } from "../models/user.model";
import pgConfig from "../../_config/db.config";

const pool = new Pool(pgConfig);

export class UserRepository {
  async create(user: User): Promise<User> {
    const result = await pool.query(
      `INSERT INTO users (firstName, lastName, phone, email, username, password) 
       VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
      [
        user.firstName,
        user.lastName,
        user.phone,
        user.email,
        user.username,
        user.password,
      ]
    );
    return result.rows[0];
  }

  async findAll(): Promise<User[]> {
    const result = await pool.query(`SELECT * FROM users`);
    return result.rows;
  }

  async findById(id: number): Promise<User | null> {
    const result = await pool.query(`SELECT * FROM users WHERE id = $1`, [id]);
    return result.rows[0] || null;
  }

  async findByEmail(email: string): Promise<User | null> {
    const result = await pool.query(`SELECT * FROM users WHERE email = $1`, [
      email,
    ]);
    return result.rows[0] || null;
  }

  async findByUsername(username: string): Promise<User | null> {
    const result = await pool.query(`SELECT * FROM users WHERE username = $1`, [
      username,
    ]);
    return result.rows[0] || null;
  }

  async update(id: number, user: Partial<User>): Promise<User | null> {
    const result = await pool.query(
      `UPDATE users SET firstName = $1, lastName = $2, phone = $3, email = $4, username = $5, password = $6 
       WHERE id = $7 RETURNING *`,
      [
        user.firstName,
        user.lastName,
        user.phone,
        user.email,
        user.username,
        user.password,
        id,
      ]
    );
    return result.rows[0] || null;
  }

  async delete(id: number): Promise<void> {
    await pool.query(`DELETE FROM users WHERE id = $1`, [id]);
  }
}
