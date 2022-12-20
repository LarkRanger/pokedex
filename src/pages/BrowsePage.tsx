import { usePageTitle } from 'hooks';
import { usePokemonList } from 'api';
import { Button, Chevron, Glass, Scroll } from 'components';
import cn from 'classnames';
import gsap from 'gsap';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useEffect, useRef } from 'react';
import { toTitleCase } from 'utils';

export function BrowsePage() {
    const navigate = useNavigate();
    const [search, setSearch] = useSearchParams();
    const cameFrom = useRef<'next' | 'prev'>('next');
    const from = Number(search.get('from'));
    const { data, isFetching } = usePokemonList(from, { keepPreviousData: true });

    usePageTitle(getPageTitle(search));

    function onNext() {
        gsap.to(`.${LISTING_CLASS_NAME}`, {
            x: '-2rem',
            opacity: 0,
            stagger: 0.03,
            duration: 0.2,
            onComplete() {
                setSearch({ from: `${from + 20}` });
                cameFrom.current = 'next';
            },
        });
    }

    function onBack() {
        gsap.to(`.${LISTING_CLASS_NAME}`, {
            x: '2rem',
            opacity: 0,
            stagger: 0.03,
            duration: 0.2,
            onComplete() {
                setSearch({ from: `${from - 20}` });
                cameFrom.current = 'prev';
            },
        });
    }

    function handleClick(index: number) {
        return function onClick() {
            gsap.to(`.${LISTING_CLASS_NAME}`, {
                scale: 0.9,
                opacity: 0,
                duration: 0.2,
                stagger: {
                    each: 0.03,
                    from: index,
                },
                onComplete: () => navigate(`/listing/${data?.list.at(index)?.id}`),
            });
        };
    }

    useEffect(() => {
        if (!document.getElementsByClassName(LISTING_CLASS_NAME).length) return;
        const x = cameFrom.current === 'next' ? '2rem' : '-2rem';
        gsap.fromTo(`.${LISTING_CLASS_NAME}`, { x, opacity: 0 }, { x: 0, opacity: 1, stagger: 0.03, duration: 0.2 });
    }, [data, isFetching]);

    return (
        <div className="w-full h-full flex p-2">
            <div className="h-full grow flex items-center justify-center">
                <Button variant="icon" className="rotate-90" onClick={onBack} disabled={!data?.previous}>
                    <Chevron />
                </Button>
            </div>
            <div className="h-full w-2/3">
                <Scroll>
                    <div className="h-full w-full flex flex-col gap-2 items-center justify-between">
                        {!isFetching
                            ? data?.list?.map((p, i) => (
                                  <Glass
                                      key={p.id}
                                      onClick={handleClick(i)}
                                      className={cn(
                                          'w-2/3 flex gap-2 hover:bg-opacity-100 transition-all select-none opacity-0 cursor-pointer',
                                          LISTING_CLASS_NAME
                                      )}
                                  >
                                      <div className="w-1/3 text-right">#{p.id}</div>
                                      {toTitleCase(p.name)}
                                  </Glass>
                              ))
                            : null}
                    </div>
                </Scroll>
            </div>
            <div className="h-full grow flex items-center justify-center">
                <Button variant="icon" className="-rotate-90" onClick={onNext} disabled={!data?.next}>
                    <Chevron />
                </Button>
            </div>
        </div>
    );
}

const LISTING_CLASS_NAME = 'pokemon-listing';

function getPageTitle(search: URLSearchParams): string {
    const from = Number(search.get('from'));
    const main = 'Browse';
    return from || length ? `${main} (#${from} - #${from + 20})` : main;
}
