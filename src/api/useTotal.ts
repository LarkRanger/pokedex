import { usePokemonList } from './usePokemonList';

export function useTotal() {
    const { data } = usePokemonList();
    return data?.count;
}
