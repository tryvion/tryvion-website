import type { CollectionConfig } from 'payload'

export const Team: CollectionConfig = {
  slug: 'team',
  admin: {
    useAsTitle:     'name',
    defaultColumns: ['name', 'role'],
    group:          'Content',
  },
  access: { read: () => true },
  fields: [
    { name: 'name',  type: 'text',  required: true },
    { name: 'role',  type: 'text',  required: true },
    { name: 'bio',   type: 'textarea' },
    {
      name:       'avatar',
      type:       'upload',
      relationTo: 'media',
    },
    {
      name:  'linkedin',
      type:  'text',
      admin: { description: 'LinkedIn profile URL (full URL including https://)' },
    },
    { name: 'email', type: 'email' },
  ],
}
