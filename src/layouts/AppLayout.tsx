import { useTotal } from 'api';
import { Button } from 'components';
import { Outlet, useNavigate } from 'react-router-dom';

export function AppLayout() {
    return (
        <div className="w-full h-full flex flex-col justify-start gap-2">
            <Header />
            <main className="h-0 grow w-full">
                <Outlet />
            </main>
        </div>
    );
}

function Header() {
    const navigate = useNavigate();
    const total = useTotal();

    const onRandom = () => navigate(`/listing/${getRandomId(total)}`);

    return (
        <header className="flex bg-rose-400 p-2">
            <Button variant="secondary" onClick={onRandom}>
                random
            </Button>
        </header>
    );
}

function getRandomId(total?: number) {
    if (!total) return 25;
    return Math.floor(Math.random() * total);
}
