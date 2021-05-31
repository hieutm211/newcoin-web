import { useRouter } from "next/router"
import React from "react"

const Signout = () => {
  const router = useRouter()
  React.useEffect(() => {
    window.localStorage.removeItem("public_key")
    window.location.href = "/"
  }, [])
  return null
}

export default Signout
