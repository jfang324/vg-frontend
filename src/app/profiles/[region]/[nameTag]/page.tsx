'use client'
import { AverageMetricsCard } from '@components/AverageMetricsCard'
import { MapAgentsMetricsCard } from '@components/MapAgentsMetricsCard'
import { MatchFrequencyChart } from '@components/match-frequency-chart'
import { MatchesList } from '@components/matches-list'
import { ProfileBanner } from '@components/ProfileBanner'
import { AgentRadarChart } from '@components/radar-chart'
import { useGestures } from '@components/sidebar'
import { Spinner } from '@components/ui/spinner'
import { useProfile } from '@hooks/useProfile'
import { useParams } from 'next/navigation'
import { useCallback, useEffect } from 'react'
import { toast } from 'sonner'

export default function Profile() {
	const params = useParams()
	const bind = useGestures()

	const region = params.region as string
	const nameTag = decodeURIComponent(params.nameTag as string)

	const { isLoading, player, fetchProfile, refreshProfile } = useProfile()

	useEffect(() => {
		if (player || isLoading) return
		if (!region || !nameTag) toast('Invalid region or nameTag')

		fetchProfile(region, nameTag, 1)
	})

	/**
	 * Just fetch the players latest matches
	 */
	const handlRefresh = useCallback(async () => {
		await refreshProfile(region, nameTag)
	}, [region, nameTag, refreshProfile])

	const metadata = player?.getMetadata()
	const { level, customization, rank } = metadata || {}
	const { cardImg } = customization || {}

	const matches = player?.getMatches() || []

	const recentWins = matches
		.map((match) => {
			return match.winningTeam === match.stats.team
		})
		.slice(0, 5)

	const metrics = player?.calculateAveragePerformanceMetrics()
	const winRate =
		(matches.reduce((acc, match) => acc + (match.winningTeam === match.stats.team ? 1 : 0), 0) / matches.length) *
		100

	const matchFrequency = player?.getMatchFrequency() || []

	return (
		<main
			className="relative font-sans w-screen md:max-h-screen flex flex-col gap-2 md:gap-4 items-center justify-items-center px-8 md:px-16 py-8"
			{...bind()}
			style={{ touchAction: 'none' }}
		>
			{!player && !isLoading && <Spinner className={'absolute inset-0 h-1/10 w-1/10 mx-auto my-auto'} />}

			<ProfileBanner
				nameTag={nameTag}
				avatarUrl={cardImg}
				rank={rank?.name}
				level={level}
				recentWins={recentWins}
			/>
			<section
				className={
					'shrink-0 font-mono w-full flex flex-col md:flex-row gap-2 md:gap-4 items-center justify-items-center'
				}
			>
				<AverageMetricsCard metrics={metrics} winRate={winRate} rank={rank?.name} rankImg={rank?.img} />
				<MapAgentsMetricsCard matches={matches} />
				<AgentRadarChart metrics={metrics} matches={matches} />
			</section>
			<section className={'flex-1 overflow-auto font-mono w-full flex flex-col md:flex-row gap-2 md:gap-4'}>
				<MatchesList region={region} matches={matches} refresh={handlRefresh} isLoading={isLoading} />
				<MatchFrequencyChart data={matchFrequency} />
			</section>
		</main>
	)
}
