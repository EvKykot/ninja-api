import { NinjaWeapon } from '../types/ninja-weapon-enum';
import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class ResponseNinjaDto {
  @Expose()
  id: string;

  @Expose()
  name: string;

  @Expose()
  weapon: NinjaWeapon;

  @Expose()
  createdAt: Date;
}
