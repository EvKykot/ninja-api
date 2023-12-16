import { Injectable } from '@nestjs/common';
import { CreateNinjaDto, NinjaWeapon } from './dto/create-ninja.dto';
import { UpdateNinjaDto } from './dto/update-ninja.dto';

@Injectable()
export class NinjasService {
  private ninjas = [
    { id: 0, name: 'NinajaA', weapon: NinjaWeapon.stars },
    { id: 1, name: 'NinajaB', weapon: NinjaWeapon.nunchucks },
  ];

  getNinjas(weapon?: NinjaWeapon) {
    if (weapon) {
      return this.ninjas.filter((item) => item.weapon === weapon);
    }

    return this.ninjas;
  }

  getNinja(id: number) {
    const ninja = this.ninjas.find((item) => item.id === id);

    if (!ninja) {
      throw new Error('Ninja not found');
    }

    return ninja;
  }

  createNinja(createNinjaDto: CreateNinjaDto) {
    const newNinja = {
      ...createNinjaDto,
      id: Date.now(),
    };

    this.ninjas.push(newNinja);

    return newNinja;
  }

  updateNinja(id: number, updateNinjaDto: UpdateNinjaDto) {
    this.ninjas = this.ninjas.map((item) => {
      if (item.id !== id) return item;
      return { ...item, ...updateNinjaDto };
    });

    return this.getNinja(id);
  }

  deleteNinja(id: number) {
    const toBeRemoved = this.getNinja(id);
    this.ninjas = this.ninjas.filter((item) => item.id !== id);

    return toBeRemoved;
  }
}
