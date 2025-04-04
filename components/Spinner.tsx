"use client"

import ClipLoader from "react-spinners/ClipLoader"

type SpinnerProps = {
  loading: boolean
}

const override = {
  display: "block",
  margin: "150px auto",
}
const Spinner = ({ loading }: SpinnerProps) => {
  return (
    <ClipLoader
      loading={loading}
      color="#444"
      cssOverride={override}
      size={150}
      aria-label="Loading Spinner"
    />
  )
}

export default Spinner
