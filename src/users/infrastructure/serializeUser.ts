import { User } from "../domain/User";

export const serializeUser = (user: User) => ({
  id: user.id.toString(),
  uuid: user.uuid,
  username: user.username,
  email: user.email,
  passwordHash: user.passwordHash,
  createdAt: user.createdAt,
  updatedAt: user.updatedAt,
});
