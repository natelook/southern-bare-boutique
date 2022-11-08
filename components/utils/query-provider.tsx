"use client"

import { QueryClientProvider, QueryClient } from "@tanstack/react-query"
import React from "react"

const queryClient = new QueryClient()

interface Props {
  children: React.ReactNode
}

export default function QueryProvider({ children }: Props) {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  )
}
