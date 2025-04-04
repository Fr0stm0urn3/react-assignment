"use client"

import { useState, useEffect } from "react"
import ProductCard from "./ProductCard"
import Spinner from "./Spinner"
import { useRouter } from "next/navigation"
import { usePathname } from "next/navigation"

type Products = {
  id: number | string
  thumbnail: string
  title: string
  description: string
  price: number
  rating: number[]
  brand: string
  category: string
}

const ProductSearchForm = () => {
  const [searchQuery, setSearchQuery] = useState("")
  const [productTitle, setProductTitle] = useState("")
  const [products, setProducts] = useState<Products[]>([])
  const [loading, setLoading] = useState(true)
  const [hasSearched, setHasSearched] = useState(false)
  const [searchResults, setSearchResults] = useState<string[]>([])
  const [isOpen, setIsOpen] = useState(false)

  const pathname = usePathname()
  const router = useRouter()

  useEffect(() => {
    setSearchResults(JSON.parse(localStorage.getItem("Search Results") || "[]"))

    window.addEventListener("click", (event) => {
      const target = event.target as HTMLElement

      if (
        target.tagName !== "UL" &&
        target.tagName !== "LI" &&
        target.tagName !== "INPUT"
      ) {
        setIsOpen(false)
      }
    })
  }, [])

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(`https://dummyjson.com/products/search?q=${productTitle}`)
        if (res.status !== 200) throw new Error("Failed to fetch search results")

        const data = await res.json()
        setProducts(data.products)
      } catch (error) {
        console.log(error)
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [productTitle, searchResults, loading])

  const handleSubmit = (e: any) => {
    e.preventDefault()

    const trimmedQuery = searchQuery.trim()

    if (trimmedQuery !== "") {
      const storedResults = JSON.parse(localStorage.getItem("Search Results") || "[]")

      const updatedResults = [trimmedQuery, ...storedResults.slice(0, 4)]

      setSearchResults(updatedResults)
      localStorage.setItem("Search Results", JSON.stringify(updatedResults))
    }

    setHasSearched(true)
    setProductTitle(searchQuery)
    setSearchQuery("")
    if (pathname !== "/search" && trimmedQuery) {
      router.replace("/search")
    }
  }

  const isAuthPage = pathname === "/authentication"
  const isProductPage = /^\/products\/\d+$/.test(pathname)

  if (isAuthPage || isProductPage) return null

  return (
    <div>
      {pathname === "/search" && (
        <h2 className="text-2xl font-semibold text-center mb-20">Search Page</h2>
      )}
      <form onSubmit={handleSubmit} className="flex justify-center gap-3 mb-10 px-4">
        {pathname !== "/" ? (
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="text-black bg-white p-1 pl-1.5 rounded-md focus:outline-none"
            placeholder="Search by title..."
          />
        ) : (
          <div className="relative w-64">
            <input
              id="product"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => {
                setIsOpen(true)
              }}
              className="w-full bg-white text-black border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Select a product..."
            />
            {searchResults.length !== 0 && isOpen && (
              <ul className="absolute left-0 mt-1 w-full bg-white text-black border border-gray-300 rounded-lg shadow-lg z-10 scrollbar-hide">
                {searchResults.map((searchResult, i) => (
                  <li
                    key={i}
                    onMouseOver={() => setSearchQuery(searchResult)}
                    className="px-3 py-2 cursor-pointer hover:bg-gray-100 hover:rounded-t"
                  >
                    {searchResult}
                  </li>
                ))}
                <li
                  className="text-center text-sm px-3 py-2 cursor-pointer hover:bg-gray-100 border-t hover:rounded-b"
                  onClick={() => {
                    setSearchResults([])
                    setIsOpen(false)
                    setSearchQuery("")
                    localStorage.removeItem("Search Results")
                  }}
                >
                  Clear Recent Searches
                </li>
              </ul>
            )}
          </div>
        )}

        <button
          type="submit"
          className="text-black bg-white rounded-md px-3 py-1 hover:scale-105 transition will-change-transform cursor-pointer"
          onClick={() => setIsOpen(false)}
        >
          Submit
        </button>
      </form>
      {pathname === "/search" && (
        <div>
          {loading && <Spinner loading={loading} />}

          {hasSearched && products.length === 0 && (
            <h2 className="text-center">No Search Results.</h2>
          )}

          {products.length > 0 &&
            hasSearched &&
            products.map((product) => <ProductCard key={product.id} product={product} />)}
        </div>
      )}
    </div>
  )
}

export default ProductSearchForm
