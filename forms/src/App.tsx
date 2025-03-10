import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import './App.css';
import Main from './pages/Main';
import Controlled from './pages/Controlled';
import Uncontrolled from './pages/Uncontrolled';

function App() {
  return (
    <BrowserRouter>
      <nav>
        <Link to="/controlled">Controlled form</Link>
        <Link to="/uncontrolled">Uncontrolled form</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/controlled" element={<Controlled />} />
        <Route path="/uncontrolled" element={<Uncontrolled />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
