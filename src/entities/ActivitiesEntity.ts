// ServiceEntity.ts
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { ServiceEntity } from "./ServiceEntity";

@Entity("activities")
export class ActivitiesEntity {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({ type: "varchar", length: 255 })
  nome: string;

  @Column({ type: "float" })
  custo: number;

  @ManyToOne(() => ServiceEntity, (service) => service.services)
  service: ServiceEntity;
}
