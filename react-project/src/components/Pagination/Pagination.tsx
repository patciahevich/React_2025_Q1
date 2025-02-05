import { Dispatch, SetStateAction } from 'react';
import './Pagination.scss';

type PaginationProps = {
  nextPage: null | string;
  prevPage: null | string;
  currentPage: number;
  changePage: Dispatch<SetStateAction<number>>;
};
function Pagination(props: PaginationProps) {
  function nextPage() {
    props.changePage((prev: number) => (prev += 1));
  }

  function prevPage() {
    props.changePage((prev: number) => (prev -= 1));
  }
  return (
    <nav className="pagination">
      <button
        className="prev"
        onClick={prevPage}
        disabled={!props.prevPage ? true : false}
      >
        prev
      </button>
      <p className="current">{props.currentPage}</p>
      <button
        className="next"
        onClick={nextPage}
        disabled={!props.nextPage ? true : false}
      >
        next
      </button>
    </nav>
  );
}

export default Pagination;
