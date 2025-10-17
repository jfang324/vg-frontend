import { ChartConfig, ChartContainer } from '@components/ui/chart'
import { stringToColor } from '@lib/utils'
import { PolarAngleAxis, PolarGrid, Radar, RadarChart, Tooltip } from 'recharts'

interface ChartProps {
	config: ChartConfig
	selectedAgents?: string[]
	data: { metric: string }[]
}

export const Chart = ({ config, selectedAgents = [], data }: ChartProps) => {
	return (
		<ChartContainer config={config} className={'font-mono h-full md:max-h-[400px] md:min-h-[100px] w-full mx-auto'}>
			<RadarChart data={data} accessibilityLayer margin={{ top: 0, bottom: 0 }}>
				<PolarAngleAxis dataKey={({ metric }) => metric.toUpperCase()} />
				<PolarGrid />
				<Tooltip
					contentStyle={{
						backgroundColor: 'oklch(0.15 0.02 270)',
						border: '1px solid oklch(0.25 0.02 270)',
						borderRadius: '4px',
						color: 'oklch(0.95 0.01 270)',
						fontSize: '12px'
					}}
					labelFormatter={() => ''}
					formatter={(value: number) => value.toFixed(2)}
					separator={': '}
				/>
				<Radar name={'all'} dataKey={'all'} stroke={'red'} fill={'red'} fillOpacity={0.25} strokeWidth={1} />
				{selectedAgents.map((agent) => {
					return (
						<Radar
							key={agent}
							name={agent}
							dataKey={agent}
							stroke={stringToColor(agent)}
							fill={stringToColor(agent)}
							fillOpacity={0.25}
							strokeWidth={1}
						/>
					)
				})}
			</RadarChart>
		</ChartContainer>
	)
}
