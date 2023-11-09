import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
} from "typeorm";

@Entity("logs")
export class Log {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "varchar" })
  path: string;

  @Column({ type: "varchar" })
  method: string;

  @CreateDateColumn({ type: "timestamp" })
  created_at: Date;

  @Column({ type: "varchar" })
  params: string;

  @Column({
    type: "text",
    transformer: {
      to: (value: Record<string, any>) => JSON.stringify(value),
      from: (value: string) => JSON.parse(value),
    },
  })
  request: Record<string, any>;

  @Column({
    type: "text",
    transformer: {
      to: (value: Record<string, any>) => JSON.stringify(value),
      from: (value: string) => JSON.parse(value),
    },
  })
  response: Record<string, any>;
}
