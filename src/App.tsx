import { AppLayout } from 'layouts/AppLayout';
import { BrowsePage } from 'pages/BrowsePage';
import { ListingPage } from 'pages/ListingPage';
import { QueryClient, QueryClientProvider } from 'react-query';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

const queryClient = new QueryClient();

export default function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <BrowserRouter>
                <Routes>
                    <Route element={<AppLayout />}>
                        <Route index element={<Navigate to="/browse" />} />
                        <Route path="browse" element={<BrowsePage />} />
                        <Route path="listing">
                            <Route path=":id" element={<ListingPage />} />
                        </Route>
                    </Route>
                </Routes>
            </BrowserRouter>
        </QueryClientProvider>
    );
}
