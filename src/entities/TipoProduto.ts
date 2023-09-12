import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Produto } from "./Produto";

@Entity("tipos_produtos")
export class TipoProduto {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ type: "varchar" })
  nome: string;
  // relacionamento 1 para muitos (QUEM ENVIA OS DADOS)
  @OneToMany(() => Produto, (produto) => produto.tipo)
  produtos: Produto[];
}
