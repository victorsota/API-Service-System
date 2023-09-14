import {
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { TipoProduto } from "./TipoProduto";
import { Venda } from "./Venda";

@Entity("produtos")
export class Produto {
  //Cria o id como serial e primary key
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "varchar" })
  nome: string;

  @Column({ type: "varchar" })
  descricao: string;

  @Column({ type: "int" })
  preco: number;

  @Column({ type: "int" })
  quantidade: number;

  // relacionamento 1 para muitos (QUEM RECEBE OS DADOS)
  @ManyToOne(() => TipoProduto, (tipo) => tipo.produtos)

  // nome da chave estrangeira no banco de dados
  @JoinColumn({ name: "tipo_id" })
  tipo: TipoProduto;

  @OneToMany(() => Venda, (venda) => venda.produto)
  vendas: Venda[];
}
