import { Badge } from '@components/ui/badge'
import { Card, CardContent, CardHeader } from '@components/ui/card'
import { Separator } from '@components/ui/separator'
import { MatchPerformance } from '@lib/types/player'

interface MapAgentsMetricsCardProps {
	matches: MatchPerformance[]
}

export const MapAgentsMetricsCard = ({ matches }: MapAgentsMetricsCardProps) => {
	const maps = new Map<string, { wins: number; losses: number }>()
	const agents = new Map<string, { wins: number; losses: number }>()

	for (const match of matches) {
		const map = match.map
		const agent = match.agent

		if (!maps.has(map.name)) {
			maps.set(map.name, { wins: 0, losses: 0 })
		}

		if (!agents.has(agent.name)) {
			agents.set(agent.name, { wins: 0, losses: 0 })
		}

		if (match.winningTeam === match.stats.team) {
			maps.get(map.name)!.wins++
			agents.get(agent.name)!.wins++
		} else {
			maps.get(map.name)!.losses++
			agents.get(agent.name)!.losses++
		}
	}

	return (
		<Card className={'w-full h-full md:flex-1 gap-2'}>
			<CardHeader className={'text-foreground text-xl font-semibold'}>MAP & AGENT STATS</CardHeader>
			<CardContent className={'text-xs tracking-tight flex flex-col gap-2 md:gap-4'}>
				<div className={'flex flex-col gap-0.5'}>
					<div className={'text-sm text-muted-foreground'}>MAPS</div>
					<div className={'flex flex-col gap-0.5'}>
						{[...maps.keys()].map((map) => {
							const { wins, losses } = maps.get(map)!
							const winRate = (wins / (wins + losses)) * 100

							return (
								<div key={map} className={'flex flex-row justify-between items-center'}>
									<div>{map}</div>
									<Badge
										variant={'outline'}
										className={`font-bold w-[50px] ${winRate > 50 ? 'border-green-500/50 bg-green-500/30 text-green-500' : 'border-red-500/50 bg-red-500/30 text-red-500'}`}
									>
										{winRate.toFixed(0)}%
									</Badge>
								</div>
							)
						})}
					</div>
				</div>

				<Separator className={'w-full'} />

				<div className={'flex flex-col gap-0.5'}>
					<div className={'text-sm text-muted-foreground'}>AGENTS</div>
					<div className={'flex flex-col gap-0.5'}>
						{[...agents.keys()].map((agent) => {
							const { wins, losses } = agents.get(agent)!
							const winRate = (wins / (wins + losses)) * 100

							return (
								<div key={agent} className={'flex flex-row justify-between items-center'}>
									<div>{agent}</div>
									<Badge
										variant={'outline'}
										className={`font-bold w-[50px] ${winRate > 50 ? 'border-green-500/50 bg-green-500/30 text-green-500' : 'border-red-500/50 bg-red-500/30 text-red-500'}`}
									>
										{winRate.toFixed(0)}%
									</Badge>
								</div>
							)
						})}
					</div>
				</div>
			</CardContent>
		</Card>
	)
}
