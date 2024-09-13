export class PasswordHash {
  private _value: string;

  constructor(value: string) {
    if (value.length < 8) {
      throw new Error("Password must be at least 8 characters long");
    }
    this._value = value;
  }

  get value(): string {
    return this._value;
  }
}
