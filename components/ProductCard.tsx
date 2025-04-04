import Image from "next/image"
import Link from "next/link"

type Product = {
  id: number | string
  thumbnail: string
  title: string
  description: string
  price: number
  rating: number[]
  brand: string
  category: string
}

type Products = Product[]

const ProductCard = ({ product }: { product: Product }) => {
  return (
    <Link href={`products/${product.id}`}>
      <div className="p-2 bg-white my-3 rounded-lg font-mono text-sm text-black">
        <div className="flex flex-col justify-center items-center gap-2">
          <Image
            priority
            alt={`${product.category} thumbnail`}
            src={product.thumbnail}
            sizes="0wh"
            width={0}
            height={0}
            className="w-full"
          />
          <h4>Title: {product.title}</h4>
          <div>
            Category:{" "}
            {product.category
              .slice(0, 1)
              .toUpperCase()
              .concat(product.category.slice(1).toLowerCase())}
          </div>
          <div>Price - ${product.price}</div>
        </div>
      </div>
    </Link>
  )
}

export default ProductCard
