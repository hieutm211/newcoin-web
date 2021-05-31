const getMessageEncoding = (message) => {
  return new TextEncoder().encode(message)
}
function arrayBufferToString(buf) {
  return String.fromCharCode.apply(null, new Uint8Array(buf))
}
const stringToArrayBuffer = (str) => {
  const buf = new ArrayBuffer(str.length)
  const bufView = new Uint8Array(buf)
  for (let i = 0, strLen = str.length; i < strLen; i++) {
    bufView[i] = str.charCodeAt(i)
  }
  return buf
}

/*
  Import a PEM encoded RSA private key, to use for RSA-PSS signing.
  Takes a string containing the PEM encoded key, and returns a Promise
  that will resolve to a CryptoKey representing the private key.
  */
const importPrivateKey = (privateKey) => {
  // fetch the part of the PEM string between header and footer
  const pemHeader = "-----BEGIN PRIVATE KEY-----\n"
  const pemFooter = "\n-----END PRIVATE KEY-----"
  if (privateKey.startsWith(pemHeader))
    privateKey = privateKey.substring(pemheader.length)
  if (privateKey.endsWith(pemFooter))
    privateKey = privateKey.substring(0, privateKey.length - pemFooter.length)

  privateKey = privateKey.split("\n").join("").trim()

  // base64 decode the string to get the binary data
  const binaryDerString = window.atob(privateKey)
  // convert from a binary string to an ArrayBuffer
  const binaryDer = stringToArrayBuffer(binaryDerString)

  return window.crypto.subtle.importKey(
    "pkcs8",
    binaryDer,
    {
      name: "RSA-PSS",
      // Consider using a 4096-bit key for systems that require long-term security
      modulusLength: 2048,
      publicExponent: new Uint8Array([1, 0, 1]),
      hash: "SHA-256",
    },
    true,
    ["sign"]
  )
}
export const signMessage = async (message, privateKey) => {
  const cryptoKey = await importPrivateKey(privateKey)

  const signature = await window.crypto.subtle.sign(
    {
      name: "RSA-PSS",
      saltLength: 32,
    },
    cryptoKey,
    getMessageEncoding(message)
  )

  return window.btoa(arrayBufferToString(signature))
}
