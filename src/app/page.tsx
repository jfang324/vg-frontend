'use client'
import { AnalyticsCards } from '@components/analytics-cards'
import { ChartControls } from '@components/chart-controls'
import { Header } from '@components/Header'
import { PerformanceChart } from '@components/performance-chart'
import { PlayersProvider } from '@components/providers/PlayersProvider'
import { useGestures } from '@components/sidebar'

export default function Home() {
	const bind = useGestures()

	return (
		<PlayersProvider>
			<main
				className="font-sans w-screen flex flex-col gap-2 md:gap-4 min-h-screen items-center justify-items-center px-8 md:px-16 py-8"
				{...bind()}
				style={{ touchAction: 'none' }}
			>
				<Header />
				<AnalyticsCards />
				<PerformanceChart />
				<ChartControls />
			</main>
		</PlayersProvider>
	)
}
