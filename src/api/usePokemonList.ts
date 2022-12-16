import { NamedAPIResource, NamedAPIResourceList } from 'pokenode-ts';
import { useQuery } from 'react-query';
import { getListKey } from './keys';
import { api } from './api';

interface PokemonLead extends NamedAPIResource {
    id: number;
}

interface PokemonList extends Omit<NamedAPIResourceList, 'results'> {
    list: PokemonLead[];
}

async function getPokemonList(from: number): Promise<PokemonList> {
    const { results, ...response } = await api.listPokemons(from);
    const list = results.map((p) => ({ ...p, id: Number(p.url.split('/').at(-2)) }));
    return { ...response, list };
}

export function usePokemonList(from = 1) {
    return useQuery(getListKey(from), () => getPokemonList(from));
}
