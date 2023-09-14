import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Venda } from "./Venda";

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

  @OneToMany(() => Venda, (venda) => venda.cliente)
  vendas: Venda[];
}
