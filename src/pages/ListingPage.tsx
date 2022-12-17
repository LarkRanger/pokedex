import { usePokemon } from 'api';
import { Button, Chevron, TypedGlass } from 'components';
import { usePageTitle } from 'hooks';
import { Pokemon } from 'pokenode-ts';
import { useNavigate, useParams } from 'react-router-dom';
import { toTitleCase } from 'utils';

export function ListingPage() {
    const navigate = useNavigate();
    const { id } = useParams();
    const { data } = usePokemon(Number(id));

    usePageTitle(getPageTitle(data));

    const onBack = () => navigate(-1);

    if (!data) return null;
    return (
        <div className="w-full h-full flex flex-col">
            <section className="flex items-center gap-4 pt-16">
                <Button variant="icon" className="rotate-90" onClick={onBack}>
                    <Chevron />
                </Button>
                <h1 className="text-8xl font-bold">{toTitleCase(data.name)}</h1>
                <TypedGlass
                    primary={data.types.at(0)?.type.name!}
                    secondary={data.types.at(1)?.type.name}
                    className="grow flex justify-center"
                >
                    <img src={data.sprites.front_default!} />
                </TypedGlass>
            </section>
        </div>
    );
}

const fallback = 'Pokemon Listing';
function getPageTitle(pokemon?: Pokemon) {
    return pokemon ? `${toTitleCase(pokemon.name)} - #${pokemon.id}` : fallback;
}
