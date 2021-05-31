import { BASE_URL } from "configs"

export const createNewWallet = async (callback) => {
  const res = await fetch(`${BASE_URL}/new-wallet`)
  const result = await res.json()
  callback(result)
  return result
}
