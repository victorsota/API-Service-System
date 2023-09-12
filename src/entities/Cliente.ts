import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Produto } from "./Produto";

@Entity("clientes")
export class Cliente {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "varchar" })
  nome: string;

  @Column({ type: "varchar" })
  cpf: string;

  @Column({ type: "varchar" })
  email: string;
  // Relacionamento N:N
  @ManyToMany(() => Produto, (produto) => produto.clientes)
  @JoinTable({
    name: "vendas",
    joinColumn: {
      name: "produto_id",
      referencedColumnName: "id",
    },
    inverseJoinColumn: {
      name: "cliente_id",
      referencedColumnName: "id",
    },
  })
  produtos: Produto[];
}
