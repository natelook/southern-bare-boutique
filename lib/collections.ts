import { COLLECTIONS } from '../graphql/queries'
import client from './apollo'
import { Collections } from './types'

export async function getCollections(): Promise<Collections[]> {
  const { data } = await client.query({ query: COLLECTIONS })
  return data.collections.edges
}
