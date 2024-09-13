import { UUID } from "./value-objects/UUID";
import { Email } from "./value-objects/Email";
import { PasswordHash } from "./value-objects/PasswordHash";
import { DomainException } from "./DomainException";

export class User {
  private readonly _id: number;
  private readonly _uuid: UUID;
  private _username: string;
  private _email: Email;
  private _passwordHash: PasswordHash;

  constructor(
    id: number,
    uuid: UUID,
    username: string,
    email: Email,
    passwordHash: PasswordHash
  ) {
    this._id = id;
    this._uuid = uuid;
    this._username = username;
    this._email = email;
    this._passwordHash = passwordHash;
  }

  get id(): number {
    return this._id;
  }

  get uuid(): UUID {
    return this._uuid;
  }

  get username(): string {
    return this._username;
  }

  get email(): Email {
    return this._email;
  }

  get passwordHash(): PasswordHash {
    return this._passwordHash;
  }

  changeUsername(newUsername: string): void {
    if (newUsername.length < 3) {
      throw new DomainException("Username must be at least 3 characters long");
    }
    this._username = newUsername;
  }

  changeEmail(newEmail: Email): void {
    this._email = newEmail;
  }

  changePassword(newPasswordHash: PasswordHash): void {
    this._passwordHash = newPasswordHash;
  }
}
