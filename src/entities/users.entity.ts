import { Exclude } from "class-transformer";
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  OneToOne,
  JoinColumn,
} from "typeorm";
import { Addresses } from "./address.entity";
import { Cards } from "./card.entity";
import { Cnh } from "./cnh.entity";
import { Rent } from "./rent.entity";

@Entity("users")
export class Users {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ length: 50 })
  name: string;

  @Column({ type: "date" })
  birthDate: string;

  @Column({ length: 11 })
  cpf: string;

  @Column({ type: "integer" })
  age: number;

  @Column({ unique: true, length: 50 })
  email: string;

  @Column({ default: false })
  isAdm: boolean;

  @Column()
  @Exclude()
  password: string;

  @Column({ default: true })
  isActive: boolean;

  @OneToOne(() => Cnh, { eager: true })
  @JoinColumn()
  cnh?: Cnh;

  @OneToOne(() => Addresses, { eager: true })
  @JoinColumn()
  address?: Addresses;

  @OneToMany(() => Cards, (card) => card.user)
  cards?: Cards[];

  @OneToMany(() => Rent, (rent) => rent.users)
  rent?: Rent[];
}
