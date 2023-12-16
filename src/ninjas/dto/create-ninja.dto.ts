import { IsEnum, MinLength } from 'class-validator';

export enum NinjaWeapon {
  stars = 'stars',
  nunchucks = 'nunchucks',
  stick = 'stick',
  sword = 'sword',
}

export class CreateNinjaDto {
  @MinLength(2)
  name: string;

  @IsEnum(NinjaWeapon, { message: 'Use correct weapon' })
  weapon: NinjaWeapon;
}
