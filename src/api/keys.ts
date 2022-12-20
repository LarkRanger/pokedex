export const GET_LIST_KEY = 'fetch-pokemon-list';
export const getListKey = (from: number) => `${GET_LIST_KEY}-${from}`;

export const GET_POKEMON_KEY = 'fetch-pokemon';
export const getPokemonKey = (id: number) => `${GET_POKEMON_KEY}-${id}`;

export const GET_TOTAL_KEY = 'get-total';
