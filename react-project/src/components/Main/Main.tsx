import './Main.scss';
import { ServerResponse } from '../../utils/types';
import PeopleCard from '../PeopleCard/PeopleCard';
import Empty from '../Empty/Empty';

type MainProps = {
  currentData: ServerResponse | null;
  details: null | string;
  resetDetails: () => void;
  addDetails: (param: string) => void;
};

function Main(props: MainProps) {
  if (!props.currentData) {
    return <Empty text="Something went wrong!" imageName="error" />;
  }

  return !props.currentData.results.length ? (
    <Empty text="Nothing was found." imageName="nothing" />
  ) : (
    <main>
      <section className="cards">
        {props.currentData.results.map((item) => (
          <PeopleCard
            data={item}
            key={item.created.toString()}
            handleClick={() => props.addDetails(item.name)}
          />
        ))}
      </section>
      <section className={props.details ? 'details active' : 'details'}>
        <p>{props.details}</p>
        <button
          onClick={() => {
            props.resetDetails();
          }}
        >
          Click
        </button>
      </section>
    </main>
  );
}

export default Main;
