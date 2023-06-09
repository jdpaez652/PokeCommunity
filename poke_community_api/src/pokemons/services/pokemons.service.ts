import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import {
  CreatePokemonWithStatsDto,
  UpdatePokemonStatDto,
} from '../dto/pokemon.dto';
import { Pokemon } from '../entities/pokemon.entity';
import { Stat } from '../entities/stat.entity';
import { PokemonStats } from '../entities/pokemon-stats.entity';

@Injectable()
export class PokemonsService {
  constructor(
    @InjectRepository(Pokemon)
    private pokemonRepo: Repository<Pokemon>,
    @InjectRepository(PokemonStats)
    private pokemonStatsRepo: Repository<PokemonStats>,
    @InjectRepository(Stat)
    private statRepo: Repository<Stat>,
  ) {}

  async findAll() {
    return await this.pokemonRepo.find();
  }

  async findOne(id: number) {
    const pokemon = await this.pokemonRepo.findOne({
      where: { pokemon_id: id },
      relations: {
        pokemonStats: {
          stat: true,
        },
      },
    });

    if (!pokemon) throw new NotFoundException(`Pokemon #${id} not found`);

    return pokemon;
  }

  async create(payload: CreatePokemonWithStatsDto) {
    try {
      const alreadyExist = await this.pokemonRepo.findOneBy({
        pokemon_id: payload.pokemon_data.pokemon_id,
      });

      if (!alreadyExist) {
        const allStats = await this.statRepo.find();

        const pokemon = new Pokemon();
        pokemon.pokemon_id = payload.pokemon_data.pokemon_id;
        pokemon.name = payload.pokemon_data.name;
        pokemon.types = payload.pokemon_data.types;
        pokemon.image = payload.pokemon_data.image;
        pokemon.pokemonStats = [];

        payload.pokemon_stats.forEach((pokemonStat) => {
          const newStat = new PokemonStats();
          newStat.stat = allStats.find(
            (stat) => stat.name === pokemonStat.stat_name,
          );
          newStat.base_stat = pokemonStat.base_stat;

          pokemon.pokemonStats.push(newStat);
        });
        return await this.pokemonRepo.save(pokemon);
      }
    } catch (error) {
      return error;
    }
  }

  async updateStats(pokemon_stat_id: number, payload: UpdatePokemonStatDto) {
    const stat = await this.pokemonStatsRepo.findOneBy({ id: pokemon_stat_id });

    if (!stat)
      throw new NotFoundException(`Stat #${pokemon_stat_id} not found`);

    this.pokemonStatsRepo.merge(stat, payload);

    return this.pokemonStatsRepo.save(stat);
  }
}
