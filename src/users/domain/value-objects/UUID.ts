import { v4 as uuidv4, validate as uuidValidate } from "uuid";

export class UUID {
  private _value: string;

  constructor(value?: string) {
    if (value && !uuidValidate(value)) {
      throw new Error("Invalid UUID");
    }
    this._value = value || uuidv4();
  }

  get value(): string {
    return this._value;
  }
}
