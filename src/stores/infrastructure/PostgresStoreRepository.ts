import { Pool } from "pg";
import { Store } from "../domain/Store";
import { StoreRepository } from "../domain/StoreRepository";

export class PostgresStoreRepository implements StoreRepository {
  constructor(private pool: Pool) {}

  public async findAll(): Promise<Store[]> {
    const result = await this.pool.query("SELECT * FROM stores");
    return result.rows.map((row) => this.mapRowToStore(row));
  }

  public async findById(id: bigint): Promise<Store | null> {
    const result = await this.pool.query("SELECT * FROM stores WHERE id = $1", [
      id,
    ]);
    return result.rows.length ? this.mapRowToStore(result.rows[0]) : null;
  }

  public async findByUuid(uuid: string): Promise<Store | null> {
    const result = await this.pool.query(
      "SELECT * FROM stores WHERE uuid = $1",
      [uuid]
    );
    return result.rows.length ? this.mapRowToStore(result.rows[0]) : null;
  }

  public async findByName(name: string): Promise<Store | null> {
    const result = await this.pool.query(
      "SELECT * FROM stores WHERE name = $1",
      [name]
    );
    return result.rows.length ? this.mapRowToStore(result.rows[0]) : null;
  }

  public async save(store: Store): Promise<bigint> {
    const result = await this.pool.query(
      "INSERT INTO stores (uuid, name, address, phone, user_id, created_at, updated_at) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING id",
      [
        store.uuid,
        store.name,
        store.address,
        store.phone,
        store.userId,
        store.createdAt,
        store.updatedAt,
      ]
    );
    return BigInt(result.rows[0].id);
  }

  public async update(store: Store): Promise<void> {
    await this.pool.query(
      "UPDATE stores SET name = $1, address = $2, phone = $3, user_id = $4, updated_at = $5 WHERE uuid = $6",
      [
        store.name,
        store.address,
        store.phone,
        store.userId,
        store.updatedAt,
        store.uuid,
      ]
    );
  }

  public async delete(id: bigint): Promise<void> {
    await this.pool.query("DELETE FROM stores WHERE id = $1", [id]);
  }

  private mapRowToStore(row: any): Store {
    return new Store(
      row.name,
      row.address,
      row.phone,
      BigInt(row.user_id),
      BigInt(row.id),
      row.uuid,
      row.created_at,
      row.updated_at
    );
  }
}
