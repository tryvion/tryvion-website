import type { GlobalConfig } from 'payload'

export const SiteSettings: GlobalConfig = {
  slug:  'site-settings',
  label: 'Site Settings',
  admin: { group: 'Configuration' },
  access: { read: () => true },
  fields: [
    {
      name:  'announcementBar',
      type:  'group',
      label: 'Announcement Bar',
      fields: [
        { name: 'enabled',  type: 'checkbox', defaultValue: false },
        { name: 'message',  type: 'text' },
        { name: 'ctaLabel', type: 'text', admin: { condition: (data) => data?.announcementBar?.enabled } },
        { name: 'ctaHref',  type: 'text', admin: { condition: (data) => data?.announcementBar?.enabled } },
        {
          name:    'variant',
          type:    'select',
          options: [
            { label: 'Info',    value: 'info'    },
            { label: 'Warning', value: 'warning' },
            { label: 'Success', value: 'success' },
          ],
          defaultValue: 'info',
        },
      ],
    },
    {
      name:  'company',
      type:  'group',
      label: 'Company Info',
      fields: [
        { name: 'name',    type: 'text',    defaultValue: 'TRYVION' },
        { name: 'tagline', type: 'text' },
        { name: 'email',   type: 'email',   defaultValue: 'hello@tryvion.com' },
        { name: 'phone',   type: 'text' },
        { name: 'address', type: 'textarea' },
      ],
    },
    {
      name:  'social',
      type:  'array',
      label: 'Social Links',
      fields: [
        {
          name:    'platform',
          type:    'select',
          options: [
            { label: 'LinkedIn', value: 'linkedin' },
            { label: 'X / Twitter', value: 'twitter' },
            { label: 'GitHub',   value: 'github'   },
            { label: 'YouTube',  value: 'youtube'  },
          ],
        },
        { name: 'url',   type: 'text' },
        { name: 'label', type: 'text', admin: { description: 'Accessible label for screen readers' } },
      ],
    },
    {
      name:  'cookieBanner',
      type:  'group',
      label: 'Cookie Consent Banner',
      fields: [
        { name: 'enabled', type: 'checkbox', defaultValue: true },
        { name: 'message', type: 'textarea', defaultValue: 'We use cookies to improve your experience and analyse site usage. See our Privacy Policy for details.' },
      ],
    },
    {
      name:  'legalLinks',
      type:  'array',
      label: 'Footer Legal Links',
      admin: { description: 'Overrides hard-coded footer legal links when populated.' },
      fields: [
        { name: 'label', type: 'text' },
        { name: 'href',  type: 'text' },
      ],
    },
  ],
}
