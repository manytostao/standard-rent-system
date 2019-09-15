import { Entity, Column, PrimaryGeneratedColumn, OneToMany, OneToOne, JoinColumn } from 'typeorm';
import { Manager } from '../manager/manager.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 50, nullable: false, unique: true })
  username: string;

  @Column({type: 'text', nullable: false})
  password;

  @OneToOne(type => Manager, {cascade: true})
  @JoinColumn()
  managerProfile: Manager;
}
