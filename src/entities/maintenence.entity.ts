import { Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("maintenence")
export class Maintenence {
  @PrimaryGeneratedColumn("uuid")
  id: string;
}
