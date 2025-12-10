import { Link } from 'react-router'
import dayjs from 'dayjs'
import clsx from 'clsx'

import { ArrowRight } from 'lucide-react'
import Corner from '@/components/UI/Corner'

import { CoreRoutes } from '@/constant/router'

export default function BlogCard({
  page,
  pined = false,
}: {
  page: any
  pined?: boolean
}) {
  const props = page.properties || {}
  const cover =
    page.cover?.type === 'file'
      ? page.cover.file.url
      : page.cover?.type === 'external'
      ? page.cover.external.url
      : null

  const tags = props['Tags']?.multi_select || []
  const publicDate = props['Public date']?.date?.start || ''
  const title = props['Name']?.title?.[0]?.plain_text || 'Untitled'
  const metaDesc = props['Meta Description']?.rich_text?.[0]?.plain_text || ''

  return (
    <Link
      to={CoreRoutes.blogDetails(page.id, { tag: tags?.[0] || '' })}
      className={clsx(
        'relative border border-base-100 p-4 flex flex-col gap-4 cursor-hover h-full',
        { 'flex-row gap-8': pined },
      )}
    >
      <Corner cornerClassName="h-1/12" />
      {/* "cover" */}
      <img
        src={cover}
        alt="cover-blog"
        className={clsx('w-full aspect-video border border-base-100', {
          'w-2/5!': pined,
        })}
      />
      <div className="flex flex-col gap-4">
        <div className="flex flex-row gap-2 items-center ">
          {/* multi_select */}
          {tags.map((tag: any) => (
            <p
              key={tag.name}
              className="badge rounded-none bg-[#B2E77B0D] text-primary"
            >
              {tag.name}
            </p>
          ))}
        </div>
        <p>
          <span className="text-secondary"> Public Date:</span>{' '}
          {dayjs(publicDate).format('MMM DD, YYYY')}
        </p>
        {/* title */}
        <h3 className="font-bold! text-white">{title}</h3>
        {/* Meta Description */}
        <p className="text-secondary font-medium leading-relaxed line-clamp-2 flex-1">
          {metaDesc}
        </p>
        <div className="flex flex-row gap-1">
          <p className="text-primary font-bold">LEARN MORE</p>
          <ArrowRight />
        </div>
      </div>
    </Link>
  )
}
