import React, { Fragment } from 'react'
import LazyLoad from 'react-lazyload'
import { BlockMath } from 'react-katex'

import { useGetBlocks } from '../hooks/useNotion'

type Annotation = {
  bold: boolean
  italic: boolean
  strikethrough: boolean
  underline: boolean
  code: boolean
  color: string // "default" | "red" | "blue_background" ...
}

type Text = {
  plain_text: string
  href: string | null
  annotations: Annotation
}

type ParagraphBlock = {
  type: 'paragraph'
  id: string
  has_children: boolean
  children?: Block[]
  paragraph: {
    rich_text: Text[]
    color: string
  }
}

type EquationBlock = {
  id: string
  type: 'equation'
  has_children?: boolean
  equation: {
    expression: string // LaTeX string
  }
}

type Heading1Block = {
  type: 'heading_1'
  id: string
  has_children: boolean
  children?: Block[]
  heading_1: {
    rich_text: Text[]
    color: string
    is_toggleable?: boolean
  }
}

type Heading2Block = {
  type: 'heading_2'
  id: string
  has_children: boolean
  children?: Block[]
  heading_2: {
    rich_text: Text[]
    color: string
    is_toggleable?: boolean
  }
}

type Heading3Block = {
  type: 'heading_3'
  id: string
  has_children: boolean
  children?: Block[]
  heading_3: {
    rich_text: Text[]
    color: string
    is_toggleable?: boolean
  }
}

type BulletedListItemBlock = {
  type: 'bulleted_list_item'
  id: string
  has_children: boolean
  children?: Block[]
  bulleted_list_item: {
    rich_text: Text[]
    color: string
  }
}

type NumberedListItemBlock = {
  type: 'numbered_list_item'
  id: string
  has_children: boolean
  children?: Block[]
  numbered_list_item: {
    rich_text: Text[]
    color: string
  }
}

type DividerBlock = {
  type: 'divider'
  id: string
  has_children: boolean
  children?: Block[]
  divider: object
}

type ImageBlock = {
  type: 'image'
  id: string
  has_children: boolean
  children?: Block[]
  image: {
    type: 'file' | 'external'
    caption: Text[]
    file?: {
      url: string
      expiry_time?: string
    }
    external?: {
      url: string
    }
  }
}

type QuoteBlock = {
  type: 'quote'
  id: string
  has_children: boolean
  children?: Block[]
  quote: {
    rich_text: Text[]
    color: string
  }
}

type CalloutBlock = {
  type: 'callout'
  id: string
  has_children: boolean
  children?: Block[]
  callout: {
    rich_text: Text[]
    icon?:
      | { type: 'emoji'; emoji: string }
      | { type: 'external'; external: { url: string } }
    color: string
  }
}
type TableRowBlock = {
  type: 'table_row'
  id: string
  has_children: boolean
  children?: Block[]
  table_row: {
    // mỗi cell là 1 mảng rich_text
    cells: Text[][]
  }
}
type TableBlock = {
  type: 'table'
  id: string
  has_children: boolean
  children?: Block[]
  table: {
    table_width: number
    has_column_header: boolean
    has_row_header: boolean
    // nếu bạn fetch children riêng thì có thể không có children ở đây,
    // tuỳ bạn gắn thêm field rows sau khi load
    rows?: TableRowBlock[]
  }
}

type CodeBlock = {
  type: 'code'
  id: string
  has_children: boolean
  children?: Block[]
  code: {
    rich_text: Text[]
    language: string // "javascript" | "solidity" | ...
  }
}

type Block =
  | ParagraphBlock
  | Heading2Block
  | Heading3Block
  | BulletedListItemBlock
  | NumberedListItemBlock
  | DividerBlock
  | ImageBlock
  | QuoteBlock
  | CalloutBlock
  | TableBlock
  | CodeBlock
  | Heading1Block
  | EquationBlock
  | TableRowBlock

/* =========================
 * Helper: map annotations -> className
 * ========================= */

function getAnnotationClassNames(a: Annotation): string {
  const classes: string[] = []

  if (a.bold) classes.push('font-bold')
  if (a.italic) classes.push('italic')
  if (a.underline) classes.push('underline')
  if (a.strikethrough) classes.push('line-through')

  // code text
  if (a.code) classes.push('px-1 py-0.5 text-sm rounded bg-slate-100 font-mono')

  // color (bạn tự map vào tailwind / css của bạn)
  if (a.color && a.color !== 'default') {
    // ví dụ: "red", "red_background", ...
    classes.push(`notion-color-${a.color}`)
  }

  return classes.join(' ')
}

/* =========================
 * RichTextRenderer
 * ========================= */

type RichTextRendererProps = {
  richText: Text[]
}

const RichTextRenderer: React.FC<RichTextRendererProps> = ({ richText }) => {
  return (
    <Fragment>
      {richText.map((t, i) => {
        const className = getAnnotationClassNames(t.annotations)

        const content = t.href ? (
          <a href={t.href} className={className}>
            {t.plain_text}
          </a>
        ) : (
          <span className={className}>{t.plain_text}</span>
        )

        if (t.annotations.code) {
          return (
            <code key={i} className={className}>
              {t.href ? <a href={t.href}>{t.plain_text}</a> : t.plain_text}
            </code>
          )
        }

        return <Fragment key={i}>{content}</Fragment>
      })}
    </Fragment>
  )
}

/* =========================
 * BlockRenderer: layout theo type
 * ========================= */

type BlockRendererProps = {
  block: Block
}

export const BlockRenderer: React.FC<BlockRendererProps> = ({ block }) => {
  switch (block.type) {
    case 'paragraph': {
      const b = block as ParagraphBlock
      return (
        <div>
          <span className="text-sm">
            <RichTextRenderer richText={b.paragraph.rich_text} />
          </span>
          {<RenderChildren block={block} />}
        </div>
      )
    }
    case 'heading_1': {
      const b = block as Heading1Block
      return (
        <div>
          <h1 className="my-4 font-semibold">
            <RichTextRenderer richText={b.heading_1.rich_text} />
          </h1>
          {<RenderChildren block={block} />}
        </div>
      )
    }

    case 'heading_2': {
      const b = block as Heading2Block
      return (
        <div>
          <h2 className="my-4 font-semibold">
            <RichTextRenderer richText={b.heading_2.rich_text} />
          </h2>
          {<RenderChildren block={block} />}
        </div>
      )
    }

    case 'heading_3': {
      const b = block as Heading3Block
      return (
        <div>
          <h3 className="my-3 text-xl font-semibold">
            <RichTextRenderer richText={b.heading_3.rich_text} />
          </h3>
          {<RenderChildren block={block} />}
        </div>
      )
    }

    case 'bulleted_list_item': {
      const b = block as BulletedListItemBlock
      return (
        <ul className="pv-ul list-disc pl-6 my-1">
          <li>
            <RichTextRenderer richText={b.bulleted_list_item.rich_text} />
            {/* nested list nằm trong <li> */}
            {<RenderChildren block={block} />}
          </li>
        </ul>
      )
    }

    case 'numbered_list_item': {
      const b = block as NumberedListItemBlock
      return (
        <ol className="pv-ol list-decimal pl-6 my-1">
          <li>
            <RichTextRenderer richText={b.numbered_list_item.rich_text} />
            {<RenderChildren block={block} />}
          </li>
        </ol>
      )
    }

    case 'divider': {
      return (
        <div>
          <div className="divider" />
          {<RenderChildren block={block} />}
        </div>
      )
    }

    case 'image': {
      const b = block as ImageBlock
      const url =
        b.image.type === 'file' ? b.image.file?.url : b.image.external?.url

      return (
        <div>
          <figure className=" my-4 flex flex-row justify-center">
            {url && (
              <img src={url} alt="" className="w-full md:w-2/3 aspect-auto" />
            )}
            {b.image.caption && b.image.caption.length > 0 && (
              <figcaption className="mt-2 text-sm text-slate-500">
                <RichTextRenderer richText={b.image.caption} />
              </figcaption>
            )}
          </figure>
          {<RenderChildren block={block} />}
        </div>
      )
    }

    case 'quote': {
      const b = block as QuoteBlock
      return (
        <div>
          <blockquote className="pv-quote border-l-4 border-slate-300 pl-4 italic my-3">
            <RichTextRenderer richText={b.quote.rich_text} />
          </blockquote>
          {<RenderChildren block={block} />}
        </div>
      )
    }

    case 'callout': {
      const b = block as CalloutBlock

      return (
        <div className="bg-[#1E221B] pb-2 flex flex-col">
          <div className="flex flex-row items-center  gap-3 p-3 rounded-lg my-3">
            {b.callout.icon?.type === 'emoji' && (
              <div className="text-2xl">{b.callout.icon.emoji}</div>
            )}
            {b.callout.icon?.type === 'external' && (
              <img src={b.callout.icon.external.url} className="w-8 h-8" />
            )}

            <div className="flex-1">
              <RichTextRenderer richText={b.callout.rich_text} />
            </div>
          </div>
          {<RenderChildren block={block} />}
        </div>
      )
    }

    case 'code': {
      const b = block as CodeBlock

      return (
        <div>
          <pre
            className={`
              pv-code-block my-3 rounded-lg p-3 overflow-x-auto
              bg-slate-900 text-slate-50 text-sm
            `}
          >
            <code data-language={b.code.language}>
              <RichTextRenderer richText={b.code.rich_text} />
            </code>
          </pre>
          {<RenderChildren block={block} />}
        </div>
      )
    }

    case 'table': {
      const b = block as TableBlock
      return <TableRenderer block={b} />
    }

    case 'equation': {
      const b = block as EquationBlock
      return (
        <div className="my-4 flex justify-center">
          <div className="inline-block  px-6 py-4 rounded">
            <BlockMath math={b.equation.expression} />
          </div>
        </div>
      )
    }

    default:
      return null
  }
}

/* =========================
 * BlocksRenderer: render list block
 * ========================= */

type BlocksRendererProps = {
  blocks: Block[]
}

const TableRenderer: React.FC<{ block: TableBlock }> = ({ block }) => {
  const { data: rowData } = useGetBlocks(block.id, true)
  const rows = rowData?.results ?? []
  if (!rows.length) return null

  const [firstRow, ...restRows] = rows
  const hasColumnHeader = block.table.has_column_header
  const hasRowHeader = block.table.has_row_header

  return (
    <div className="my-4 overflow-x-auto">
      <table className="table min-w-full border border-slate-200 border-collapse text-sm">
        {/* THEAD */}
        {hasColumnHeader && (
          <thead>
            <tr>
              {firstRow.table_row.cells.map((cell: any, idx: number) => (
                <th
                  key={idx}
                  className="border border-slate-200 px-3 py-2 text-left font-semibold"
                >
                  <RichTextRenderer richText={cell} />
                </th>
              ))}
            </tr>
          </thead>
        )}

        {/* TBODY */}
        <tbody>
          {(hasColumnHeader ? restRows : rows).map((row: any) => (
            <tr key={row.id}>
              {row.table_row.cells.map((cell: any, cellIndex: number) => {
                const isRowHeaderCell = hasRowHeader && cellIndex === 0

                if (isRowHeaderCell) {
                  return (
                    <th
                      key={cellIndex}
                      scope="row"
                      className="border border-slate-200 px-3 py-2 font-medium bg-slate-50"
                    >
                      <RichTextRenderer richText={cell} />
                    </th>
                  )
                }

                return (
                  <td
                    key={cellIndex}
                    className="border border-slate-200 px-3 py-2 align-top"
                  >
                    <RichTextRenderer richText={cell} />
                  </td>
                )
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

const RenderChildren = ({ block }: { block: Block }) => {
  const { data: blockData } = useGetBlocks(block.id, !!block.has_children)
  if (!block.has_children) return null

  return (
    <div className="ml-4 mt-1">
      {blockData &&
        blockData.results.map((child: any) => (
          <BlockRenderer key={child.id} block={child} />
        ))}
    </div>
  )
}

export const BlocksRenderer: React.FC<BlocksRendererProps> = ({ blocks }) => {
  return (
    <div>
      {blocks.map((block) => (
        <LazyLoad height={200} key={'block-page' + block.id}>
          <BlockRenderer block={block} />
        </LazyLoad>
      ))}
    </div>
  )
}
