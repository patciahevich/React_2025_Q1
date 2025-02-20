import { Routes, Route } from 'react-router';
import './App.scss';
import MainPage from './pages/Main/MainPage';
import NotFound from './pages/NotFound/NotFoundPage';
import { useTheme } from './hooks/useTheme';

function App() {
  const { theme } = useTheme();
  return (
    <div className={`${theme} app`}>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
