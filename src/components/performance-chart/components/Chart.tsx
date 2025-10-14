import { ChartConfig, ChartContainer } from '@components/ui/chart'
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from 'recharts'

interface ChartProps {
	config: ChartConfig
	data: Record<string, number>[]
}

export const Chart = ({ config, data }: ChartProps) => {
	return (
		<ChartContainer config={config} className="max-h-[400px] min-h-[100px] w-full">
			<LineChart accessibilityLayer data={data}>
				<CartesianGrid strokeDasharray="3 3" stroke="oklch(0.25 0.02 270)" opacity={0.3} />
				<XAxis
					dataKey="match"
					stroke="oklch(0.55 0.01 270)"
					tick={{ fill: 'oklch(0.55 0.01 270)', fontSize: 10 }}
					tickLine={{ stroke: 'oklch(0.25 0.02 270)' }}
				/>
				<YAxis
					stroke="oklch(0.55 0.01 270)"
					tick={{ fill: 'oklch(0.55 0.01 270)', fontSize: 10 }}
					tickLine={{ stroke: 'oklch(0.25 0.02 270)' }}
				/>
				<Line dataKey="TenZ" fill="var(--color-desktop)" radius={4} />
				<Line dataKey="Aspas" fill="var(--color-mobile)" radius={4} />
			</LineChart>
		</ChartContainer>
	)
}
