import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Categories } from "./category.entity";
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

  @Column({ default: true })
  isActive: boolean;

  @Column({ type: "decimal", precision: 12, scale: 2 })
  price: number;

  @Column({ type: "decimal", precision: 12, scale: 2 })
  km: number;

  @Column({ type: "integer" })
  hp: number;

  @Column({ default: false })
  maintenence: boolean;

  @Column({ nullable: true })
  img?: string;

  @ManyToOne(() => Categories, { eager: true })
  categories: Categories;

  @OneToMany(() => Rent, (rent) => rent.cars)
  rent: Rent[];
}
