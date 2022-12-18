import { usePokemon } from 'api';
import cn from 'classnames';
import { Button, Card, Chevron, Modal, TypedGlass } from 'components';
import { usePageTitle } from 'hooks';
import { Pokemon } from 'pokenode-ts';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toTitleCase } from 'utils';

export function ListingPage() {
    const navigate = useNavigate();
    const [loaded, setLoaded] = useState<boolean>(false);
    const [open, setOpen] = useState<boolean>(false);
    const { id } = useParams();
    const { data } = usePokemon(Number(id));

    usePageTitle(getPageTitle(data));

    const onBack = () => navigate(-1);
    const onLoad = () => setLoaded(true);
    const onClickImage = () => setOpen(true);
    const onCloseModal = () => setOpen(false);

    if (!data) return null;
    return (
        <div className="w-full h-full flex flex-col">
            <section className="flex items-center gap-4 pt-16">
                <Button variant="icon" className="rotate-90" onClick={onBack}>
                    <Chevron />
                </Button>
                <h1 className="text-9xl font-bold">{toTitleCase(data.name)}</h1>
                <TypedGlass
                    primary={data.types.at(0)?.type.name!}
                    secondary={data.types.at(1)?.type.name}
                    onClick={onClickImage}
                    className={cn(
                        'grow flex justify-center hover:-translate-y-3 hover:shadow-2xl transition-all cursor-pointer',
                        {
                            invisible: !loaded,
                        }
                    )}
                >
                    <img src={data.sprites.front_default!} onLoad={onLoad} />
                </TypedGlass>
            </section>
            <section>
            </section>

            <Modal open={open} onClose={onCloseModal}>
                <TypedGlass
                    className="grid grid-cols-3"
                    primary={data.types.at(0)?.type.name!}
                    secondary={data.types.at(1)?.type.name}
                >
                    {getSpriteArray(data).map(([name, sprite]) => (
                        <img
                            key={name}
                            src={sprite}
                            alt={name}
                            title={name}
                            className="self-center justify-self-center"
                        />
                    ))}
                </TypedGlass>
            </Modal>
        </div>
    );
}

const fallback = 'Pokemon Listing';
function getPageTitle(pokemon?: Pokemon) {
    return pokemon ? `${toTitleCase(pokemon.name)} - #${pokemon.id}` : fallback;
}

type SpritesObject = object & { front_default?: string | null };
function getSpriteArray(pokemon: Pokemon) {
    const generations: { [key: string]: SpritesObject }[] = Object.values(pokemon.sprites.versions);
    const spritesObject = generations.reduce<Record<string, string>>((acc, gen) => {
        const games = Object.entries(gen);
        games.forEach(([name, sprites]) => sprites.front_default && (acc[name] = sprites.front_default));
        return acc;
    }, {});
    return Object.entries(spritesObject);
}
