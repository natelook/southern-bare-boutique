"use client"

import Head from "next/head"

interface MetaProps {
  title?: string
}

export default function Meta({ title }: MetaProps) {
  return (
    <Head>
      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href="/favicon/apple-touch-icon.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href="/favicon/favicon-32x32.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href="/favicon/favicon-16x16.png"
      />
      <link rel="manifest" href="/favicon/site.webmanifest" />
      <link
        rel="mask-icon"
        href="/favicon/safari-pinned-tab.svg"
        color="#9a918d"
      />
      <meta name="msapplication-TileColor" content="#9f00a7" />
      <meta name="theme-color" content="#ffffff" />
      <title>{title && `${title} | `}Southern Bare Boutique</title>
    </Head>
  )
}
