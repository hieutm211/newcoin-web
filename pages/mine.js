import React from "react"
import { Button } from "@moai/core"
import { BASE_URL } from "configs"

export const Mine = () => {
  const [data, setData] = React.useState([])
  const [error, setError] = React.useState("")
  const handleMine = async () => {
    const res = await fetch(`${BASE_URL}/mine_block`, {
      method: "POST",
      body: JSON.stringify({
        address: window.localStorage.getItem("public_key"),
      }),
    })
    if (res.status === 200) {
      const result = await res.json()
      setData((value) => [...value, result])
      setError("")
    } else {
      setError("There is no block to mine!")
    }
  }
  return (
    <>
      <div className="w-screen max-w-screen-sm px-4 mx-auto mt-10">
        <Button highlight onClick={handleMine}>
          Mine a new Block
        </Button>
        {error && <div className="mt-4 text-red-800">{error}</div>}
        {data.map((el) => (
          <div
            key={el.index}
            className="p-6 mt-10 space-y-2 border rounded shadow"
          >
            <div>
              <strong>Block index:</strong> {el.index}
            </div>
            <div>
              <strong>Previous Hash:</strong>
              <span className="text-xs"> {el.previous_hash}</span>
            </div>
            <div>
              <strong>Transactions:</strong>
              <div className="px-8 py-4 divide-y-4">
                {el.transactions.map((trans) => (
                  <div className="py-4 space-y-2">
                    <div>
                      <div>
                        <strong>Sender:</strong>
                      </div>
                      <span className="text-xs">{trans.sender}</span>
                    </div>
                    <div>
                      <div>
                        <strong>Receiver:</strong>
                      </div>
                      <span className="text-xs">{trans.receiver}</span>
                    </div>
                    <div>
                      <div>
                        <strong>Amount:</strong>
                      </div>
                      <span className="text-xs">{trans.amount}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  )
}
export default Mine
