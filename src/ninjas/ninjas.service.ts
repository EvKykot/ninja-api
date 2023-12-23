import { Injectable } from '@nestjs/common';
import { CreateNinjaBodyDto } from './dto/create-ninja-body.dto';
import { UpdateNinjaDto } from './dto/update-ninja.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { NinjaEntity } from './models/ninja.entity';
import { Repository } from 'typeorm';
import { NinjaWeapon } from './types/ninja-weapon-enum';
import { CreateNinjaInput, Ninja } from './types/ninja-types';
import { NinjaMapper } from './mappers/ninja.mapper';

@Injectable()
export class NinjasService {
  constructor(
    @InjectRepository(NinjaEntity)
    private readonly ninjaRepository: Repository<NinjaEntity>,
  ) {}

  async findNinjas(weapon?: NinjaWeapon) {
    if (!weapon) return this.ninjaRepository.find();
    return this.ninjaRepository.find({ where: { weapon: weapon } });
  }

  async getNinja(id: string) {
    const entity = await this.ninjaRepository.findOne({ where: { id } });

    if (!entity) throw new Error('Ninja not found');

    return NinjaMapper.fromEntity(entity);
  }

  async createNinja(createNinjaInput: CreateNinjaInput): Promise<Ninja> {
    const entity = await this.ninjaRepository.save(createNinjaInput);
    return NinjaMapper.fromEntity(entity);
  }

  async updateNinja(
    id: string,
    updateNinjaDto: UpdateNinjaDto,
  ): Promise<Ninja> {
    await this.ninjaRepository.update(id, updateNinjaDto);
    const entity = await this.ninjaRepository.findOne({ where: { id } });
    return NinjaMapper.fromEntity(entity);
  }

  async deleteNinja(id: number) {
    await this.ninjaRepository.delete(id);
  }
}
