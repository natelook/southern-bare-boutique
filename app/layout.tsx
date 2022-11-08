import "../styles/globals.css"
import Header from "@components/header"
import Footer from "@components/footer"
import { getCollections } from "@lib/requests"
import CartState from "@components/cart-state"
import React from "react"
import QueryProvider from "@components/query-provider"

export default async function Layout({ children }: any) {
  const { data } = await getCollections()

  return (
    <html>
      <body>
        <QueryProvider>
          <CartState>
            <>
              <Header collections={data.collections.edges} />
              <div className="bg-white">{children}</div>
              <Footer />
            </>
          </CartState>
        </QueryProvider>
      </body>
    </html>
  )
}
