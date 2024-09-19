import { User } from "./User";

export interface UserRepository {
  findById(id: bigint): Promise<User | null>;
  findByUuid(uuid: string): Promise<User | null>;
  findByUsername(username: string): Promise<User | null>;
  findByEmail(email: string): Promise<User | null>;
  save(user: User): Promise<bigint>;
  update(user: User): Promise<void>;
  delete(id: bigint): Promise<void>;
}