import { v4 as uuidv4 } from "uuid";

export class Employee {
  public id: bigint;
  public readonly uuid: string;
  public firstName: string;
  public lastName: string;
  public email: string;
  public storeId: bigint;
  public position: string | null;
  public hireDate: Date | null;
  public readonly createdAt: Date;
  public updatedAt: Date;

  constructor(
    firstName: string,
    lastName: string,
    email: string,
    storeId: bigint,
    position: string | null = null,
    hireDate: Date | null = null,
    id: bigint = BigInt(0),
    uuid: string = uuidv4(),
    createdAt: Date = new Date(),
    updatedAt: Date = new Date()
  ) {
    this.id = id;
    this.uuid = uuid;
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.storeId = storeId;
    this.position = position;
    this.hireDate = hireDate;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  public setId(id: bigint): void {
    this.id = id;
  }
}
