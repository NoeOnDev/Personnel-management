import { DomainException } from "../DomainException";

export class PasswordHash {
  private readonly _value: string;

  constructor(value: string) {
    if (value.length < 8) {
      throw new DomainException(
        "Password hash must be at least 8 characters long"
      );
    }
    if (!this.isSecure(value)) {
      throw new DomainException("Password is not secure enough");
    }
    this._value = value;
  }

  get value(): string {
    return this._value;
  }

  private isSecure(password: string): boolean {
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumbers = /\d/.test(password);
    const hasNonalphas = /\W/.test(password);
    return hasUpperCase && hasLowerCase && hasNumbers && hasNonalphas;
  }
}
