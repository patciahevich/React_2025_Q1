import { Link } from 'react-router-dom';
import useForms from '../hooks/useForms';
import CardList from '../components/CardList/CardList';

function Main() {
  const { hasForms } = useForms();

  return (
    <div className="wrapper">
      <h1>Welcome to the RSS React Forms</h1>
      <nav>
        <Link to="/controlled">Controlled form</Link>
        <Link to="/uncontrolled">Uncontrolled form</Link>
      </nav>
      <main>{hasForms() ? <CardList /> : <h2>Please, fill the form</h2>}</main>
    </div>
  );
}

export default Main;
