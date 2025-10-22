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
				className="font-mono w-screen flex flex-col gap-1 md:gap-2 min-h-screen p-8 md:px-16"
				style={{ touchAction: 'pan-y' }}
				{...bind()}
			>
				<Header />
				<AnalyticsCards />
				<PerformanceChart />
				<ChartControls />
			</main>
		</PlayersProvider>
	)
}
