import { v4 as uuidv4 } from "uuid";

export class Store {
  public id: bigint;
  public readonly uuid: string;
  public name: string;
  public address: string;
  public phone: string | null;
  public userId: bigint;
  public readonly createdAt: Date;
  public updatedAt: Date;

  constructor(
    name: string,
    address: string,
    phone: string | null,
    userId: bigint,
    id: bigint = BigInt(0),
    uuid: string = uuidv4(),
    createdAt: Date = new Date(),
    updatedAt: Date = new Date()
  ) {
    this.id = id;
    this.uuid = uuid;
    this.name = name;
    this.address = address;
    this.phone = phone;
    this.userId = userId;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  public setId(id: bigint): void {
    this.id = id;
  }
}
