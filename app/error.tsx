"use client"

import { useEffect } from "react"

export default function Error({ error, reset }: any) {
  useEffect(() => console.log({ error }), [error])
  return (
    <div className="container">
      <h1>Something went wrong</h1>
      <div>{JSON.stringify(error, null, 2)}</div>
    </div>
  )
}
