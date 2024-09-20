import { User } from "./User";

export interface UserRepository {
  findById(id: bigint): Promise<User | null>;
  findAll(): Promise<User[]>;
  findByUuid(uuid: string): Promise<User | null>;
  save(user: User): Promise<bigint>;
  update(user: User): Promise<void>;
  delete(id: bigint): Promise<void>;
}