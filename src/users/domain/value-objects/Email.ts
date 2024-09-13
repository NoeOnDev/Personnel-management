export class Email {
  private _value: string;

  constructor(value: string) {
    if (!this.validateEmail(value)) {
      throw new Error("Invalid email address");
    }
    this._value = value;
  }

  get value(): string {
    return this._value;
  }

  private validateEmail(email: string): boolean {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  }
}
