import { Autoplay, Navigation } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useSearchParams } from 'react-router'

import Container from '@/components/UI/Container'
import Corner from '@/components/UI/Corner'
import BlogCard from './components/BlogCard'

import { SearchQueryKey } from '@/constant/query'
import { useUpdateSearchParams } from '@/hooks/updateSearchParams'
import { useGetDataSources, useQueryDataSources } from './hooks/useNotion'

export default function BlogPage() {
  const [searchParams] = useSearchParams()
  const tag = searchParams.get(SearchQueryKey.BlogTag) || undefined

  const { data: sources } = useQueryDataSources({ tag })

  return (
    <Container innerClassName="min-h-[100dvh]">
      <div className="flex flex-col gap-16 px-4 py-16">
        <div className="flex flex-col gap-2  justify-center items-center">
          <span className="text-3xl md:text-7xl">
            PRIME <span className="text-primary">BLOG</span>
          </span>
          <h4 className="text-secondary">
            Discover Prime Vaults, explore how it works, and stay updated with
            our latest insights and developments.
          </h4>
        </div>
        <PinnedPosts />
        <div className="grid grid-cols-1 md:grid-cols-3 p-4 gap-4">
          <TagList />
          {sources && !sources.items.length && (
            <div className="flex flex-row col-span-full p-16 justify-center items-center">
              <p className="text-secondary">No Blogs</p>
            </div>
          )}
          {sources &&
            sources.items.map((page: any) => (
              <BlogCard page={page} key={page.id} />
            ))}
        </div>
      </div>
    </Container>
  )
}

const PinnedPosts = () => {
  const { data: sources } = useQueryDataSources({ pinned: true })
  return (
    <div className="w-full relative">
      <div className="border border-base-100 p-1 bg-[#023026] cursor-pointer pined-swiper-indicator-prev absolute top-1/2 -left-4 z-10 -translate-y-1/2">
        <ChevronLeft size={20} />
      </div>
      {sources && (
        <Swiper
          slidesPerView={1}
          modules={[Navigation, Autoplay]}
          navigation={{
            nextEl: '.pined-swiper-indicator-next',
            prevEl: '.pined-swiper-indicator-prev',
          }}
          autoplay={{ delay: 8000 }}
          loop
          pagination={{
            clickable: true,
            el: 'swiper-pagination',
          }}
        >
          {sources.items.map((page: any, idx: number) => {
            return (
              <SwiperSlide key={idx}>
                <BlogCard page={page} key={page.id + 'pinned'} pined />
              </SwiperSlide>
            )
          })}
        </Swiper>
      )}
      <div className="border border-base-100 p-1 bg-[#023026] cursor-pointer pined-swiper-indicator-next absolute top-1/2 -right-4 z-10 -translate-y-1/2">
        <ChevronRight size={20} />
      </div>
    </div>
  )
}

const TagList = () => {
  const [searchParams] = useSearchParams()
  const tag = searchParams.get(SearchQueryKey.BlogTag) || undefined
  const { update } = useUpdateSearchParams()
  const { data: datasources } = useGetDataSources()

  return (
    <div className="col-span-full ">
      <div className="flex">
        {datasources && (
          <div className="border border-base-100 bg-[#171717]">
            {datasources.properties.Tags.multi_select.options.map((t: any) => {
              const active = t.name === tag
              return (
                <button
                  key={t.name}
                  className={`tab tab-lifted  px-3  py-2.5 font-medium transition-colors duration-100  ${
                    active ? '!text-primary bg-base-200' : ''
                  }`}
                  onClick={() => update(SearchQueryKey.BlogTag, t.name)}
                >
                  {t.name}
                  {active && <Corner />}
                </button>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
