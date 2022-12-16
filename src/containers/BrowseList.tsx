import { usePokemonList } from 'api';
import { Button, Chevron, Glass } from 'components';
import { useSearchParams } from 'react-router-dom';

export function BrowseList() {
    const [search, setSearch] = useSearchParams();
    const from = Number(search.get('from'));
    const { data, isFetching } = usePokemonList(from);

    const onNext = () => setSearch({ from: `${from + 20}` });

    const onBack = () => setSearch({ from: `${from - 20}` });

    return (
        <div className="w-full h-full flex p-2">
            <div className="h-full grow flex items-center justify-center">
                <Button variant="icon" className="rotate-90" onClick={onBack} disabled={!data?.previous}>
                    <Chevron />
                </Button>
            </div>
            <div className="h-full w-2/3 flex flex-col gap-2 items-center overflow-auto">
                {!isFetching
                    ? data?.list?.map((p) => (
                          <Glass
                              key={p.id}
                              className="w-2/3 flex gap-2 hover:bg-opacity-100 hover:translate-x-4 transition-all select-none"
                          >
                              <div className="w-1/3 text-right">#{p.id}</div>
                              {p.name.toUpperCase()}
                          </Glass>
                      ))
                    : null}
            </div>
            <div className="h-full grow flex items-center justify-center">
                <Button variant="icon" className="-rotate-90" onClick={onNext} disabled={!data?.next}>
                    <Chevron />
                </Button>
            </div>
        </div>
    );
}
