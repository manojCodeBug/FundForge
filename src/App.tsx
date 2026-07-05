import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { WalletProvider } from './contexts/WalletContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { WalletSelectorModal } from './components/WalletSelectorModal';

// Pages
import { LandingPage } from './pages/LandingPage';
import { ExplorePage } from './pages/ExplorePage';
import { CampaignDetailsPage } from './pages/CampaignDetailsPage';
import { CreateCampaignPage } from './pages/CreateCampaignPage';
import { DashboardPage } from './pages/DashboardPage';
import { WalletCenterPage } from './pages/WalletCenterPage';
import { AnalyticsPage } from './pages/AnalyticsPage';
import { SettingsPage } from './pages/SettingsPage';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

function App() {
  const [isDark, setIsDark] = useState<boolean>(() => {
    const savedTheme = localStorage.getItem('fundforge_theme');
    if (savedTheme) {
      return savedTheme === 'dark';
    }
    // Default to system preference
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  useEffect(() => {
    const root = window.document.documentElement;
    if (isDark) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('fundforge_theme', isDark ? 'dark' : 'light');
  }, [isDark]);

  const toggleTheme = () => setIsDark((prev) => !prev);

  // Trigger state refresh when a donation success occurs to keep views synchronized
  const [donateTrigger, setDonateTrigger] = useState(0);
  const handleDonateSuccess = () => {
    setDonateTrigger((prev) => prev + 1);
  };

  return (
    <QueryClientProvider client={queryClient}>
      <WalletProvider>
        <Router>
          <div className="flex flex-col min-h-screen bg-background text-on-background selection:bg-primary selection:text-on-primary-fixed">
            <Navbar toggleTheme={toggleTheme} isDark={isDark} />
            
            <main className="flex-grow">
              <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/explore" element={<ExplorePage key={donateTrigger} onDonateClick={() => {}} />} />
                <Route path="/campaign/:id" element={<CampaignDetailsPage onDonateSuccess={handleDonateSuccess} />} />
                <Route path="/create" element={<CreateCampaignPage />} />
                <Route path="/dashboard" element={<DashboardPage key={donateTrigger} />} />
                <Route path="/wallet" element={<WalletCenterPage />} />
                <Route path="/analytics" element={<AnalyticsPage />} />
                <Route path="/settings" element={<SettingsPage />} />
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </main>

            <Footer />
            <WalletSelectorModal />
          </div>
        </Router>
      </WalletProvider>
    </QueryClientProvider>
  );
}

export default App;
