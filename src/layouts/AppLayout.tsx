import { Outlet } from 'react-router-dom';

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
    return <header className="bg-rose-400 p-2">this is a header</header>;
}
