import { Routes, Route } from 'react-router';
import './App.scss';
import MainPage from './pages/Main/MainPage';
import NotFound from './pages/NotFound/NotFoundPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
