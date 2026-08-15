import type { CollectionConfig } from 'payload'

export const Insights: CollectionConfig = {
  slug: 'insights',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'category', 'publishedAt', '_status'],
    listSearchableFields: ['title', 'excerpt', 'slug'],
    group: 'Content',
  },
  versions: {
    drafts: {
      autosave: { interval: 30000 },
    },
  },
  access: {
    read: ({ req: { user } }) => {
      if (user) return true
      // Public read: published only
      return { _status: { equals: 'published' } }
    },
  },
  hooks: {
    afterChange: [
      async ({ doc }) => {
        const url    = process.env.WEB_REVALIDATE_URL
        const secret = process.env.REVALIDATE_SECRET
        if (!url || !secret) return
        try {
          await fetch(url, {
            method:  'POST',
            headers: { 'Content-Type': 'application/json', 'x-revalidate-secret': secret },
            body:    JSON.stringify({ collection: 'insights', slug: doc.slug }),
          })
        } catch {
          // Don't fail document save if ISR revalidation is unreachable
        }
      },
    ],
  },
  fields: [
    {
      name:     'title',
      type:     'text',
      required: true,
    },
    {
      name:     'slug',
      type:     'text',
      required: true,
      unique:   true,
      index:    true,
      admin: {
        position:    'sidebar',
        description: 'Auto-generated from title. Editable once set.',
      },
      hooks: {
        beforeValidate: [
          ({ value, data }) => {
            if (value) return value
            return (data?.title as string | undefined)
              ?.toLowerCase()
              .replace(/[^a-z0-9]+/g, '-')
              .replace(/(^-|-$)/g, '')
          },
        ],
      },
    },
    {
      name:     'excerpt',
      type:     'textarea',
      required: true,
    },
    {
      name:     'body',
      type:     'richText',
      required: true,
    },
    {
      name:       'author',
      type:       'relationship',
      relationTo: 'team',
      admin:      { position: 'sidebar' },
    },
    {
      name:     'category',
      type:     'select',
      required: true,
      admin:    { position: 'sidebar' },
      options: [
        { label: 'Research',            value: 'Research'            },
        { label: 'SAP',                 value: 'SAP'                 },
        { label: 'AI & Data',           value: 'AI & Data'           },
        { label: 'Cloud',               value: 'Cloud'               },
        { label: 'Digital Engineering', value: 'Digital Engineering' },
        { label: 'Managed Services',    value: 'Managed Services'    },
        { label: 'Talent',              value: 'Talent'              },
      ],
    },
    {
      name:  'publishedAt',
      type:  'date',
      admin: {
        position:    'sidebar',
        date:        { pickerAppearance: 'dayAndTime' },
        description: 'Scheduled publish date and time.',
      },
    },
    {
      name:  'readTime',
      type:  'text',
      admin: { position: 'sidebar', description: 'e.g. "8 min read"' },
    },
    {
      name:       'image',
      type:       'upload',
      relationTo: 'media',
      required:   true,
    },
    {
      name:  'seo',
      type:  'group',
      label: 'SEO Override',
      admin: { description: 'Leave blank to use title and excerpt as defaults.' },
      fields: [
        { name: 'metaTitle',       type: 'text',     admin: { description: 'Defaults to article title.' } },
        { name: 'metaDescription', type: 'textarea', admin: { description: 'Defaults to excerpt.' } },
        { name: 'ogImage', type: 'upload', relationTo: 'media', admin: { description: 'Defaults to article image.' } },
      ],
    },
  ],
}
