import ErrorButton from '../../components/ErrorButton/ErrorButton';
import Header from '../../components/Header/Header';
import Main from '../../components/Main/Main';
import './MainPage.scss';
import Flyout from '../../components/Flyout/Flyout';
import { useTheme } from '../../hooks/useTheme';

function MainPage() {
  const { theme } = useTheme();

  return (
    <div className={`${theme} main-page`}>
      <ErrorButton />
      <Flyout />
      <Header />
      <Main />
    </div>
  );
}

export default MainPage;
