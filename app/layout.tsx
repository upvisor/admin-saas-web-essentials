"use client"
import './globals.css'
import { SessionProvider } from 'next-auth/react'
import { Navbar } from '@/components/layouts'
import { ThemeProvider } from 'next-themes'
import { LeftMenu } from '@/components/ui'
import localFont from 'next/font/local'
import { Chat } from '@/components/chat'

const myFont = localFont({
  src: './fonts/Montserrat-VariableFont_wght.ttf',
  display: 'swap',
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es" className={myFont.className}>
      <body>
        <SessionProvider>
          <ThemeProvider attribute='class'>
            <Chat />
            <Navbar>
              <LeftMenu>
                {children}
              </LeftMenu>
            </Navbar>
          </ThemeProvider>
        </SessionProvider>
      </body>
    </html>
  )
}
