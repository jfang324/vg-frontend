'use client'
import { Card } from '@/components/ui/card'
import { CardContent } from '@components/ui/card'
import { ChartConfig } from '@components/ui/chart'
import { Checkbox } from '@components/ui/checkbox'
import { Label } from '@components/ui/label'
import { MatchPerformance } from '@lib/types/player'
import { calculateAgentMetrics, stringToColor } from '@lib/utils'
import { CheckedState } from '@radix-ui/react-checkbox'
import { useState } from 'react'
import { GraphMetrics } from '../../types/graph-metrics.type'
import { Chart } from './components/Chart'

interface RadarChartProps {
	metrics?: GraphMetrics
	matches: MatchPerformance[]
}

export const AgentRadarChart = ({
	metrics = { acs: 0, hs: 0, kd: 0, kda: 0, adr: 0, dd: 0 },
	matches
}: RadarChartProps) => {
	const [selectedAgents, setSelectedAgents] = useState<Set<string>>(new Set())

	const uniqueAgents = matches.reduce((acc, match) => {
		const agent = match.stats.agent.name
		if (!acc.has(agent)) {
			acc.add(agent)
		}
		return acc
	}, new Set<string>())

	const config = Array.from(uniqueAgents)
		.filter((agent) => selectedAgents.has(agent))
		.reduce((acc, agent) => {
			acc[agent] = {
				label: agent,
				color: stringToColor(agent)
			}
			return acc
		}, {} as ChartConfig)

	const handleSelectAgent = (checked: CheckedState, agent: string) => {
		if (checked) {
			setSelectedAgents((prev) => {
				const newSet = new Set(prev)
				newSet.add(agent)
				return newSet
			})
		} else {
			setSelectedAgents((prev) => {
				const newSet = new Set(prev)
				newSet.delete(agent)
				return newSet
			})
		}
	}

	const data = calculateAgentMetrics(matches, metrics, selectedAgents)

	return (
		<Card className={'w-full h-full md:flex-1 gap-2'}>
			<CardContent className={'tracking-tight flex flex-col md:flex-row h-full gap-2 md:gap-4'}>
				<div className={'flex flex-col gap-2 md:gap-4 tracking-tighter'}>
					<h1 className={'text-foreground text-xl font-semibold'}>PERFORMANCE OVERVIEW</h1>
					<div className={'flex flex-row flex-wrap md:flex-col gap-4 md:gap-2'}>
						{Array.from(uniqueAgents).map((agent) => (
							<div className={'flex flex-row gap-2'} key={agent}>
								<Checkbox
									className={'my-auto hover:cursor-pointer'}
									onCheckedChange={(checked) => handleSelectAgent(checked, agent)}
									checked={selectedAgents.has(agent)}
								/>
								<Label style={{ color: stringToColor(agent) }} className={'text-sm'}>
									{agent}
								</Label>
							</div>
						))}
					</div>
				</div>

				<Chart config={config} selectedAgents={Array.from(selectedAgents)} data={data} />
			</CardContent>
		</Card>
	)
}
