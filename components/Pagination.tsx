const Pagination = ({ page, pageSize, totalProducts, onPageChange }: any) => {
  const totalPages = Math.ceil(totalProducts / pageSize)

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      onPageChange(newPage)
    }
  }

  return (
    <section className="flex justify-center items-center my-20 text-white">
      {page !== 1 && (
        <button
          className="text-black bg-orange-500 px-3 py-1 rounded-md mx-5 cursor-pointer hover:scale-105 hover:bg-orange-600 transition duration-300 will-change-transform"
          onClick={() => handlePageChange(page - 1)}
        >
          prev
        </button>
      )}
      {page} out of {totalPages}
      {totalPages > page && (
        <button
          className="text-black bg-orange-500 px-3 py-1 rounded-md mx-5 cursor-pointer hover:scale-105 hover:bg-orange-600 transition duration-300 will-change-transform"
          onClick={() => handlePageChange(page + 1)}
          disabled={page === totalPages || page > totalPages}
        >
          next
        </button>
      )}
    </section>
  )
}

export default Pagination
