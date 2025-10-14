'use client'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { ChartConfig } from '@components/ui/chart'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@components/ui/select'
import { Tabs, TabsList, TabsTrigger } from '@components/ui/tabs'
import { MetricKey, METRICS } from '@constants/metrics'
import { ModeKey, MODES } from '@constants/modes'
import { mockPlayerData } from '@lib/mock-data'
import { useState } from 'react'
import { Chart } from './components/Chart'

export const PerformanceChart = () => {
	const [mode, setMode] = useState<ModeKey>('competitive')
	const [metric, setMetric] = useState<MetricKey>('acs')

	const players = Object.keys(mockPlayerData)

	const config = {
		TenZ: {
			label: 'TenZ',
			color: '#2563eb'
		},
		Aspas: {
			label: 'Aspas',
			color: '#f59e0b'
		}
	} satisfies ChartConfig

	const data: Record<string, number>[] = []

	for (const player of players) {
		const playerData = mockPlayerData[player as keyof typeof mockPlayerData]

		for (let i = 0; i < playerData.matches.length; i++) {
			const match = playerData.matches[i]

			if (data.length < i) {
				data.push({
					match: i,
					[player]: match[metric]
				})
			} else {
				data[i] = {
					...data[i],
					[player]: match[metric]
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
				<div className={'w-full md:w-1/5 py-4 md:py-0 my-auto'}>
					<div
						className={'h-full flex flex-row gap-4 items-center md:justify-center md:w-fit md:float-right'}
					>
						<Select value={mode} onValueChange={(value) => setMode(value as ModeKey)}>
							<SelectTrigger className="w-full border-primary/50 bg-primary/10 font-mono text-sm text-primary md:w-[180px] hover:cursor-pointer">
								<SelectValue placeholder={'Select a mode'} />
							</SelectTrigger>
							<SelectContent>
								{Object.keys(MODES).map((mode) => (
									<SelectItem value={mode} key={mode}>
										{MODES[mode as ModeKey].fullTitle}
									</SelectItem>
								))}
							</SelectContent>
						</Select>
					</div>
				</div>
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
