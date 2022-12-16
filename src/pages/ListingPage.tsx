import { usePokemon } from 'api';
import { Listing } from 'containers/Listing';
import { usePageTitle } from 'hooks';
import { Pokemon } from 'pokenode-ts';
import { useParams } from 'react-router-dom';
import { toTitleCase } from 'utils';

export function ListingPage() {
    const { id } = useParams();
    const { data } = usePokemon(Number(id));

    usePageTitle(getPageTitle(data));

    return <Listing />;
}

const fallback = 'Pokemon Listing';
function getPageTitle(pokemon?: Pokemon) {
    return pokemon ? `${toTitleCase(pokemon.name)} - #${pokemon.id}` : fallback;
}
