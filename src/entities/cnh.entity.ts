import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("cnh")
export class Cnh {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ length: 2 })
  type: string;

  @Column({ length: 50, unique: true })
  number: string;

  @Column({ type: "date" })
  validate: string;
}
