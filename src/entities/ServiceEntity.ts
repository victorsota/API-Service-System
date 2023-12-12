// ServiceEntity.ts
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { UserEntity } from "./UserEntity";
import { ActivitiesEntity } from "./ActivitiesEntity";

@Entity("services")
export class ServiceEntity {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({ type: "varchar", length: 255 })
  nome: string;

  @Column({ type: "varchar", length: 255 })
  bairro: string;

  @Column({ type: "varchar", length: 255 })
  cidade: string;

  @Column({ type: "varchar", length: 255 })
  estado: string;

  @Column({ type: "varchar", length: 255 })
  rua: string;

  @Column({ type: "varchar", length: 10 })
  numero: string;

  @Column({ type: "varchar", length: 255, nullable: true })
  complemento: string;

  @Column({ type: "boolean", default: true }) // Status padrão é true, ativo
  status: boolean;

  @ManyToOne(() => UserEntity, (user) => user.services)
  user: UserEntity;

  @OneToMany(() => ActivitiesEntity, (activities) => activities.service)
  services: ServiceEntity[];
}
