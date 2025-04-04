"use client"

import { usePathname } from "next/navigation"

const Footer = () => {
  const currYear = new Date().getFullYear()
  const pathname = usePathname()

  if (pathname === "/authentication") return

  return (
    <footer className="mt-10">Next.Js Copy &copy;. React Assignment {currYear}</footer>
  )
}

export default Footer
