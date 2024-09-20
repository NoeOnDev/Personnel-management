import { Store } from "./Store";

export interface StoreRepository {
  findById(id: bigint): Promise<Store | null>;
  findAll(): Promise<Store[]>;
  findByUuid(uuid: string): Promise<Store | null>;
  findByName(name: string): Promise<Store | null>;
  save(store: Store): Promise<bigint>;
  update(store: Store): Promise<void>;
  delete(id: bigint): Promise<void>;
}
