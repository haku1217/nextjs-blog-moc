import fetch from 'node-fetch'
import { esUrl } from './endpoint'

export type ElasticSearchResult<T> = {
  took: number
  timeed_out: boolean
  _shards: {
    total: number
    successful: number
    skipped: number
    failed: number
  }
  hits: {
    total: {
      value: number
      relation: number | string
    }
    max_score: number
    hits: {
      _id: string
      _index: string
      _score: number
      _type: string
      _source: T
    }[]
  }
}

type PromiseEsResult<T> = Promise<ElasticSearchResult<T>>

export async function fetchData<T = any>(params: any): PromiseEsResult<T> {

  const q = {
    query: {
      bool: {
        must: [
          {
            wildcard: {
              title: {
                value: '*サイバー*'
              }
            }
          }
        ]
      }
    }
  }
  const path = '/library/_search'
  const res = await fetch(`${esUrl}${path}`, {
    method: 'post',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(q)
  })
  return res.json()
}
