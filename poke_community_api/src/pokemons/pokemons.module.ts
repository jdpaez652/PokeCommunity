import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { PokemonsService } from './services/pokemons.service';
import { PokemonsController } from './controllers/pokemons.controller';
import { Pokemon } from './entities/pokemon.entity';
import { Stat } from './entities/stat.entity';
import { PokemonStats } from './entities/pokemon-stats.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Pokemon, Stat, PokemonStats])],
  controllers: [PokemonsController],
  providers: [PokemonsService],
})
export class PokemonsModule {}
