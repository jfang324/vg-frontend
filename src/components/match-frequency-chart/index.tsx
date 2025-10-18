import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Chart } from './components/Chart'

interface MatchFrequencyChartProps {
	data: { date: string; count: number }[]
}

export const MatchFrequencyChart = ({ data }: MatchFrequencyChartProps) => {
	return (
		<Card className={'w-full md:w-1/3 overflow-y-auto'} style={{ scrollbarWidth: 'none' }}>
			<CardHeader className={'flex flex-row justify-between items-center'}>
				<h1 className={'text-xl font-semibold text-nowrap'}>MATCH FREQUENCY</h1>
			</CardHeader>
			<CardContent className={'w-full'}>
				<Chart data={data} />
			</CardContent>
		</Card>
	)
}
