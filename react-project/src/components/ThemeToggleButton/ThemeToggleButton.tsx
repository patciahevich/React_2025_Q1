import { useTheme } from '../../hooks/useTheme';
import styles from './ThemeToggleButton.module.scss';
import React from 'react';

function ThemeToggleButton() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      className={` ${styles.theme} ${styles[theme]}`}
      onClick={toggleTheme}
    ></button>
  );
}

export default ThemeToggleButton;
