import { Badge } from '@components/ui/badge'
import { Card, CardContent, CardHeader } from '@components/ui/card'
import { Separator } from '@components/ui/separator'
import Image from 'next/image'
import { GraphMetrics } from '../types/graph-metrics.type'

interface AverageMetricsCardProps {
	metrics?: GraphMetrics
	winRate: number
	rank?: string
	rankImg?: string
}

export const AverageMetricsCard = ({
	metrics = { acs: 0, hs: 0, kd: 0, kda: 0, adr: 0, dd: 0 },
	winRate,
	rank = 'unrated',
	rankImg
}: AverageMetricsCardProps) => {
	const { acs, hs, kd, kda, adr, dd } = metrics

	return (
		<Card className={'w-full h-full md:flex-1 gap-2'}>
			<CardHeader className={'text-foreground text-xl font-semibold'}>AVERAGE METRICS</CardHeader>
			<CardContent className={'tracking-tight flex flex-col gap-2 md:gap-4 h-full'}>
				<div className={'text-sm grid grid-cols-2 gap-2 md:grid-cols-3 md:gap-4'}>
					<div className={'flex flex-col gap-0'}>
						<div className={'text-muted-foreground'}>ACS</div>
						<div className={'text-2xl font-bold'}>{acs.toFixed(2)}</div>
					</div>
					<div className={'flex flex-col gap-0'}>
						<div className={'text-muted-foreground'}>HS%</div>
						<div className={'text-2xl font-bold'}>{hs.toFixed(2)}%</div>
					</div>
					<div className={'flex flex-col gap-0'}>
						<div className={'text-muted-foreground'}>K/D</div>
						<div className={'text-2xl font-bold'}>{kd.toFixed(2)}</div>
					</div>
					<div className={'flex flex-col gap-0'}>
						<div className={'text-muted-foreground'}>KAD</div>
						<div className={'text-2xl font-bold'}>{kda.toFixed(2)}</div>
					</div>
					<div className={'flex flex-col gap-0'}>
						<div className={'text-muted-foreground'}>ADR</div>
						<div className={'text-2xl font-bold'}>{adr.toFixed(2)}</div>
					</div>
					<div className={'flex flex-col gap-0'}>
						<div className={'text-muted-foreground'}>DD</div>
						<div className={'text-2xl font-bold'}>{dd.toFixed(2)}</div>
					</div>
				</div>

				<div className={'flex flex-col gap-2 md:gap-4 mt-auto'}>
					<Separator className={'w-full'} />
					<div className={'text-sm w-full flex flex-col gap-2'}>
						<div className={'w-full flex flex-row justify-between items-center'}>
							<div className={'text-muted-foreground'}>Win Rate</div>
							<Badge
								variant={'outline'}
								className={`text-md font-bold ${winRate > 50 ? 'border-green-500/50 bg-green-500/30 text-green-500' : 'border-red-500/50 bg-red-500/30 text-red-500'}`}
							>
								{winRate.toFixed(0)}%
							</Badge>
						</div>
						<div className={'w-full flex flex-row justify-between items-center'}>
							<div className={'text-muted-foreground'}>Current Rank</div>
							<Badge variant={'outline'} className={'text-md font-bold'}>
								{rankImg ? (
									<Image
										src={rankImg}
										alt={'rank image'}
										height={20}
										width={20}
										className={'object-cover mr-1'}
									/>
								) : null}

								{rank}
							</Badge>
						</div>
					</div>
				</div>
			</CardContent>
		</Card>
	)
}
