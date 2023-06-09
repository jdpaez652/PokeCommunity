export class CreatePokemonDto {
  readonly pokemon_id: number;
  readonly name: string;
  readonly types: string;
  readonly image: string;
}

export class CreatePokemonStatDto {
  readonly pokemon_id: number;
  readonly stat_name: string;
  readonly base_stat: number;
}

export class UpdatePokemonStatDto {
  readonly base_stat: number;
}

export class CreatePokemonWithStatsDto {
  readonly pokemon_data: CreatePokemonDto;
  readonly pokemon_stats: CreatePokemonStatDto[];
}
