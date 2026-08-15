import NextLink from 'next/link'
import Image from 'next/image'
import type { ReactNode } from 'react'
import { cn } from '@tryvion/utils'
import { Badge } from '../Badge/Badge'

export interface InsightCardImage {
  src: string
  alt: string
}

export interface InsightCardProps {
  category:   string
  title:      string
  excerpt?:   string
  date?:      string
  readTime?:  string
  image?:     InsightCardImage
  href:       string
  /** 'vertical' stacks image above content; 'horizontal' places them side-by-side */
  layout?:    'vertical' | 'horizontal'
  className?: string
}

function FormattedDate({ dateString }: { dateString: string }) {
  try {
    return (
      <time dateTime={dateString}>
        {new Date(dateString).toLocaleDateString('en-US', {
          year: 'numeric', month: 'short', day: 'numeric',
        })}
      </time>
    )
  } catch {
    return <span>{dateString}</span>
  }
}

export function InsightCard({
  category,
  title,
  excerpt,
  date,
  readTime,
  image,
  href,
  layout = 'vertical',
  className,
}: InsightCardProps) {
  const isHorizontal = layout === 'horizontal'

  return (
    <NextLink
      href={href}
      className={cn(
        'group flex rounded-[var(--radius-lg)] overflow-hidden',
        'bg-[var(--color-surface-default)]',
        'border border-[var(--color-border-default)]',
        'hover:border-[var(--color-border-strong)] hover:shadow-[var(--shadow-3)]',
        'transition-[border-color,box-shadow] duration-[var(--tryvion-duration-normal)]',
        'focus-visible:outline-2 focus-visible:outline-[var(--color-border-focus)] focus-visible:outline-offset-2',
        isHorizontal ? 'flex-row' : 'flex-col',
        className,
      )}
    >
      {/* Image */}
      <div
        className={cn(
          'relative overflow-hidden shrink-0 bg-[var(--color-surface-subtle)]',
          isHorizontal
            ? 'w-48 sm:w-56'
            : 'w-full aspect-[16/9]',
        )}
      >
        {image ? (
          <Image
            src={image.src}
            alt={image.alt}
            fill
            className="object-cover transition-transform duration-[var(--tryvion-duration-slow)] group-hover:scale-105"
            sizes={isHorizontal
              ? '(max-width: 640px) 192px, 224px'
              : '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw'
            }
          />
        ) : (
          // Gradient placeholder when no image is provided
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-br from-[var(--color-action-primary)]/20 to-[var(--color-brand-choice)]/10"
          />
        )}
      </div>

      {/* Content */}
      <div className="flex flex-col gap-3 p-5 flex-1 min-w-0">
        <Badge variant="primary" size="sm">{category}</Badge>

        <p className="text-[var(--text-body-md)] font-semibold text-[var(--color-content-primary)] leading-snug line-clamp-3 group-hover:text-[var(--color-action-primary)] transition-colors duration-[var(--tryvion-duration-fast)]">
          {title}
        </p>

        {excerpt && (
          <p className="text-[var(--text-body-sm)] text-[var(--color-content-secondary)] leading-relaxed line-clamp-2">
            {excerpt}
          </p>
        )}

        {/* Meta */}
        {(date || readTime) && (
          <div className="mt-auto flex items-center gap-3 text-[var(--text-ui-sm)] text-[var(--color-content-muted)]">
            {date && <FormattedDate dateString={date} />}
            {date && readTime && <span aria-hidden="true">·</span>}
            {readTime && <span>{readTime}</span>}
          </div>
        )}
      </div>
    </NextLink>
  )
}
