import { User } from "../domain/User";
import { UserRepository } from "../domain/UserRepository";

export class UserService {
  constructor(private userRepository: UserRepository) {}

  public async createUser(
    username: string,
    email: string,
    passwordHash: string
  ): Promise<User> {
    const newUser = new User(username, email, passwordHash);

    const existingUsers = await this.userRepository.findByUuid(newUser.uuid);
    if (existingUsers) {
      throw new Error("UUID already exists");
    }

    await this.userRepository.save(newUser);
    return newUser;
  }

  public async getUserById(id: bigint): Promise<User | null> {
    return await this.userRepository.findById(id);
  }

  public async getUserByUuid(uuid: string): Promise<User | null> {
    return await this.userRepository.findByUuid(uuid);
  }

  public async getUserByUsername(username: string): Promise<User | null> {
    return await this.userRepository.findByUsername(username);
  }

  public async getUserByEmail(email: string): Promise<User | null> {
    return await this.userRepository.findByEmail(email);
  }

  public async updateUser(user: User): Promise<void> {
    user.updatedAt = new Date();
    await this.userRepository.update(user);
  }

  public async deleteUser(id: bigint): Promise<void> {
    await this.userRepository.delete(id);
  }
}
