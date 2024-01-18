"use client"
import { Montserrat, Poppins } from 'next/font/google'
import './globals.css'
import { SessionProvider } from 'next-auth/react'
import { Navbar } from '@/components/layouts'
import { ThemeProvider } from 'next-themes'
import { LeftMenu } from '@/components/ui'

const poppins = Poppins({
  weight: ['300', '400', '500', '600'],
  preload: false,
  subsets: ['latin']
})

const montserrat = Montserrat({
  weight: ['300', '400', '500', '600', '700'],
  preload: false,
  subsets: ['latin']
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <SessionProvider>
          <ThemeProvider attribute='class'>
            <Navbar>
              <LeftMenu>
                <style jsx global>{`
                  p, span, button, a, input, textarea, select, td {
                    font-family: ${poppins.style.fontFamily};
                  }
                  h1, h2, h3, h4, h5, th {
                    font-family: ${montserrat.style.fontFamily};
                  }
                `}</style>
                {children}
              </LeftMenu>
            </Navbar>
          </ThemeProvider>
        </SessionProvider>
      </body>
    </html>
  )
}
