import { TextArea, Button } from "@moai/core"
import React from "react"
import { createNewWallet } from "utils/apis"
import { useRouter } from "next/router"

const NewWallet = () => {
  const router = useRouter()
  const [wallet, setWallet] = React.useState({})

  React.useEffect(async () => {
    const data = await createNewWallet(setWallet)
    window.localStorage.setItem("public_key", data.public_key)
  }, [])

  return (
    <div className="flex justify-center mt-10 lg:mt-20">
      <div className="w-screen max-w-screen-sm space-y-8">
        <div className="text-2xl font-semibold text-green-800 lg:text-4xl">
          Your new Wallet is here!
        </div>
        <div className="space-y-6">
          <div className="space-y-1">
            <strong className="text-sm text-gray-600">Address</strong>
            <TextArea
              rows={2}
              placeholder="Generating..."
              value={wallet.public_key}
            />
          </div>
          <div className="space-y-1">
            <strong className="text-sm text-gray-600">Private Key</strong>
            <TextArea
              rows={5}
              placeholder="Generating..."
              value={wallet.private_key}
            />
          </div>
        </div>
        <div className="text-sm font-semibold text-yellow-700">
          <span className="whitespace-nowrap">
            Please store it somewhere safe
          </span>
          , you CANNOT recover your wallet if you forgot your secret key
        </div>
        <div className="flex justify-center">
          <Button highlight onClick={() => router.push("/")}>
            Back to Home
          </Button>
        </div>
      </div>
    </div>
  )
}

export default NewWallet
