import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
  constructor(user?: Partial<User>) {
    Object.assign(this, user);
  }

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ default: true })
  isActive: boolean;
}
