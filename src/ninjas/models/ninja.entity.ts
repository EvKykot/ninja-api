import { Column, Entity, PrimaryColumn } from 'typeorm';

import { NinjaWeapon } from '../types/ninja-weapon-enum';

@Entity('ninja')
export class NinjaEntity {
  @PrimaryColumn({ type: 'uuid' })
  id: string;

  @Column({ nullable: false, length: 100 })
  name: string;

  @Column({ nullable: false, enum: NinjaWeapon })
  weapon: NinjaWeapon;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
}
