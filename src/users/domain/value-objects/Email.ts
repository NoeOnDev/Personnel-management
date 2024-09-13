import { DomainException } from "../DomainException";

export class Email {
  private readonly _value: string;
  private static allowedDomains: string[] = ["example.com", "domain.com"];
  private static blockedDomains: string[] = ["blocked.com"];

  constructor(value: string) {
    if (!Email.isValid(value)) {
      throw new DomainException("Invalid email address");
    }
    if (!Email.isAllowedDomain(value)) {
      throw new DomainException("Email domain is not allowed");
    }
    if (Email.isBlockedDomain(value)) {
      throw new DomainException("Email domain is blocked");
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

  static isAllowedDomain(email: string): boolean {
    const domain = email.split("@")[1];
    return this.allowedDomains.includes(domain);
  }

  static isBlockedDomain(email: string): boolean {
    const domain = email.split("@")[1];
    return this.blockedDomains.includes(domain);
  }
}
