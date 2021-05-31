import { useRouter } from "next/router"
import React from "react"

export const Index = () => {
  const router = useRouter()

  React.useEffect(() => {
    if (!window.localStorage.getItem("public_key")) {
      router.push("/signin")
    }
  }, [])
  return (
    <>
      <div className="w-screen max-w-screen-sm px-4 mx-auto mt-10">
        <div className="flex space-x-8">
          <div
            className="flex items-center justify-center w-1/2 h-32 text-2xl font-semibold text-blue-900 bg-blue-100 rounded cursor-pointer"
            onClick={() => router.push("/transaction")}
          >
            Transactions
          </div>{" "}
          <div
            className="flex items-center justify-center w-1/2 h-32 text-2xl font-semibold text-blue-900 bg-blue-100 rounded cursor-pointer "
            onClick={() => router.push("/mine")}
          >
            {" "}
            Mine block
          </div>
        </div>
      </div>
    </>
  )
}
export default Index
