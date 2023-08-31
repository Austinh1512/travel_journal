import Pagination from "react-bootstrap/Pagination";

export default function PaginationNav({
  totalPosts,
  postsPerPage,
  paginate,
  currentPage,
  setCurrentPage,
}) {
  const amountOfPages = Math.ceil(totalPosts / postsPerPage);

  const displayPaginationButtons = () => {
    const pageNumbers = [];
    for (let i = 1; i <= amountOfPages; ++i) {
      pageNumbers.push(i);
    }
    return pageNumbers.map((number) => {
      return (
        <Pagination.Item
          key={number}
          active={number === currentPage}
          onClick={() => paginate(number)}
          color="#F55A5A"
        >
          <span className="pagination--text">{number}</span>
        </Pagination.Item>
      );
    });
  };

  const handlePrevClick = () => {
    if (currentPage !== 1) setCurrentPage(currentPage - 1);
  };

  const handleNextClick = () => {
    if (currentPage !== amountOfPages) setCurrentPage(currentPage + 1);
  };

  return (
    <Pagination className="align-self-center">
      <Pagination.Prev color="#F55A5A" onClick={handlePrevClick} />
      {displayPaginationButtons()}
      <Pagination.Next color="#F55A5A" onClick={handleNextClick} />
    </Pagination>
  );
}
