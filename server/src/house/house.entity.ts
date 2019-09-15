import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Manager } from '../manager/manager.entity';

@Entity()
export class House {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 50, nullable: true })
  name: string;

  @Column({type: 'text', nullable: true})
  address: string;

  @Column({type: 'text', nullable: true})
  description: string;

  @Column({type: 'text', nullable: true})
  phones: string;

  @Column({type: 'int', nullable: true})
  rooms: number;

  @ManyToOne(type => Manager, manager => manager.houses)
  manager: string;
}
