import bcrypt from "bcrypt";
import { PasswordHasher } from "../domain/PasswordHasher";

export class BcryptPasswordHasher implements PasswordHasher {
  private readonly saltRounds = 10;

  public async hash(password: string): Promise<string> {
    return await bcrypt.hash(password, this.saltRounds);
  }

  public async compare(password: string, hash: string): Promise<boolean> {
    return await bcrypt.compare(password, hash);
  }
}
