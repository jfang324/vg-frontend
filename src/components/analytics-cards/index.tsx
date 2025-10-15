'use client'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@components/ui/dialog'
import { Spinner } from '@components/ui/spinner'
import { METRICS, MetricKey } from '@constants/metrics'
import { usePlayers } from '@hooks/usePlayers'
import { useEffect, useState } from 'react'
import { PlayerAnalytics } from '../../types/player-analytics.type'
import { AnalyticCard } from './components/AnalyticCard'

export const AnalyticsCards = () => {
	const { isLoading, players, calculatePerformanceAnalytics } = usePlayers()
	const [analytics, setAnalytics] = useState<PlayerAnalytics>({} as PlayerAnalytics)
	const [dialogOpen, setDialogOpen] = useState(false)
	const [dialogData, setDialogData] = useState<{
		metric: MetricKey
		data: { nameTag: string; color: string; value: number }[]
	}>({ metric: 'acs', data: [] })

	useEffect(() => {
		const analytics = calculatePerformanceAnalytics()

		setAnalytics(analytics)
	}, [players, calculatePerformanceAnalytics])

	const handleDialogOpen = (metric: MetricKey) => {
		const metadata = players.map((player) => player.metadata)
		const performanceData = players.map((player) => player.matches)

		const data = []

		for (let i = 0; i < metadata.length; i++) {
			const nameTag = metadata[i].nameTag
			const color = metadata[i].color
			const totalValue = performanceData[i].reduce((acc, match) => acc + match[metric], 0)

			data.push({
				nameTag,
				color,
				value: totalValue / performanceData[i].length
			})
		}

		data.sort((a, b) => b.value - a.value)

		setDialogOpen(true)
		setDialogData({
			metric,
			data
		})
	}

	const DialogIcon = METRICS[dialogData.metric].icon

	return (
		<div className={'w-full grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-2 md:gap-4'}>
			{Object.keys(analytics).map((stat) => {
				const title = METRICS[stat as MetricKey].shorthand
				const Icon = METRICS[stat as MetricKey].icon
				const { average, highest, lowest, variance } = analytics[stat as MetricKey]

				return (
					<div
						key={stat}
						className={`relative items-center justify-center ${isLoading ? 'pointer-events-none opacity-50' : null}`}
					>
						<AnalyticCard
							title={title}
							average={average}
							highest={{ value: highest, color: 'text-primary' }}
							lowest={{ value: lowest, color: 'text-primary' }}
							variance={variance}
							icon={<Icon className={'h-5 w-5'} />}
							unit={stat === 'hs' ? '%' : undefined}
							onClick={() => handleDialogOpen(stat as MetricKey)}
						/>

						{isLoading ? <Spinner className={'absolute inset-0 h-1/2 w-1/2 my-auto mx-auto'} /> : null}
					</div>
				)
			})}
			<Dialog open={dialogOpen} onOpenChange={(open) => !open && setDialogOpen(false)}>
				<DialogContent className="border-border bg-card sm:max-w-md">
					<DialogHeader>
						<DialogTitle className={'w-full items-center'}>
							<span className={'w-fit flex flex-row gap-3 mx-auto'}>
								<DialogIcon className={'h-5 w-5'} />
								{`${METRICS[dialogData.metric].shorthand} RANKINGS`}
							</span>
						</DialogTitle>
					</DialogHeader>

					<div className={'w-full space-y-2'}>
						{dialogData.data.map((player, index) => (
							<div key={player.nameTag} className={'w-full flex justify-between font-mono text-lg'}>
								<div className={'flex flex-row items-center gap-2 my-auto'}>
									<span className="font-bold text-muted-foreground">#{index + 1}</span>
									<div
										className={'h-3 w-3 rounded-full border-black border-[1px]'}
										style={{ backgroundColor: player.color }}
									/>
									<span className={'text-sm text-muted-foreground'}>{player.nameTag}</span>
								</div>
								<span className={'text-sm text-foreground my-auto'}>{player.value.toFixed(2)}</span>
							</div>
						))}
					</div>
				</DialogContent>
			</Dialog>
		</div>
	)
}
