import { NinjaWeapon } from './ninja-weapon-enum';

export type Ninja = {
  id: string;
  name: string;
  weapon: NinjaWeapon;
  createdAt: Date;
};

export type CreateNinjaInput = {
  id: string;
  name: string;
  weapon: NinjaWeapon;
};
