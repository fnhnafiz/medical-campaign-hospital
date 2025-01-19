const Pagination = ({
  totalPosts,
  postsPerPage,
  setCurrentPage,
  currentPage,
}) => {
  let pages = [];
  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pages.push(i);
  }
  // console.log("I am pages", pages);

  const handlePageClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  return (
    <div className="py-10">
      {pages.map((page, index) => {
        return (
          <button
            key={index}
            onClick={() => handlePageClick(page)}
            className={`px-4 py-2 mx-1 border rounded-full transition-colors duration-300 ${
              currentPage === page
                ? "bg-green-600 text-white"
                : "bg-white text-green-600 border-green-600 hover:bg-green-100"
            }`}
          >
            {page}
          </button>
        );
      })}
    </div>
  );
};

export default Pagination;
