import React from 'react'
import './styles.css'

export const metadata = {
  description:
    'A content management system for tryvion forms, insights, media and blogs website experiences.',
  title: 'Tryvion CMS',
  icons: {
    icon: '/favicon.svg',
  },
}

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props

  return (
    <html lang="en">
      <body>
        <main>{children}</main>
      </body>
    </html>
  )
}
