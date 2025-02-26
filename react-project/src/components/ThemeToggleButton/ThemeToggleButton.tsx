import { useTheme } from '../../hooks/useTheme';
import styles from './ThemeToggleButton.module.scss';

function ThemeToggleButton() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      className={` ${styles.theme} ${theme}`}
      onClick={toggleTheme}
    ></button>
  );
}

export default ThemeToggleButton;
