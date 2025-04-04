"use client"

import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import logo from "@/public/images/nextjs-icon-dark-background.png"
import { useRouter } from "next/navigation"
import { useAuth } from "@/context/GlobalContext"

const Navbar = () => {
  const pathname = usePathname()
  const { user } = useAuth()
  const router = useRouter()

  if (pathname === "/authentication") return null

  const logout = () => {
    if (user) {
      localStorage.clear()
      router.replace("/authentication")
    }
  }

  return (
    <nav className="container mx-auto w-full mb-20">
      <ul className="flex justify-between items-center list-none">
        <Link href="/">
          <Image priority alt="logo" src={logo} height={40} width={40} />
        </Link>
        <div className="ml-11 flex gap-8">
          <Link href="/" className={`${pathname === "/" ? "text-orange-400" : ""}`}>
            <li>Home</li>
          </Link>
          <Link
            href="/products"
            className={`${pathname === "/products" ? "text-orange-400" : ""}`}
          >
            <li>Products</li>
          </Link>
        </div>
        <button
          className="text-black bg-orange-500 px-4 py-2 rounded-lg font-semibold transition hover:scale-105 will-change-transform duration-500 cursor-pointer"
          onClick={logout}
        >
          Log Out
        </button>
      </ul>
    </nav>
  )
}

export default Navbar
