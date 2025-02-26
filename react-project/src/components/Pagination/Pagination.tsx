import styles from './Pagination.module.scss';
import { useQueryParams } from '../../hooks/useQueryParams';
import { useTheme } from '../../hooks/useTheme';

type PaginationProps = {
  nextPage: null | string;
  prevPage: null | string;
};
function Pagination({ nextPage, prevPage }: PaginationProps) {
  const { query, setParam } = useQueryParams();
  const page = Number(query.page) || 1;
  const { theme } = useTheme();

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
    <nav className={`${styles.pagination} ${styles[theme]}`}>
      <button
        className={styles.prev}
        onClick={toPrevPage}
        disabled={!prevPage ? true : false}
      >
        prev
      </button>
      <p className={styles.current}>{page}</p>
      <button
        className={styles.next}
        onClick={toNextPage}
        disabled={!nextPage ? true : false}
      >
        next
      </button>
    </nav>
  );
}

export default Pagination;
