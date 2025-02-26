import { useState } from 'react';

type ButtonProps = {
  class: string;
};

function Button(props: ButtonProps) {
  const [throwError, setThrowError] = useState(false);

  function handleClick() {
    setThrowError(true);
  }

  if (throwError) {
    throw new Error('New Error');
  }

  return (
    <button type="button" onClick={handleClick} className={props.class}>
      Throw Error
    </button>
  );
}
export default Button;
