import { AppDataSource } from "../data-source";
import { ActivitiesEntity } from "../entities/ActivitiesEntity";

export const ActivityRepository = AppDataSource.getRepository(ActivitiesEntity);
