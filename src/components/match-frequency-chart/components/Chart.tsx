import { ChartContainer } from '@components/ui/chart'
import { CartesianGrid, Line, LineChart, Tooltip, TooltipProps, XAxis } from 'recharts'

type PlayFrequencyPoint = {
	date: string
	count: number
}

function CustomTooltip({ active, payload }: TooltipProps<number, string>) {
	if (!active || !payload?.length) return null

	const point = payload[0].payload as PlayFrequencyPoint
	const formattedDate = new Date(point.date).toLocaleDateString('en-US', {
		month: 'short',
		day: 'numeric',
		year: 'numeric'
	})

	return (
		<div className="rounded-md bg-[#0F1923]/95 border border-[#FF4655]/50 p-3 text-[#ECE8E1] shadow-lg">
			<p className="font-semibold text-[#FF4655]">{formattedDate}</p>
			<p>
				{point.count} match{point.count !== 1 ? 'es' : ''}
			</p>
		</div>
	)
}

interface MatchFrequencyChartProps {
	data: { date: string; count: number }[]
}

export const Chart = ({ data }: MatchFrequencyChartProps) => {
	return (
		<ChartContainer config={{}} className={'font-mono max-h-[250px] min-h-[100px] w-full'}>
			<LineChart accessibilityLayer data={data} margin={{ top: 5, right: 10, left: -20, bottom: 5 }}>
				<CartesianGrid strokeDasharray="3 3" />
				<Tooltip content={<CustomTooltip />} />
				<XAxis dataKey={'date'} tickFormatter={(date) => date.split('T')[0]} />
				<Line type={'linear'} dataKey={'count'} stroke={'red'} strokeWidth={1} opacity={0.75} dot={false} />
			</LineChart>
		</ChartContainer>
	)
}
