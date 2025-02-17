import { useTheme } from '../../hooks/useTheme';
import './ThemeToggleButton.scss';

function ThemeToggleButton() {
  const { theme, toggleTheme } = useTheme();

  return <button className={`${theme} theme`} onClick={toggleTheme}></button>;
}

export default ThemeToggleButton;
