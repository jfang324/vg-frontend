import { GlobalProvider } from '@components/providers/GlobalProvider'
import { AppSidebar } from '@components/sidebar'
import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'

const geistSans = Geist({
	variable: '--font-geist-sans',
	subsets: ['latin']
})

const geistMono = Geist_Mono({
	variable: '--font-geist-mono',
	subsets: ['latin']
})

export const metadata: Metadata = {
	title: 'ValoGraphs - Performance Analytics for Valorant',
	description:
		'Track and graph your Valorant performance data. Visualize stats, analyze gameplay, and improve your skills with detailed charts. Track your stats now!',
	keywords: 'Valorant stats, track performance, graph stats, improve gameplay, analyze Valorant',
	icons: {
		icon: '/valorant-icon.svg'
	}
}

export default function RootLayout({
	children
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<GlobalProvider>
			<AppSidebar />

			<html lang="en" className={'valorant'}>
				<body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>{children}</body>
			</html>
		</GlobalProvider>
	)
}
