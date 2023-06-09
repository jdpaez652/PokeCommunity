import { Entity, PrimaryGeneratedColumn, ManyToOne, Column } from 'typeorm';

import { Pokemon } from './pokemon.entity';
import { Stat } from './stat.entity';

@Entity()
export class PokemonStats {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  base_stat: number;

  @ManyToOne(() => Pokemon, (Pokemon) => Pokemon.pokemonStats)
  pokemon: Pokemon;

  @ManyToOne(() => Stat)
  stat: Stat;
}
