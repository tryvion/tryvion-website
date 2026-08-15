import NextLink from 'next/link';
import Image from 'next/image';
import type { ReactNode } from 'react';
import { cn } from '@tryvion/utils';
import { Badge } from '../Badge/Badge';

// ---------------------------------------------------------------------------
// Image types
//
// The CMS/application may provide an image as either:
//
//   image="https://example.com/image.jpg"
//
// or:
//
//   image={{
//     src: "https://example.com/image.jpg",
//     alt: "Description"
//   }}
//
// Supporting both formats avoids forcing existing page implementations
// to change while retaining the richer object format.
// ---------------------------------------------------------------------------

export interface InsightCardImage {
  src: string;
  alt: string;
}

export type InsightCardImageInput = InsightCardImage | string;

// ---------------------------------------------------------------------------
// Props
// ---------------------------------------------------------------------------

export interface InsightCardProps {
  category: string;

  title: string;

  excerpt?: string;

  /**
   * Display date for the insight card.
   */
  date?: string;

  /**
   * Publication date supplied by CMS/API.
   *
   * Kept separate from `date` for backwards compatibility with
   * existing page-level data mappings.
   */
  publishedAt?: string;

  readTime?: string;

  /**
   * Supports both a complete image object and a plain image URL.
   */
  image?: InsightCardImageInput;

  href: string;

  /**
   * 'vertical' stacks image above content.
   * 'horizontal' places image beside content.
   */
  layout?: 'vertical' | 'horizontal';

  className?: string;
}

// ---------------------------------------------------------------------------
// Date formatting
// ---------------------------------------------------------------------------

function FormattedDate({ dateString }: { dateString: string }) {
  try {
    return (
      <time dateTime={dateString}>
        {new Date(dateString).toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'short',
          day: 'numeric',
        })}
      </time>
    );
  } catch {
    return <span>{dateString}</span>;
  }
}

// ---------------------------------------------------------------------------
// Image normalization
// ---------------------------------------------------------------------------

function normalizeImage(image: InsightCardImageInput | undefined): InsightCardImage | undefined {
  if (!image) {
    return undefined;
  }

  if (typeof image === 'string') {
    return {
      src: image,
      alt: '',
    };
  }

  return image;
}

// ---------------------------------------------------------------------------
// InsightCard
// ---------------------------------------------------------------------------

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
  const isHorizontal = layout === 'horizontal';

  const normalizedImage = normalizeImage(image);

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
          isHorizontal ? 'w-48 sm:w-56' : 'w-full aspect-[16/9]',
        )}
      >
        {normalizedImage ? (
          <Image
            src={normalizedImage.src}
            alt={normalizedImage.alt}
            fill
            className="object-cover transition-transform duration-[var(--tryvion-duration-slow)] group-hover:scale-105"
            sizes={
              isHorizontal
                ? '(max-width: 640px) 192px, 224px'
                : '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw'
            }
          />
        ) : (
          // Gradient placeholder when no image is provided.
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-br from-[var(--color-action-primary)]/20 to-[var(--color-brand-choice)]/10"
          />
        )}
      </div>

      {/* Content */}
      <div className="flex flex-col gap-3 p-5 flex-1 min-w-0">
        <Badge variant="primary" size="sm">
          {category}
        </Badge>

        <p
          className={cn(
            'text-[var(--text-body-md)]',
            'font-semibold',
            'text-[var(--color-content-primary)]',
            'leading-snug',
            'line-clamp-3',
            'group-hover:text-[var(--color-action-primary)]',
            'transition-colors duration-[var(--tryvion-duration-fast)]',
          )}
        >
          {title}
        </p>

        {excerpt && (
          <p
            className={cn(
              'text-[var(--text-body-sm)]',
              'text-[var(--color-content-secondary)]',
              'leading-relaxed',
              'line-clamp-2',
            )}
          >
            {excerpt}
          </p>
        )}

        {/* Meta */}
        {(date || readTime) && (
          <div
            className={cn(
              'mt-auto flex items-center gap-3',
              'text-[var(--text-ui-sm)]',
              'text-[var(--color-content-muted)]',
            )}
          >
            {date && <FormattedDate dateString={date} />}

            {date && readTime && <span aria-hidden="true">·</span>}

            {readTime && <span>{readTime}</span>}
          </div>
        )}
      </div>
    </NextLink>
  );
}
