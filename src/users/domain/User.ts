import { v4 as uuidv4 } from "uuid";

export class User {
  public id: bigint;
  public readonly uuid: string;
  public username: string;
  public email: string;
  public passwordHash: string;
  public readonly createdAt: Date;
  public updatedAt: Date;

  constructor(
    username: string,
    email: string,
    passwordHash: string,
    id: bigint = BigInt(0),
    uuid: string = uuidv4(),
    createdAt: Date = new Date(),
    updatedAt: Date = new Date()
  ) {
    this.id = id;
    this.uuid = uuid;
    this.username = username;
    this.email = email;
    this.passwordHash = passwordHash;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  public setId(id: bigint): void {
    this.id = id;
  }

  public validateUniqueness(existingUsers: User[]): void {
    if (existingUsers.some((user) => user.uuid === this.uuid)) {
      throw new Error("UUID already exists");
    }
  }
}
