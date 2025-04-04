"use client"

import Image from "next/image"
import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import { FaStar } from "react-icons/fa"
import Spinner from "./Spinner"

type Product = {
  thumbnail: string
  title: string
  description: string
  price: number
  rating: number
  brand: string
  tags: [string]
}

const ProductListing = () => {
  const { id } = useParams<{ id: string }>()
  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`https://dummyjson.com/products/${id}`)

        if (res.status !== 200) throw new Error("Failed to fetch the product data...")

        const data = await res.json()

        setProduct(data)
      } catch (error) {
        console.log(error)
      } finally {
        setLoading(false)
      }
    }

    fetchProduct()
  }, [id])

  return loading ? (
    <Spinner loading={loading} />
  ) : product ? (
    <div className="flex justify-center items-center gap-4">
      <Image
        priority
        src={product.thumbnail}
        alt={product.title}
        width={400}
        height={400}
      />
      <div className="flex flex-col gap-4">
        <h3 className="text-lg  font-semibold">Title: {product.title}</h3>

        <p className="max-w-[700px]">
          Description: <span className="text-[15px]">{product.description}</span>
        </p>
        <p>
          {" "}
          Rating: <FaStar className="inline-block mb-1.5 mr-1 text-yellow-500" />
          {product.rating}/5
        </p>
        <p>
          Price: <span className="text-green-600">$</span>
          {product.price}
        </p>
        <p>
          {product.brand ? "Brand" : "Tags"}:{" "}
          {product.brand ? product.brand : product.tags}
        </p>
      </div>
    </div>
  ) : (
    <h4 className="text-center text-lg font-semibold">Product Not Found!</h4>
  )
}

export default ProductListing
