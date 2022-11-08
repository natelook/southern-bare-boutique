import "../styles/globals.css"
import Header from "@components/ui/header"
import Footer from "@components/ui/footer"
import { getCollections } from "@lib/requests"
import CartState from "@components/cart/state"
import React from "react"
import QueryProvider from "@components/utils/query-provider"

export default async function Layout({ children }: any) {
  const { collections } = await getCollections()

  return (
    <html>
      <body>
        <QueryProvider>
          <CartState>
            <>
              <Header collections={collections.edges} />
              <div className="bg-white">{children}</div>
              <Footer />
            </>
          </CartState>
        </QueryProvider>
      </body>
    </html>
  )
}
