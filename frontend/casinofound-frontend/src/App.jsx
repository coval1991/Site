import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import './App.css';

// Componentes
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import ICOPage from './pages/ICOPage';
import DashboardPage from './pages/DashboardPage';
import AdminPage from './pages/AdminPage';
import WhitepaperPage from './pages/WhitepaperPage';
import FAQPage from './pages/FAQPage';

// Configurar React Query
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutos
      cacheTime: 10 * 60 * 1000, // 10 minutos
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <div className="min-h-screen bg-background">
          <Navbar />
          <main>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/ico" element={<ICOPage />} />
              <Route path="/dashboard" element={<DashboardPage />} />
              <Route path="/admin" element={<AdminPage />} />
              <Route path="/whitepaper" element={<WhitepaperPage />} />
              <Route path="/faq" element={<FAQPage />} />
            </Routes>
          </main>
        </div>
      </Router>
    </QueryClientProvider>
  );
}

export default App;
