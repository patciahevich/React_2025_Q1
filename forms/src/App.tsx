import { Route, Routes } from 'react-router-dom';
import Main from './pages/Main';
import Controlled from './pages/Controlled';
import Uncontrolled from './pages/Uncontrolled';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="/controlled" element={<Controlled />} />
      <Route path="/uncontrolled" element={<Uncontrolled />} />
    </Routes>
  );
}

export default App;
