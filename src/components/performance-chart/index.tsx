'use client'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { ChartConfig } from '@components/ui/chart'
import { Tabs, TabsList, TabsTrigger } from '@components/ui/tabs'
import { MetricKey, METRICS } from '@constants/metrics'
import { usePlayers } from '@hooks/usePlayers'
import { useState } from 'react'
import { Chart } from './components/Chart'

export const PerformanceChart = () => {
	const { players } = usePlayers()
	const [metric, setMetric] = useState<MetricKey>('acs')

	const visiblePlayers = players.filter((player) => player.metadata.visibility)

	const config = visiblePlayers.reduce((acc, player) => {
		acc[player.metadata.nameTag] = {
			label: player.metadata.nameTag,
			color: player.metadata.color
		}
		return acc
	}, {} as ChartConfig)

	const data: Record<string, number>[] = []

	for (const player of players) {
		const nameTag = player.metadata.nameTag
		const matches = player.matches

		for (let i = 0; i < matches.length; i++) {
			const match = matches[i]

			if (data.length < i + 1) {
				data.push({
					match: i + 1,
					[nameTag]: match[metric]
				})
			} else {
				data[i] = {
					...data[i],
					[nameTag]: match[metric]
				}
			}
		}
	}

	return (
		<Card className={'w-full'}>
			<CardHeader className={'flex flex-row flex-wrap w-full justify-between gap-2'}>
				<span className={'w-full md:w-3/5 tracking-tight md:tracking-normal'}>
					<h1 className={'font-mono text-2xl font-bold text-foreground'}>{METRICS[metric].fullTitle}</h1>
					<p className={'mt-1 text-sm text-muted-foreground'}>{METRICS[metric].description}</p>
				</span>
			</CardHeader>

			<CardContent className={'w-full flex flex-col gap-4'}>
				<Tabs value={metric} className={'w-full'} onValueChange={(value) => setMetric(value as MetricKey)}>
					<TabsList className={'w-full h-auto grid grid-cols-3 md:grid-cols-6'}>
						{Object.keys(METRICS).map((metric) => (
							<TabsTrigger key={metric} value={metric} className={'hover:cursor-pointer'}>
								{METRICS[metric as MetricKey].abbreviation}
							</TabsTrigger>
						))}
					</TabsList>
				</Tabs>

				<Chart config={config} data={data} />
			</CardContent>
		</Card>
	)
}
