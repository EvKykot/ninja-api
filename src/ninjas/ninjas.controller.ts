import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreateNinjaBodyDto } from './dto/create-ninja-body.dto';
import { UpdateNinjaDto } from './dto/update-ninja.dto';
import { NinjasService } from './ninjas.service';
import { AuthGuard } from '../guards/auth/auth.guard';
import { NinjaWeapon } from './types/ninja-weapon-enum';
import { plainToInstance } from 'class-transformer';
import { ResponseNinjaDto } from './dto/response-ninja.dto';
import { NinjaMapper } from './mappers/ninja.mapper';
import { StatusOkDto } from '../common/dto/status-ok.dto';

@Controller('ninjas')
@UseGuards(AuthGuard)
export class NinjasController {
  constructor(private readonly ninjasService: NinjasService) {}

  @Get()
  async findNinjas(@Query() weapon: NinjaWeapon) {
    const ninjas = await this.ninjasService.findNinjas(weapon);
    return ninjas.map((ninja) => plainToInstance(ResponseNinjaDto, ninja));
  }

  @Get(':id')
  async getOneNinja(@Param('id', ParseIntPipe) id: string) {
    try {
      const ninja = await this.ninjasService.getNinja(id);
      return plainToInstance(ResponseNinjaDto, ninja);
    } catch (error) {
      throw new NotFoundException();
    }
  }

  @Post()
  @UsePipes(new ValidationPipe())
  async createNinja(@Body() createNinjaDto: CreateNinjaBodyDto) {
    const input = NinjaMapper.fromDto(createNinjaDto);
    const ninja = await this.ninjasService.createNinja(input);
    return plainToInstance(ResponseNinjaDto, ninja);
  }

  @Put(':id')
  async updateNinja(
    @Param('id', ParseIntPipe) id: string,
    @Body() updateNinjaDto: UpdateNinjaDto,
  ) {
    const ninja = await this.ninjasService.updateNinja(id, updateNinjaDto);
    return plainToInstance(ResponseNinjaDto, ninja);
  }

  @Delete(':id')
  async deleteNinja(@Param('id', ParseIntPipe) id: number) {
    await this.ninjasService.deleteNinja(id);
    return plainToInstance(StatusOkDto, { status: 'success' });
  }
}
