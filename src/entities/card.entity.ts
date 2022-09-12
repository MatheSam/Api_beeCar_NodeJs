import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Users } from "./users.entity";

@Entity("cards")
export class Cards {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ length: 50 })
  cardNumber: string;

  @Column({ type: "date" })
  validate: string;

  @Column({ length: 50 })
  name: string;

  @ManyToOne(() => Users)
  user: Users;
}
