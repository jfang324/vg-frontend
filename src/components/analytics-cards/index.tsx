import { METRICS, MetricKey } from '@constants/metrics'
import { mockAnalytics } from '@lib/mock-data'
import { AnalyticCard } from './components/AnalyticCard'

export const AnalyticsCards = () => {
	return (
		<div className={'w-full grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-2 md:gap-4 py-2 md:py-4'}>
			{mockAnalytics.map(({ stat, average, highest, lowest, variance, unit }) => {
				const title = METRICS[stat as MetricKey].shorthand
				const Icon = METRICS[stat as MetricKey].icon

				return (
					<AnalyticCard
						key={stat}
						title={title}
						average={average}
						highest={{ value: highest, color: 'text-primary' }}
						lowest={{ value: lowest, color: 'text-primary' }}
						variance={variance}
						icon={<Icon className={'h-5 w-5'} />}
						unit={unit}
					/>
				)
			})}
		</div>
	)
}
