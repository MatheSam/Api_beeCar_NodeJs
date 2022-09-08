import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Cars } from "./cars.entity";
import { Users } from "./users.entity";

@Entity("rent")
export class Rent {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ type: "date" })
  initialDate: Date;

  @Column({ type: "time" })
  initialHour: string;

  @Column({ type: "date" })
  finalDate: Date;

  @Column({ type: "time" })
  finalHour: string;

  @Column({ type: "decimal", precision: 12, scale: 2 })
  totalValue: number;

  @ManyToOne(() => Users, { eager: true })
  users: Users;

  @ManyToOne(() => Cars, { eager: true })
  cars: Cars;
}
