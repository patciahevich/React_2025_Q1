import './Main.scss';
import { ServerResponse } from '../../utils/types';
import PeopleCard from '../PeopleCard/PeopleCard';
import Empty from '../Empty/Empty';

type MainProps = {
  currentData: ServerResponse | null;
};

function Main(props: MainProps) {
  if (!props.currentData) {
    return <Empty text="Something went wrong!" imageName="error" />;
  }

  return !props.currentData.results.length ? (
    <Empty text="Nothing was found." imageName="nothing" />
  ) : (
    <main>
      {props.currentData.results.map((item) => (
        <PeopleCard data={item} key={item.created.toString()} />
      ))}
    </main>
  );
}

export default Main;
