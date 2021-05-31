import "tailwindcss/tailwind.css"
import "@moai/core/dist/bundle.css"
import "@moai/core/dist/font/remote.css"
import React from "react"
import { useRouter } from "next/router"
import { Button } from "@moai/core"

function MyApp({ Component, pageProps }) {
  const router = useRouter()
  const [isLoggedIn, setIsLoggedIn] = React.useState(true)

  React.useEffect(() => {
    if (!window.localStorage.getItem("public_key")) {
      setIsLoggedIn(false)
    }
  }, [])

  return (
    <React.Fragment>
      <div className="shadow">
        <div className="flex items-center justify-between w-screen max-w-screen-xl px-4 mx-auto lg:px-0">
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
            onClick={() => router.push("/")}
          >
            <span className="py-2 text-lg font-semibold">New Wallet</span>
          </Button>

          <div>
            {isLoggedIn && (
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
                onClick={() => router.push("/signout")}
              >
                <span className="font-semibold">Sign Out</span>
              </Button>
            )}
          </div>
        </div>
      </div>
      <Component {...pageProps} />
    </React.Fragment>
  )
}

export default MyApp
