import { AppDataSource } from "../data-source";
import { ServiceEntity } from "../entities/ServiceEntity";

export const ServiceRepository = AppDataSource.getRepository(ServiceEntity);
