import { useEffect } from 'react'
import { ChevronLeft } from 'lucide-react'
import { useNavigate, useParams } from 'react-router'

import RelatedBlogs from './RelatedBlogs'
import Container from '@/components/UI/Container'
import { BlocksRenderer } from '../components/NotionRender'

import { useGetBlocks } from '../hooks/useNotion'

export default function BlogDetails() {
  const { pageId } = useParams()
  const nav = useNavigate()
  const { data: blocks } = useGetBlocks(pageId || '', !!pageId)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <Container>
      <div className="flex flex-col gap-2 p-4">
        <div
          onClick={() => nav(-1)}
          className="flex flex-row gap-1 items-center cursor-pointer"
        >
          <ChevronLeft width={24} />
          <p className="font-bold! text-white">Back</p>
        </div>

        {blocks && <BlocksRenderer blocks={blocks.results} />}

        <RelatedBlogs />
      </div>
    </Container>
  )
}
