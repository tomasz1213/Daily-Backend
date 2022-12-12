import { Entity, BaseEntity, Column, PrimaryColumn, OneToMany } from 'typeorm';
import { WaterHistory } from './WaterHistory';

@Entity('client')
export class Client extends BaseEntity {
  @PrimaryColumn({ unique: true, type: 'uuid' })
  user_uid: string;

  @Column()
  token: string;

  @Column({ unique: true })
  email: string;

  @Column()
  name: string;

  @Column({ unique: true })
  login: string;

  @Column()
  password: string;

  @OneToMany(() => WaterHistory, (water_history) => water_history.client)

  water_history: WaterHistory[];
}
