import { BrowseList } from 'containers/BrowseList';
import { usePageTitle } from 'hooks';
import { useSearchParams } from 'react-router-dom';

export function BrowsePage() {
    const [search] = useSearchParams();

    usePageTitle(getPageTitle(search));

    return <BrowseList />;
}

function getPageTitle(search: URLSearchParams): string {
    const from = Number(search.get('from'));
    const main = 'Browse';
    return from || length ? `${main} (#${from} - #${from + 20})` : main;
}
