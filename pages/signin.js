import React from "react"
import { useRouter } from "next/router"
import { TextArea, Button } from "@moai/core"

const Index = () => {
  const router = useRouter()
  const [publicKey, setPublicKey] = React.useState("")

  return (
    <div className="flex justify-center min-h-screen mt-10 lg:mt-20">
      <div className="w-screen max-w-screen-sm space-y-8">
        <div className="text-4xl text-center">Sign in to New Wallet</div>
        <div>
          <TextArea
            rows={5}
            placeholder="Paste your Public Key here..."
            value={publicKey}
            setValue={setPublicKey}
          />
        </div>
        <div className="flex flex-col items-center justify-center space-y-4">
          <Button
            highlight
            onClick={() => {
              window.localStorage.setItem("public_key", publicKey)
              window.location.href = "/"
            }}
          >
            Login to New Wallet
          </Button>
          <div>
            <Button
              style={{
                busy: {
                  color: {
                    container: "circle-module__neutral__3CTje",
                    head: "circle-module__head__1MWY1",
                    track: "circle-module__track__joCcU",
                  },
                  highlightColor: {
                    container: "circle-module__highlight__1XLD5",
                    head: "circle-module__head__1MWY1",
                    track: "circle-module__track__joCcU",
                  },
                },
                highlight: "flat-module__highlight__1PZre",
                main: "flat-module__main__dyQIK",
                selected: "flat-module__selected__33YeQ",
              }}
              onClick={() => router.push("/new-wallet")}
            >
              New user? Create a new wallet now!
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Index
