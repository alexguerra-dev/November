import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
    title: 'November',
    description: 'November is a game played with five dice.',
}

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <html lang="en">
            <body>{children}</body>
        </html>
    )
}
