import { CreateNinjaBodyDto } from '../dto/create-ninja-body.dto';
import { CreateNinjaInput, Ninja } from '../types/ninja-types';
import { ResponseNinjaDto } from '../dto/response-ninja.dto';
import { NinjaEntity } from '../models/ninja.entity';

export class NinjaMapper {
  static fromDto(dto: CreateNinjaBodyDto): CreateNinjaInput {
    return dto;
  }

  static toResponseDto(ninja: Ninja): ResponseNinjaDto {
    return ninja;
  }

  static fromEntity(model: NinjaEntity): Ninja {
    return model;
  }
}
