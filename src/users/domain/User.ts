import { v4 as uuidv4 } from "uuid";

export class User {
  private _id: number;
  private _uuid: string;
  private _username: string;
  private _email: string;
  private _passwordHash: string;

  constructor(
    id: number,
    username: string,
    email: string,
    passwordHash: string
  ) {
    this._id = id;
    this._uuid = uuidv4();
    this._username = username;
    this._email = email;
    this._passwordHash = passwordHash;
  }

  get id(): number {
    return this._id;
  }

  get uuid(): string {
    return this._uuid;
  }

  get username(): string {
    return this._username;
  }

  get email(): string {
    return this._email;
  }

  get passwordHash(): string {
    return this._passwordHash;
  }

  set id(value: number) {
    this._id = value;
  }

  set uuid(value: string) {
    this._uuid = value;
  }

  set username(value: string) {
    this._username = value;
  }

  set email(value: string) {
    this._email = value;
  }

  set passwordHash(value: string) {
    this._passwordHash = value;
  }
}
