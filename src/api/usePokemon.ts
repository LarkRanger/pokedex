import { UseQueryOptions, useQuery } from 'react-query';
import { getPokemonKey } from './keys';
import { api } from './api';
import { Pokemon } from 'pokenode-ts';

export function usePokemon(id: number, options?: Omit<UseQueryOptions<Pokemon, unknown, Pokemon, string>, "queryKey" | "queryFn">) {
    return useQuery(getPokemonKey(id), () => api.getPokemonById(id));
}
