import Image from 'next/image'
import { cn } from '@tryvion/utils'

export interface TestimonialAuthor {
  name:      string
  title:     string
  company?:  string
  image?:    { src: string; alt: string }
}

export interface TestimonialProps {
  quote:       string
  author:      TestimonialAuthor
  variant?:    'default' | 'large' | 'card'
  /** Dark background version */
  inverted?:   boolean
  className?:  string
}

export function Testimonial({
  quote,
  author,
  variant  = 'default',
  inverted = false,
  className,
}: TestimonialProps) {
  return (
    <figure
      className={cn(
        'flex flex-col',
        variant === 'card' && [
          'p-8 rounded-[var(--radius-xl)]',
          inverted
            ? 'bg-[var(--color-surface-dark)] border border-white/10'
            : 'bg-[var(--color-surface-subtle)] border border-[var(--color-border-default)]',
        ],
        variant === 'large' && 'items-center text-center',
        className,
      )}
    >
      {/* Open-quote mark */}
      <span
        aria-hidden="true"
        className={cn(
          'block font-[var(--tryvion-font-primary)] text-[5rem] leading-none mb-2 select-none',
          inverted ? 'text-[var(--color-brand-choice)]' : 'text-[var(--color-action-primary)]',
          variant === 'large' ? 'text-[7rem]' : 'text-[4rem]',
        )}
      >
        &ldquo;
      </span>

      {/* Quote */}
      <blockquote
        className={cn(
          'font-[var(--tryvion-font-tertiary)] font-normal italic leading-relaxed mb-8',
          variant === 'large'
            ? 'text-[var(--text-display-sm)] lg:text-[var(--text-display-md)]'
            : 'text-[var(--text-body-xl)]',
          inverted ? 'text-[var(--color-content-inverse)]' : 'text-[var(--color-content-primary)]',
          'border-none p-0 m-0',
        )}
      >
        {quote}
      </blockquote>

      {/* Author */}
      <figcaption className={cn(
        'flex items-center gap-4',
        variant === 'large' && 'flex-col',
      )}>
        {author.image && (
          <div className="relative w-12 h-12 rounded-full overflow-hidden shrink-0 bg-[var(--color-surface-subtle)]">
            <Image
              src={author.image.src}
              alt={author.image.alt}
              fill
              className="object-cover"
              sizes="48px"
            />
          </div>
        )}
        <div className={cn(variant === 'large' && 'text-center')}>
          <p className={cn(
            'text-[var(--text-ui-md)] font-semibold',
            inverted ? 'text-[var(--color-content-inverse)]' : 'text-[var(--color-content-primary)]',
          )}>
            {author.name}
          </p>
          <p className={cn(
            'text-[var(--text-ui-sm)]',
            inverted ? 'text-white/60' : 'text-[var(--color-content-secondary)]',
          )}>
            {author.title}{author.company ? `, ${author.company}` : ''}
          </p>
        </div>
      </figcaption>
    </figure>
  )
}
