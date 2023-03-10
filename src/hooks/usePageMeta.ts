import { useEffect } from 'react';

export function usePageTitle(title?: string) {
    useEffect(() => {
        if (title) document.title = title;
    }, [title]);
}
