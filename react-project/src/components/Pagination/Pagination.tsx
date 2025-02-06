import './Pagination.scss';
import { SEARCH_PARAMS } from '../../utils/types';
import { useQueryParams } from '../../hooks/useQueryParams';

type PaginationProps = {
  nextPage: null | string;
  prevPage: null | string;
};
function Pagination({ nextPage, prevPage }: PaginationProps) {
  const { searchParams, setParam } = useQueryParams();
  const page = Number(searchParams.get(SEARCH_PARAMS.Page)) || 1;

  function setPage(page: number) {
    setParam('page', page.toString());
  }
  function toNextPage() {
    setPage(page + 1);
  }

  function toPrevPage() {
    setPage(page - 1);
  }
  return (
    <nav className="pagination">
      <button
        className="prev"
        onClick={toPrevPage}
        disabled={!prevPage ? true : false}
      >
        prev
      </button>
      <p className="current">{page}</p>
      <button
        className="next"
        onClick={toNextPage}
        disabled={!nextPage ? true : false}
      >
        next
      </button>
    </nav>
  );
}

export default Pagination;
