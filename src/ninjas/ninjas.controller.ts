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
import { CreateNinjaDto, NinjaWeapon } from './dto/create-ninja.dto';
import { UpdateNinjaDto } from './dto/update-ninja.dto';
import { NinjasService } from './ninjas.service';
import { AuthGuard } from '../guards/auth/auth.guard';

@Controller('ninjas')
@UseGuards(AuthGuard)
export class NinjasController {
  constructor(private readonly ninjasService: NinjasService) {}

  @Get()
  getNinjas(@Query('weapon') weapon: NinjaWeapon) {
    return this.ninjasService.getNinjas(weapon);
  }

  @Get(':id')
  getOneNinja(@Param('id', ParseIntPipe) id: number) {
    try {
      return this.ninjasService.getNinja(id);
    } catch (error) {
      throw new NotFoundException();
    }
  }

  @Post()
  @UsePipes(new ValidationPipe())
  createNinja(@Body() createNinjaDto: CreateNinjaDto) {
    return this.ninjasService.createNinja(createNinjaDto);
  }

  @Put(':id')
  updateNinja(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateNinjaDto: UpdateNinjaDto,
  ) {
    return this.ninjasService.updateNinja(id, updateNinjaDto);
  }

  @Delete(':id')
  deleteNinja(@Param('id', ParseIntPipe) id: number) {
    return this.ninjasService.deleteNinja(id);
  }
}
