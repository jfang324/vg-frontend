'use client'
import { AnalyticsCards } from '@components/analytics-cards'
import { Header } from '@components/Header'
import { PerformanceChart } from '@components/performance-chart'
import { useGestures } from '@components/sidebar'

export default function Home() {
	const bind = useGestures()

	return (
		<main
			className="font-sans w-full min-h-screen items-center justify-items-center px-16 py-8"
			{...bind()}
			style={{ touchAction: 'none' }}
		>
			<Header />
			<AnalyticsCards />
			<PerformanceChart />
		</main>
	)
}
