import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Food {
  constructor(food?: Partial<Food>) {
    Object.assign(this, food);
  }

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  country: string;

  @Column()
  name: string;

  @Column({ default: true })
  isActive: boolean;
}
