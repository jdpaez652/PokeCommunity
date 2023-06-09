import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { PokemonStats } from './pokemon-stats.entity';

@Entity()
export class Stat {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(() => PokemonStats, (PokemonStats) => PokemonStats.stat)
  pokemonStats: PokemonStats[];
}
