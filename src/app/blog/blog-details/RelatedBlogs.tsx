import { useParams, useSearchParams } from 'react-router'

import BlogCard from '../components/BlogCard'

import { SearchQueryKey } from '@/constant/query'
import { useQueryDataSources } from '../hooks/useNotion'

export default function RelatedBlogs() {
  const [searchParams] = useSearchParams()
  const { pageId } = useParams()
  const tag = searchParams.get(SearchQueryKey.BlogTag) || undefined
  const { data: sources } = useQueryDataSources({ tag })
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
      <h2 className="col-span-full">Related Blogs</h2>
      {sources &&
        sources.items
          .filter(({ id }: any) => id !== pageId)
          .map((page: any) => <BlogCard page={page} key={page.id} />)}
    </div>
  )
}
