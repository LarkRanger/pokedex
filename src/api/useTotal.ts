import { useQuery } from 'react-query';
import { GET_TOTAL_KEY } from './keys';
import { api } from './api';

export function useTotal() {
    const { data } = useQuery(GET_TOTAL_KEY, () => api.listPokemonSpecies(0, 0));
    return data?.count;
}
