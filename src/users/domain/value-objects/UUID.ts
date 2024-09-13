import { v4 as uuidv4, validate as uuidValidate } from "uuid";
import { DomainException } from "../DomainException";

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
