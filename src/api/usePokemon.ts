import { useQuery } from 'react-query';
import { getPokemonKey } from './keys';
import { api } from './api';

export function usePokemon(id: number) {
    return useQuery(getPokemonKey(id), () => api.getPokemonById(id));
}
