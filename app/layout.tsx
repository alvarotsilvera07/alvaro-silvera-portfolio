import './globals.css'
import type { Metadata } from 'next'
import { Inter, Bebas_Neue } from 'next/font/google'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
})

const bebasNeue = Bebas_Neue({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-bebas-neue',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Alvaro Silvera - PORTFOLIO',
  description: 'Software Developer Portfolio — Alvaro Silvera',
  icons: {
    icon: [
      { url: '/icon.png?v=2', type: 'image/png' }
    ],
    shortcut: '/icon.png',
    apple: '/apple-touch-icon.png',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es" className={`${inter.variable} ${bebasNeue.variable}`}>
      <body className={`${inter.className} relative overflow-x-hidden`}>
        <div className="vhs-grain-overlay" />
        {children}
      </body>
    </html>
  );
}

