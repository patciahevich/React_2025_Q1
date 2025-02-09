import { useState } from 'react';

function Button() {
  const [throwError, setThrowError] = useState(false);

  function handleClick() {
    setThrowError(true);
  }

  if (throwError) {
    throw new Error('New Error');
  }

  return (
    <button type="button" onClick={handleClick} className="error">
      Throw Error
    </button>
  );
}
export default Button;
