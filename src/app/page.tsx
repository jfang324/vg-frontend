'use client'
import { statIcons, Stats } from '@/types/stats.enum'
import { Header } from '@components/Header'
import { useGestures } from '@components/sidebar'
import { StatCard } from '@components/StatCard'
import { mockAnalytics } from '@lib/mock-data'

export default function Home() {
	const bind = useGestures()

	return (
		<main
			className="font-sans w-full min-h-screen items-center justify-items-center p-8"
			{...bind()}
			style={{ touchAction: 'none' }}
		>
			<Header />
			<div
				className={
					'w-full grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-2 md:gap-4 px-4 md:px-8 py-2 md:py-4'
				}
			>
				{mockAnalytics.map(({ stat, average, highest, lowest, variance, unit }) => {
					const title = Stats[stat as keyof typeof Stats]
					const Icon = statIcons[stat as keyof typeof Stats]

					return (
						<StatCard
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
		</main>
	)
}
