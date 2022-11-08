import Link from "next/link"
import PageContainer from "@components/page-container"
import { getCollections } from "@lib/requests"

export default async function CollectionsPage() {
  const {
    data: {
      collections: { edges: collections },
    },
  } = await getCollections()
  return (
    <PageContainer>
      <div className="text-center">
        <h1 className="text-5xl font-bold text-gray-900 font-sacramento mb-5">
          Categories
        </h1>
        <ul className="text-black text-xl space-y-5">
          {collections.map(({ node }) => (
            <li key={node.id}>
              <Link href={`/categories/${node.handle}`}>{node.title}</Link>
            </li>
          ))}
        </ul>
      </div>
    </PageContainer>
  )
}
