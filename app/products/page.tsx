import ProductListings from "@/components/ProductListings"
import ProductSearchForm from "@/components/ProductSearchForm"

// async function fetchProducts() {
//   try {
//     const res = await fetch("https://dummyjson.com/products?limit=0")

//     if (res.status !== 200) throw new Error("Failed to fetch the products")

//     return res.json()
//   } catch (error) {
//     console.log(error)
//   }
// }

const ProductsPage = async () => {
  // const products = await fetchProducts()
  // const allProducts = products.products

  // return <ProductListings allProducts={allProducts} />
  return <ProductListings />
}

export default ProductsPage
