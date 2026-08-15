import { Section, Container, Stack, Skeleton } from '@tryvion/ui'

// Shown during any top-level route transition while the page chunk loads.
// Approximate the InteriorHero + content grid layout to minimise visual shift.
export default function Loading() {
  return (
    <>
      {/* InteriorHero skeleton */}
      <div className="border-b border-border-subtle bg-surface-subtle">
        <Section spacing="md" background="transparent">
          <Container size="xl" padded>
            <Stack direction="vertical" gap={4}>
              {/* Breadcrumb */}
              <Stack direction="horizontal" gap={2}>
                <Skeleton variant="text" className="h-3 w-12" />
                <Skeleton variant="text" className="h-3 w-3" />
                <Skeleton variant="text" className="h-3 w-20" />
              </Stack>
              {/* Eyebrow */}
              <Skeleton variant="text" className="h-3 w-28" />
              {/* Title */}
              <Skeleton variant="text" className="h-10 w-2/3" />
              {/* Description */}
              <Stack direction="vertical" gap={2}>
                <Skeleton variant="text" className="h-5 w-full max-w-xl" />
                <Skeleton variant="text" className="h-5 w-4/5 max-w-lg" />
              </Stack>
            </Stack>
          </Container>
        </Section>
      </div>

      {/* Content area skeleton */}
      <Section spacing="xl" background="default">
        <Container size="xl" padded>
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <Stack key={i} direction="vertical" gap={4}>
                <Skeleton variant="rect" className="h-48 w-full" />
                <Skeleton variant="text" className="h-5 w-3/4" />
                <Skeleton variant="text" lines={3} />
              </Stack>
            ))}
          </div>
        </Container>
      </Section>
    </>
  )
}
