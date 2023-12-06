import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import CommandPallet from '@/components/CommandPallet'

import {projects} from '../data.js'



const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'command pallet',
  description: 'assignment',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <CommandPallet projects={projects}/>
        {children}
        </body>
    </html>
  )
}
