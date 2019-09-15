import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { House } from '../house/house.entity';

@Entity()
export class Manager {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text', nullable: false })
  name;

  @Column({ type: 'text', nullable: false })
  lastName;

  @Column({ type: 'text', nullable: false })
  email;

  @OneToMany(type => House, house => house.manager)
  houses: House[];
}
