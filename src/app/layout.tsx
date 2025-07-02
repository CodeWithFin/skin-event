import './globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Vitapharm Beauty & Academy Launch - July 5, 2025',
  description: 'Join us for the Vitapharm Beauty & Academy Launch Event - Beauty, Learning & Fun! Features real-time schedule, photo gallery, shopping, games, and more.',
  keywords: 'vitapharm, beauty, academy, launch, event, skincare, makeup, consultation, shopping',
  authors: [{ name: 'Vitapharm Beauty & Health' }],
  viewport: 'width=device-width, initial-scale=1',
  themeColor: '#6B3F27',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>💄</text></svg>" />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  )
}
