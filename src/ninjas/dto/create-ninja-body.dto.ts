import { IsEnum, IsUUID, MaxLength, MinLength } from 'class-validator';
import { NinjaWeapon } from '../types/ninja-weapon-enum';

export class CreateNinjaBodyDto {
  @IsUUID()
  id: string;

  @MinLength(2)
  @MaxLength(100)
  name: string;

  @IsEnum(NinjaWeapon, { message: 'Use correct weapon' })
  weapon: NinjaWeapon;
}
