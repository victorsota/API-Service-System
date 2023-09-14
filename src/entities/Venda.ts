import { type } from "os";
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Produto } from "./Produto";
import { join } from "path";
import { Cliente } from "./Cliente";

@Entity("vendas")
export class Venda {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Produto, (produto) => produto.vendas)
  @JoinColumn({ name: "produto_id" })
  produto: Produto;

  @ManyToOne(() => Cliente, (cliente) => cliente.vendas)
  @JoinColumn({ name: "cliente_id" })
  cliente: Cliente;
}
