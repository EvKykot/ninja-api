import { IsEnum, IsOptional, MaxLength, MinLength } from 'class-validator';
import { NinjaWeapon } from '../types/ninja-weapon-enum';

export class UpdateNinjaDto {
  @IsOptional()
  @MinLength(2)
  @MaxLength(100)
  name?: string;

  @IsOptional()
  @IsEnum(NinjaWeapon, { message: 'Use correct weapon' })
  weapon?: NinjaWeapon;
}
