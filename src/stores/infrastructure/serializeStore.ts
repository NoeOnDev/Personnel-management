import { Store } from "../domain/Store";

export const serializeStore = (store: Store) => ({
  id: store.id.toString(),
  uuid: store.uuid,
  name: store.name,
  address: store.address,
  phone: store.phone,
  userId: store.userId.toString(),
  createdAt: store.createdAt,
  updatedAt: store.updatedAt,
});
