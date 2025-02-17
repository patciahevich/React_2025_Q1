import ErrorButton from '../../components/ErrorButton/ErrorButton';
import Header from '../../components/Header/Header';
import Main from '../../components/Main/Main';
import './MainPage.scss';
import Flyout from '../../components/Flyout/Flyout';

function MainPage() {
  return (
    <div className="main-page">
      <ErrorButton />
      <Flyout />
      <Header />
      <Main />
    </div>
  );
}

export default MainPage;
