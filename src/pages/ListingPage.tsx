import { usePokemon, useTotal } from 'api';
import cn from 'classnames';
import { Button, Card, Chevron, Modal, TypedGlass } from 'components';
import { usePageTitle } from 'hooks';
import { Pokemon } from 'pokenode-ts';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toTitleCase, typeColors } from 'utils';

export function ListingPage() {
    const navigate = useNavigate();
    const [loaded, setLoaded] = useState<boolean>(false);
    const [open, setOpen] = useState<boolean>(false);
    const { id } = useParams();
    const { data } = usePokemon(Number(id));
    const total = useTotal();

    usePageTitle(getPageTitle(data));

    const onBack = () => navigate(`/browse?from=${Math.floor(Number(id) / 20) * 20}`);
    const onLoad = () => setLoaded(true);
    const onClickImage = () => setOpen(true);
    const onCloseModal = () => setOpen(false);
    const onClickNext = () => navigate(`/listing/${Number(id) + 1}`);
    const onClickPrevious = () => navigate(`/listing/${Number(id) - 1}`);
    if (!data) return null;

    const type1 = data.types.at(0)?.type.name!;
    const type2 = data.types.at(1)?.type.name;

    return (
        <div className="w-full h-full flex flex-col gap-2 items-center px-4">
            <section className="w-full flex items-center gap-4 pt-16">
                <Button variant="icon" className="rotate-90" onClick={onBack}>
                    <Chevron />
                </Button>
                <h1 className="text-7xl font-bold">{toTitleCase(data.name)}</h1>
                <TypedGlass
                    primary={data.types.at(0)?.type.name!}
                    secondary={data.types.at(1)?.type.name}
                    onClick={onClickImage}
                    className="h-32 grow flex justify-center hover:-translate-y-3 hover:shadow-2xl transition-all cursor-pointer"
                >
                    <img className={cn({ hidden: !loaded })} src={data.sprites.front_default!} onLoad={onLoad} />
                </TypedGlass>
            </section>
            <section className="w-full flex justify-between">
                <Button className={cn({ invisible: Number(id) === 1 })} onClick={onClickPrevious}>
                    &lt; previous
                </Button>
                <Button className={cn({ invisible: Number(id) === total })} onClick={onClickNext}>
                    next &gt;
                </Button>
            </section>

            <section className="w-full flex justify-center gap-6">
                <Singleton title={type2 ? 'Type 1' : 'Type'} content={type1} color={typeColors[type1]} />
                {type2 && <Singleton title="Type 2" content={type2} color={typeColors[type2]} />}
            </section>

            <section className="w-2/3 grid grid-cols-3 gap-y-2 mt-10">
                <Singleton title="species" content={data.species.name} />
                <Singleton title="height" content={data.height.toString()} />
                <Singleton title="weight" content={data.weight.toString()} />
                {data.stats.map((stat) => (
                    <Singleton title={stat.stat.name} content={stat.base_stat.toString()}></Singleton>
                ))}
            </section>

            <Modal open={open} onClose={onCloseModal}>
                <TypedGlass
                    className="w-96 h-[450px] grid grid-cols-3 grid-rows-5"
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

interface SingletonProps {
    title: string;
    content: string;
    color?: string;
}
function Singleton({ title, content, color }: SingletonProps) {
    return (
        <div className="flex flex-col gap-2 items-center">
            <h4 className="text-xl">{title}</h4>
            <div className="flex gap-2">
                <Card className="text-center" style={{ backgroundColor: color, minWidth: 82 }}>
                    {content}
                </Card>
            </div>
        </div>
    );
}
