import { NamedAPIResource, NamedAPIResourceList } from 'pokenode-ts';
import { UseQueryOptions, useQuery } from 'react-query';
import { getListKey } from './keys';
import { api } from './api';

interface PokemonListing extends NamedAPIResource {
    id: number;
}

interface PokemonList extends Omit<NamedAPIResourceList, 'results'> {
    list: PokemonListing[];
}

async function getPokemonList(from: number): Promise<PokemonList> {
    const { results, ...response } = await api.listPokemons(from);
    const list = results.map((p) => ({ ...p, id: Number(p.url.split('/').at(-2)) }));
    return { ...response, list };
}

type Options = Omit<UseQueryOptions<PokemonList, unknown, PokemonList, string>, 'queryKey' | 'queryFn'>;
export function usePokemonList(from = 1, options?: Options) {
    return useQuery(getListKey(from), () => getPokemonList(from), options);
}
