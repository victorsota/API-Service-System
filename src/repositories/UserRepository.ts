import { AppDataSource } from "../data-source";
import { UserEntity } from "../entities/User";

export const UserRepository = AppDataSource.getRepository(UserEntity);
