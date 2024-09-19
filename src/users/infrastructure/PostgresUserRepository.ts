import { Pool } from "pg";
import { User } from "../domain/User";
import { UserRepository } from "../domain/UserRepository";

export class PostgresUserRepository implements UserRepository {
  constructor(private pool: Pool) {}

  public async findById(id: bigint): Promise<User | null> {
    const result = await this.pool.query("SELECT * FROM users WHERE id = $1", [
      id,
    ]);
    return result.rows.length ? this.mapRowToUser(result.rows[0]) : null;
  }

  public async findByUuid(uuid: string): Promise<User | null> {
    const result = await this.pool.query(
      "SELECT * FROM users WHERE uuid = $1",
      [uuid]
    );
    return result.rows.length ? this.mapRowToUser(result.rows[0]) : null;
  }

  public async findByUsername(username: string): Promise<User | null> {
    const result = await this.pool.query(
      "SELECT * FROM users WHERE username = $1",
      [username]
    );
    return result.rows.length ? this.mapRowToUser(result.rows[0]) : null;
  }

  public async findByEmail(email: string): Promise<User | null> {
    const result = await this.pool.query(
      "SELECT * FROM users WHERE email = $1",
      [email]
    );
    return result.rows.length ? this.mapRowToUser(result.rows[0]) : null;
  }

  public async save(user: User): Promise<bigint> {
    const result = await this.pool.query(
      "INSERT INTO users (uuid, username, email, password_hash, created_at, updated_at) VALUES ($1, $2, $3, $4, $5, $6) RETURNING id",
      [
        user.uuid,
        user.username,
        user.email,
        user.passwordHash,
        user.createdAt,
        user.updatedAt,
      ]
    );
    return BigInt(result.rows[0].id);
  }

  public async update(user: User): Promise<void> {
    await this.pool.query(
      "UPDATE users SET username = $1, email = $2, password_hash = $3, updated_at = $4 WHERE uuid = $5",
      [user.username, user.email, user.passwordHash, user.updatedAt, user.uuid]
    );
  }

  public async delete(id: bigint): Promise<void> {
    await this.pool.query("DELETE FROM users WHERE id = $1", [id]);
  }

  private mapRowToUser(row: any): User {
    return new User(
      row.username,
      row.email,
      row.password_hash,
      BigInt(row.id),
      row.uuid,
      row.created_at,
      row.updated_at
    );
  }
}
