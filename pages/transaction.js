import {
  Input,
  Table,
  Button,
  Radio,
  TextArea,
  Dialog,
  Paragraph,
} from "@moai/core"
import React from "react"
import classnames from "classnames"
import { BASE_URL } from "configs"

const Stats = (props) => {
  const { name, value, type } = props
  return (
    <React.Fragment>
      <div className="p-4 border shadow-sm" style={{ minWidth: 150 }}>
        <div className="text-sm font-semibold text-gray-600 uppercase">
          {name}
        </div>
        <div
          className={classnames("mt-2 text-2xl font-semibold", {
            "text-gray-900": type === "normal",
            "text-green-700": type === "positive",
            "text-red-700": type === "negative",
          })}
        >
          {value}
        </div>
      </div>
    </React.Fragment>
  )
}

const Index = () => {
  const [dialog, setDialog] = React.useState({})
  const [receiver, setReceiver] = React.useState("")
  const [amount, setAmount] = React.useState(0)
  const [inputMethod, setInputMethod] = React.useState("text")
  const [privateKey, setPrivateKey] = React.useState("")
  const [error, setError] = React.useState(null)
  const [balance, setBalance] = React.useState({
    total: 0,
    income: 0,
    outcome: 0,
  })
  const [transactions, setTransactions] = React.useState({
    pending: [],
    success: [],
  })

  React.useEffect(() => {
    // fetch balance
    ;(async function () {
      const res = await fetch(`${BASE_URL}/balance`, {
        method: "POST",
        body: JSON.stringify({
          address: window.localStorage.getItem("public_key"),
        }),
      })
      const balance = await res.json()
      setBalance(balance)
    })()

    //fetch transactions
    ;(async function () {
      const res = await fetch(`${BASE_URL}/transactions`, {
        method: "POST",
        body: JSON.stringify({
          address: window.localStorage.getItem("public_key"),
        }),
      })
      const transactions = await res.json()
      setTransactions(transactions)
    })()
  }, [])
  const handleSubmit = React.useCallback(
    async (event) => {
      setError(null)
      event.preventDefault()
      const transaction = {
        sender: window.localStorage.getItem("public_key"),
        receiver,
        amount,
      }
      const response = await fetch(`${BASE_URL}/new_transaction`, {
        method: "POST",
        body: JSON.stringify({ transaction, private_key: privateKey }),
      })
      if (response.status === 200) {
        setBalance((value) => ({
          ...value,
          total: value.total - amount,
          income: value.income + amount,
          outcome: value.outcome + amount,
        }))
        setTransactions((value) => ({
          ...value,
          pending: [transaction, ...value.pending],
        }))
        setDialog({
          name: "Success",
          content: "Your transaction was added to queue.",
        })
      } else {
        const body = await response.json()
        setError(body.detail[0])
        setDialog({ name: "There was an error", content: body.detail[0] })
      }
    },
    [receiver, amount, privateKey]
  )

  const closeDialog = () => setDialog({})

  return (
    <>
      {dialog.name && (
        <Dialog onEsc={closeDialog}>
          <Dialog.Body>
            <Dialog.Title>{dialog.name}</Dialog.Title>
            <Paragraph>{dialog.content}</Paragraph>
          </Dialog.Body>
          <Dialog.Footer>
            <Button minWidth highlight onClick={closeDialog} autoFocus>
              OK
            </Button>
          </Dialog.Footer>
        </Dialog>
      )}
      <div className="w-screen max-w-screen-sm px-4 mx-auto mt-10">
        <div className="flex space-x-8">
          <Stats name="Balance" type="normal" value={`$${balance.total}`} />
          <Stats name="Income" type="positive" value={`$${balance.income}`} />
          <Stats name="Outcome" type="negative" value={`$${balance.outcome}`} />
        </div>
        <div className="mt-20">
          <form onSubmit={handleSubmit}>
            <div className="w-screen max-w-screen-sm space-y-4">
              <div className="text-lg font-semibold text-gray-700 uppercase">
                Transfer Money
              </div>
              <div>
                Receiver's ID:
                <TextArea
                  rows={2}
                  value={receiver}
                  setValue={setReceiver}
                  required
                />
              </div>
              <div>
                Amount:{" "}
                <Input
                  type="number"
                  value={amount}
                  setValue={(value) => setAmount(parseInt(value, 10))}
                  required
                />
              </div>
              <div className="flex space-x-4">
                <Radio
                  checked={inputMethod === "file"}
                  name="input_method_file"
                  value="file"
                  setValue={setInputMethod}
                >
                  Upload Key
                </Radio>
                <Radio
                  checked={inputMethod === "text"}
                  name="input_method_file"
                  value="text"
                  setValue={setInputMethod}
                  required
                >
                  Input Key
                </Radio>
              </div>
              <div>
                {inputMethod === "text" && (
                  <TextArea
                    rows={5}
                    placeholder="Generating..."
                    value={privateKey}
                    setValue={setPrivateKey}
                  />
                )}
                {inputMethod === "file" && "Implementing..."}
              </div>
              {error && <div className="text-sm text-red-700">{error}</div>}
              <div>
                <Button type="submit" highlight>
                  Transfer
                </Button>
              </div>
            </div>
          </form>
          <div className="mt-20">
            <div className="w-screen max-w-screen-md space-y-4 ">
              <div className="text-lg font-semibold text-gray-700 uppercase">
                Transactions
              </div>
              <div className="w-screen max-w-screen-sm">
                <Table
                  rows={[
                    ...transactions.pending.map((el) => {
                      const senderJSON = JSON.stringify(el.sender)
                      const receiverJSON = JSON.stringify(el.receiver)
                      const publicKeyJSON = JSON.stringify(
                        window.localStorage.getItem("public_key")
                      )
                      return {
                        ...el,
                        sender:
                          senderJSON === publicKeyJSON
                            ? "You"
                            : `${el.sender.slice(0, 30)}...`,
                        receiver:
                          receiverJSON === publicKeyJSON
                            ? "You"
                            : `${el.receiver.slice(0, 30)}...`,
                        status: "pending",
                      }
                    }),
                    ...transactions.success.map((el) => {
                      const senderJSON = JSON.stringify(el.sender)
                      const receiverJSON = JSON.stringify(el.receiver)
                      const publicKeyJSON = JSON.stringify(
                        window.localStorage.getItem("public_key")
                      )
                      return {
                        ...el,
                        sender:
                          senderJSON === publicKeyJSON
                            ? "You"
                            : `${el.sender.slice(0, 30)}...`,
                        receiver:
                          receiverJSON === publicKeyJSON
                            ? "You"
                            : `${el.receiver.slice(0, 30)}...`,
                        status: "success",
                      }
                    }),
                  ]}
                  rowKey={(row, index) => index}
                  columns={[
                    { title: "Status", render: "status" },
                    { title: "Sender", render: "sender" },
                    { title: "Receiver", render: "receiver" },
                    { title: "Amount", render: "amount" },
                  ]}
                  fill
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Index
