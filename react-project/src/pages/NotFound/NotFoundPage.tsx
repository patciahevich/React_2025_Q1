import { useCallback } from 'react';
import './NotFoundPage.scss';
import { useNavigate } from 'react-router';

function NotFound() {
  const navigate = useNavigate();
  const goBack = useCallback(() => {
    navigate(-1);
  }, []);
  return (
    <div className="not-found-wrapper">
      <div className="not-found">
        <div className="image" />
        <h1>This page is not found</h1>
        <button onClick={goBack}>Go Back</button>
      </div>
    </div>
  );
}

export default NotFound;
