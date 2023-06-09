import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

import { PokemonStats } from './pokemon-stats.entity';

@Entity()
export class Pokemon {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    unique: true,
  })
  pokemon_id: number;

  @Column({
    length: 150,
  })
  name: string;

  @Column({ length: 250 })
  types: string;

  @OneToMany(() => PokemonStats, (PokemonStats) => PokemonStats.pokemon, {
    cascade: true,
  })
  pokemonStats: PokemonStats[];

  @Column()
  image: string;
}
