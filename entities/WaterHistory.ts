import {
  Entity,
  BaseEntity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Client } from './Client';

@Entity('water_history')
export class WaterHistory extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  value: string;

  @Column()
  time: string;

  @Column()
  date: Date;

  @Column()
  user_id: string;

  @ManyToOne(() => Client, (client) => client.user_uid, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  client: Client;
}
