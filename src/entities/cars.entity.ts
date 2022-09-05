import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Categories } from "./category.entity";
import { Maintenence } from "./maintenence.entity";
import { Rent } from "./rent.entity";

@Entity("cars")
export class Cars {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ length: 7, unique: true })
  licensePlate: string;

  @Column({ length: 50 })
  color: string;

  @Column({ length: 50 })
  model: string;

  @Column({ length: 1 })
  fuel: string;

  @Column({ type: "integer" })
  year: number;

  @Column({ length: 50 })
  brand: string;

  @Column({ default: false })
  rented: boolean;

  @Column({ default: true })
  document: boolean;

  @Column({ type: "decimal", precision: 12, scale: 2 })
  price: number;

  @Column({ type: "decimal", precision: 12, scale: 2 })
  km: number;

  @Column({ type: "integer" })
  hp: number;

  @ManyToOne(() => Categories, { eager: true })
  categories: Categories;

  @OneToOne(() => Maintenence, { eager: true })
  @JoinColumn()
  maintenence: Maintenence;

  @OneToMany(() => Rent, (rent) => rent.cars)
  rent: Rent[];
}
