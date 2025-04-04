"use client"

import { useState, useEffect } from "react"
import ProductCard from "./ProductCard"
import Spinner from "./Spinner"
import Pagination from "./Pagination"

type Product = {
  id: number | string
  thumbnail: string
  title: string
  description: string
  price: number
  rating: number[] // Array of ratings, assuming multiple ratings
  brand: string
  category: string
}

const ProductListings = () => {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(30)
  // const [starterPageSize, setStarterPageSize] = useState(0)
  const [totalProducts, setTotalProducts] = useState(0)

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(`https://dummyjson.com/products?limit=0`)

        if (res.status !== 200) throw new Error("Failed to fetch the products")

        const data = await res.json()
        if (!loading) return

        setProducts(data!.products)
        setTotalProducts(data!.products.length)
      } catch (error) {
        console.log(error)
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [page, pageSize])

  const handlePageChange = (newPage: number) => {
    setPage(newPage)
  }

  const endIndex = pageSize * page
  const startIndex = endIndex - pageSize

  return loading ? (
    <Spinner loading={loading} />
  ) : (
    <div>
      <div className="grid lg:grid-cols-2 lg:gap-4 xl:grid-cols-3 xl:gap-6">
        {products && products.length > 0 ? (
          products
            .slice(startIndex, endIndex)
            .map((product) => <ProductCard key={product.id} product={product} />)
        ) : (
          <h2>Products Not Found!</h2>
        )}
      </div>
      <Pagination
        page={page}
        pageSize={pageSize}
        totalProducts={totalProducts}
        onPageChange={handlePageChange}
      />
    </div>
  )
}

export default ProductListings

// "use client"

// import { useState, useEffect } from "react"
// import ProductCard from "./ProductCard"
// import Spinner from "./Spinner"
// import Pagination from "./Pagination"

// type Products = [
//   id: number | string,
//   thumbnail: string,
//   title: string,
//   description: string,
//   price: number,
//   rating: [rating: number],
//   brand: string,
//   category: string
// ]

// const ProductListings = ({ allProducts }) => {
//   const [products, setProducts] = useState<Products[]>([])
//   const [loading, setLoading] = useState(true)

//   const [page, setPage] = useState(1)
//   const [pageSize, setPageSize] = useState(30)
//   // const [starterPageSize, setStarterPageSize] = useState(0)
//   const [totalProducts, setTotalProducts] = useState(0)

//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         const res = await fetch(
//           `https://dummyjson.com/products?limit=30&skip=${pageSize}`
//         )

//         if (res.status !== 200) throw new Error("Failed to fetch the products")

//         const data = await res.json()
//         if (!loading) return

//         setProducts(data!.products)
//       } catch (error) {
//         console.log(error)
//       } finally {
//         setLoading(false)
//       }
//     }

//     fetchProducts()
//   }, [pageSize, page])

//   console.log(products)

//   const totalPages = Math.ceil(allProducts.length / pageSize)

//   return loading ? (
//     <Spinner loading={loading} />
//   ) : (
//     <div>
//       <div>
//         {products && products.length > 0 ? (
//           products.map((product) => <ProductCard key={product.id} product={product} />)
//         ) : (
//           <h2>Products Not Found!</h2>
//         )}
//       </div>
//       <section className="flex justify-center items-center my-20 text-white">
//         {page !== 1 && (
//           <button
//             className="text-black bg-orange-500 px-3 py-1 rounded-md mx-5 cursor-pointer hover:scale-105 hover:bg-orange-600 transition duration-300 will-change-transform"
//             onClick={() => {
//               setPage((prev) => prev - 1)
//               setPageSize((prev) => prev - 30)
//             }}
//           >
//             prev
//           </button>
//         )}
//         {page} out of {totalPages}
//         {totalPages > page && (
//           <button
//             className="text-black bg-orange-500 px-3 py-1 rounded-md mx-5 cursor-pointer hover:scale-105 hover:bg-orange-600 transition duration-300 will-change-transform"
//             onClick={() => {
//               setPage((prev) => prev + 1)
//               setPageSize((prev) => prev + 30)
//             }}
//           >
//             next
//           </button>
//         )}
//       </section>
//     </div>
//   )
// }

// export default ProductListings
