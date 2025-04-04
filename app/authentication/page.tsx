import Authentication from "@/components/Authentication"

const fetchServerMessage = async () => {
  try {
    const res = await fetch("https://dummyjson.com/auth")

    const data = await res.json()

    return data
  } catch (error) {
    console.log(error)
  }
}

const AuthenticationPage = async () => {
  const message = await fetchServerMessage()

  return <Authentication serverErrorMessage={message} />
}

export default AuthenticationPage
