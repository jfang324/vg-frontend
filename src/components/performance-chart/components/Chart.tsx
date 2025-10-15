import { ChartConfig, ChartContainer } from '@components/ui/chart'
import { CartesianGrid, Line, LineChart, Tooltip, XAxis, YAxis } from 'recharts'

interface ChartProps {
	config: ChartConfig
	data: Record<string, number>[]
}

export const Chart = ({ config, data }: ChartProps) => {
	const players = Object.keys(config)

	return (
		<ChartContainer config={config} className={'font-mono max-h-[400px] min-h-[100px] w-full'}>
			<LineChart accessibilityLayer data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
				<CartesianGrid strokeDasharray={'4 4'} stroke="oklch(0.25 0.02 270)" opacity={0.5} strokeWidth={0.5} />
				<XAxis
					dataKey={'match'}
					stroke={'oklch(0.55 0.01 270)'}
					tick={{ fill: 'oklch(0.55 0.01 270)', fontSize: 10 }}
					tickLine={{ stroke: 'oklch(0.25 0.02 270)' }}
				/>
				<YAxis
					stroke={'oklch(0.55 0.01 270)'}
					tick={{ fill: 'oklch(0.55 0.01 270)', fontSize: 10 }}
					tickLine={{ stroke: 'oklch(0.25 0.02 270)' }}
				/>
				{data.length > 0 && (
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
				)}
				{players.map((player) => (
					<Line dataKey={player} key={player} type={'monotone'} stroke={config[player].color} dot={false} />
				))}
			</LineChart>
		</ChartContainer>
	)
}
