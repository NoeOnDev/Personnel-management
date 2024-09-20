import { User } from "../domain/User";
import { UserRepository } from "../domain/UserRepository";
import { PasswordHasher } from "../domain/PasswordHasher";

export class UserService {
  constructor(
    private userRepository: UserRepository,
    private passwordHasher: PasswordHasher
  ) {}

  public async createUser(
    username: string,
    email: string,
    password: string
  ): Promise<User> {
    const passwordHash = await this.passwordHasher.hash(password);
    const newUser = new User(username, email, passwordHash);

    const existingUsers = await this.userRepository.findByUuid(newUser.uuid);
    if (existingUsers) {
      throw new Error("UUID already exists");
    }

    const id = await this.userRepository.save(newUser);
    newUser.setId(id);
    return newUser;
  }

  public async getAllUsers(): Promise<User[]> {
    return await this.userRepository.findAll();
  }

  public async getUserById(id: bigint): Promise<User | null> {
    return await this.userRepository.findById(id);
  }

  public async getUserByUuid(uuid: string): Promise<User | null> {
    return await this.userRepository.findByUuid(uuid);
  }

  public async updateUser(
    uuid: string,
    userData: Partial<User>
  ): Promise<void> {
    const user = await this.userRepository.findByUuid(uuid);
    if (!user) {
      throw new Error("User not found");
    }

    let passwordHash = user.passwordHash;
    if (userData.passwordHash) {
      passwordHash = await this.passwordHasher.hash(userData.passwordHash);
    }

    const updatedUser = new User(
      userData.username || user.username,
      userData.email || user.email,
      passwordHash,
      user.id,
      user.uuid,
      user.createdAt,
      new Date()
    );
    await this.userRepository.update(updatedUser);
  }

  public async patchUser(uuid: string, userData: Partial<User>): Promise<void> {
    const user = await this.userRepository.findByUuid(uuid);
    if (!user) {
      throw new Error("User not found");
    }

    if (userData.passwordHash) {
      userData.passwordHash = await this.passwordHasher.hash(
        userData.passwordHash
      );
    }

    const updatedUser = new User(
      userData.username || user.username,
      userData.email || user.email,
      userData.passwordHash || user.passwordHash,
      user.id,
      user.uuid,
      user.createdAt,
      new Date()
    );
    await this.userRepository.update(updatedUser);
  }

  public async deleteUser(uuid: string): Promise<void> {
    const user = await this.userRepository.findByUuid(uuid);
    if (!user) {
      throw new Error("User not found");
    }
    await this.userRepository.delete(user.id);
  }
}
