import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Cars } from "./cars.entity";

@Entity("categories")
export class Categories {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ length: 50, unique: true })
  name: string;

  @Column({ default: false })
  automatic: boolean;

  @Column({ length: 20 })
  type: string;

  @Column({ default: true })
  airConditioning: boolean;

  @Column({ length: 50 })
  directionType: string;

  @Column()
  powerWindows: boolean;

  @Column({ type: "decimal", precision: 12, scale: 2 })
  pricePerDay: number;

  @Column({ type: "decimal", precision: 12, scale: 2 })
  pricePerMouth: number;

  @Column({ type: "decimal", precision: 12, scale: 2 })
  pricePeryear: number;

  @Column({ default: true })
  isActive: boolean;

  @OneToMany(() => Cars, (cars) => cars.categories)
  cars: Cars[];
}
