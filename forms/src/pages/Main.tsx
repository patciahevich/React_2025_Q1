import { Link } from 'react-router-dom';
import useForms from '../hooks/useForms';
import { FormData } from '../utils/types';

function Main() {
  const { forms } = useForms();

  return (
    <div className="wrapper">
      <h1>Welcome to the RSS React Forms</h1>
      <nav>
        <Link to="/controlled">Controlled form</Link>
        <Link to="/uncontrolled">Uncontrolled form</Link>
      </nav>
      <main>
        {forms.length ? (
          forms.map((form: FormData) => <p key={form.name}>{form.name}</p>)
        ) : (
          <h2>Please, fill the form</h2>
        )}
      </main>
    </div>
  );
}

export default Main;
