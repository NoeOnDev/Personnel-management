import { Store } from "../domain/Store";
import { StoreRepository } from "../domain/StoreRepository";

export class StoreService {
  constructor(private storeRepository: StoreRepository) {}

  public async createStore(
    name: string,
    address: string,
    phone: string | null,
    userId: bigint
  ): Promise<Store> {
    const newStore = new Store(name, address, phone, userId);

    const existingStore = await this.storeRepository.findByUuid(newStore.uuid);
    if (existingStore) {
      throw new Error("UUID already exists");
    }

    const id = await this.storeRepository.save(newStore);
    newStore.setId(id);
    return newStore;
  }

  public async getAllStores(): Promise<Store[]> {
    return await this.storeRepository.findAll();
  }

  public async getStoreById(id: bigint): Promise<Store | null> {
    return await this.storeRepository.findById(id);
  }

  public async getStoreByUuid(uuid: string): Promise<Store | null> {
    return await this.storeRepository.findByUuid(uuid);
  }

  public async getStoreByName(name: string): Promise<Store | null> {
    return await this.storeRepository.findByName(name);
  }

  public async updateStore(
    uuid: string,
    storeData: Partial<Store>
  ): Promise<void> {
    const store = await this.storeRepository.findByUuid(uuid);
    if (!store) {
      throw new Error("Store not found");
    }

    const updatedStore = new Store(
      storeData.name || store.name,
      storeData.address || store.address,
      storeData.phone || store.phone,
      storeData.userId || store.userId,
      store.id,
      store.uuid,
      store.createdAt,
      new Date()
    );
    await this.storeRepository.update(updatedStore);
  }

  public async patchStore(
    uuid: string,
    storeData: Partial<Store>
  ): Promise<void> {
    const store = await this.storeRepository.findByUuid(uuid);
    if (!store) {
      throw new Error("Store not found");
    }

    const updatedStore = new Store(
      storeData.name || store.name,
      storeData.address || store.address,
      storeData.phone || store.phone,
      storeData.userId || store.userId,
      store.id,
      store.uuid,
      store.createdAt,
      new Date()
    );
    await this.storeRepository.update(updatedStore);
  }

  public async deleteStore(uuid: string): Promise<void> {
    const store = await this.storeRepository.findByUuid(uuid);
    if (!store) {
      throw new Error("Store not found");
    }
    await this.storeRepository.delete(store.id);
  }
}
