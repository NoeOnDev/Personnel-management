import { v4 as uuidv4, validate as uuidValidate } from "uuid";
import { DomainException } from "./DomainException";

export class UUID {
  private readonly _value: string;

  constructor(value?: string) {
    if (value && !uuidValidate(value)) {
      throw new DomainException("Invalid UUID");
    }
    this._value = value || uuidv4();
  }

  get value(): string {
    return this._value;
  }
}

export class Email {
  private readonly _value: string;

  constructor(value: string) {
    if (!Email.isValid(value)) {
      throw new DomainException("Invalid email address");
    }
    this._value = value;
  }

  get value(): string {
    return this._value;
  }

  static isValid(email: string): boolean {
    const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return re.test(email);
  }
}

export class PasswordHash {
  private readonly _value: string;

  constructor(value: string) {
    if (value.length < 8) {
      throw new DomainException(
        "Password hash must be at least 8 characters long"
      );
    }
    this._value = value;
  }

  get value(): string {
    return this._value;
  }
}
