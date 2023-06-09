import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { PokemonsModule } from './pokemons/pokemons.module';

import { Pokemon } from './pokemons/entities/pokemon.entity';
import { Stat } from './pokemons/entities/stat.entity';
import { PokemonStats } from './pokemons/entities/pokemon-stats.entity';

@Module({
  imports: [
    PokemonsModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'root',
      password: '123456',
      database: 'poke_community',
      entities: [Pokemon, Stat, PokemonStats],
      synchronize: true,
      logging: false,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
