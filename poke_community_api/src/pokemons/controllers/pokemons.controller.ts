import { Controller, Get, Post, Body, Param, Put } from '@nestjs/common';
import { PokemonsService } from '../services/pokemons.service';
import {
  CreatePokemonWithStatsDto,
  UpdatePokemonStatDto,
} from '../dto/pokemon.dto';

@Controller('pokemons')
export class PokemonsController {
  constructor(private readonly pokemonsService: PokemonsService) {}
  @Get()
  findAll() {
    return this.pokemonsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.pokemonsService.findOne(+id);
  }

  @Post()
  create(@Body() payload: CreatePokemonWithStatsDto) {
    return this.pokemonsService.create(payload);
  }

  @Put(':id/stats')
  update(@Param('id') id: number, @Body() payload: UpdatePokemonStatDto) {
    return this.pokemonsService.updateStats(id, payload);
  }
}
