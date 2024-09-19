import { v4 as uuidv4 } from "uuid";

export class User {
  public readonly id: bigint;
  public readonly uuid: string;
  public username: string;
  public email: string;
  public passwordHash: string;
  public readonly createdAt: Date;
  public updatedAt: Date;

  constructor(username: string, email: string, passwordHash: string) {
    this.id = BigInt(0);
    this.uuid = uuidv4();
    this.username = username;
    this.email = email;
    this.passwordHash = passwordHash;
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }

  public validateUniqueness(existingUsers: User[]): void {
    if (existingUsers.some((user) => user.uuid === this.uuid)) {
      throw new Error("UUID already exists");
    }
  }
}
