"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"

interface AuthenticationProps {
  serverErrorMessage: any
}

const Authentication: React.FC<AuthenticationProps> = ({ serverErrorMessage }) => {
  const [user, setUser] = useState<string | null>(null)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const router = useRouter()
  const [emailError, setEmailError] = useState(false)
  const [passwordError, setPasswordError] = useState(false)

  useEffect(() => {
    const storedUser = localStorage.getItem("user")
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
  }, [])

  const handleLogin = () => {
    if (email.split("@").slice(1).includes("gmail.com") && password) {
      const userData: string = email // ⬅ Explicitly set type to string
      localStorage.setItem("user", JSON.stringify(userData))
      setUser(userData)
      setEmailError(false)
      setPasswordError(false)
      router.replace("/")
    } else {
      if (!email.split("@").slice(1).includes("gmail.com")) {
        setEmailError(true)
      }

      if (!password) {
        setPasswordError(true)
      }
    }
  }

  return (
    <div className="text-black flex justify-center items-center  min-h-screen">
      <div className="text-black bg-gray-100 p-8 px-14 rounded shadow-md w-[550px]">
        <h2 className="text-black text-xl font-bold mb-2">Login</h2>
        {emailError && (
          <div className="text-red-500 w-full">
            Please fill in the correct email using @gmail.com
          </div>
        )}
        <input
          type="text"
          placeholder="Email"
          value={email}
          onChange={(e) => {
            return setEmail(e.target.value)
          }}
          className="text-black w-full p-2 border rounded mb-2"
        />
        {passwordError && (
          <div className="text-red-500 w-full">The Password field is empty</div>
        )}
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="text-black w-full p-2 border rounded mb-4"
        />
        {!emailError || passwordError || (
          <div className="text-center text-red-500 mb-2">
            {serverErrorMessage.message}
          </div>
        )}
        <button
          className="text-black font-semibold w-full px-4 py-2 bg-pink-500 rounded hover:bg-pink-600 hover:scale-105 transition duration-300 will-change-transform "
          onClick={handleLogin}
        >
          Login
        </button>
      </div>
    </div>
  )
}

export default Authentication
