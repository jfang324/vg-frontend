'use client'
import { AverageMetricsCard } from '@components/AverageMetricsCard'
import { MapAgentsMetricsCard } from '@components/MapAgentsMetricsCard'
import { MatchFrequencyChart } from '@components/match-frequency-chart'
import { MatchesList } from '@components/matches-list'
import { ProfileBanner } from '@components/ProfileBanner'
import { AgentRadarChart } from '@components/radar-chart'
import { useGestures } from '@components/sidebar'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@components/ui/select'
import { Spinner } from '@components/ui/spinner'
import { Tabs, TabsList, TabsTrigger } from '@components/ui/tabs'
import { ModeKey, MODES } from '@constants/modes'
import { useProfile } from '@hooks/useProfile'
import { useParams } from 'next/navigation'
import { useCallback, useEffect } from 'react'
import { toast } from 'sonner'

export default function Profile() {
	const params = useParams()
	const bind = useGestures()

	const region = params.region as string
	const nameTag = decodeURIComponent(params.nameTag as string)

	const { error, isLoading, player, fetchProfile, fetchMatches, refreshProfile } = useProfile()

	useEffect(() => {
		if (player || isLoading || error) return
		if (!region || !nameTag) toast('Invalid region or nameTag')

		fetchProfile(region, nameTag)
	})

	useEffect(() => {
		if (error) {
			toast('Something went wrong')
		}
	}, [error])

	/**
	 * Just fetch the players latest matches
	 */
	const handlRefresh = useCallback(async () => {
		await refreshProfile(region, nameTag)
	}, [region, nameTag, refreshProfile])

	/**
	 * Fetch more matches
	 */
	const handleLoadMore = useCallback(
		async (page: number) => {
			await fetchMatches(region, nameTag, page)
		},
		[region, nameTag, fetchMatches]
	)

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
			className="relative font-mono w-screen md:max-h-screen flex flex-col gap-1 md:gap-2 items-center justify-items-center p-8 md:px-16"
			{...bind()}
			style={{ touchAction: 'pan-y' }}
		>
			{!player && !isLoading && <Spinner className={'absolute inset-0 h-1/10 w-1/10 mx-auto my-auto'} />}

			<ProfileBanner
				nameTag={nameTag}
				avatarUrl={cardImg}
				rank={rank?.name}
				level={level}
				recentWins={recentWins}
			/>

			<section className={'h-fit w-full'}>
				<Tabs defaultValue={'competitive'} className={'w-full hidden md:block'}>
					<TabsList className={'w-full h-auto grid grid-cols-1 md:grid-cols-4'}>
						{Object.keys(MODES).map((mode) => (
							<TabsTrigger key={mode} value={mode} className={'hover:cursor-pointer'}>
								{MODES[mode as ModeKey].fullTitle}
							</TabsTrigger>
						))}
					</TabsList>
				</Tabs>

				<Select defaultValue={'competitive'}>
					<SelectTrigger className="block md:hidden w-full border-primary/50 bg-primary/10 font-mono text-sm text-primary hover:cursor-pointer rounded">
						<SelectValue placeholder={'Select a mode'} />
					</SelectTrigger>
					<SelectContent>
						{Object.keys(MODES).map((mode) => (
							<SelectItem value={mode} key={mode}>
								{MODES[mode as ModeKey].fullTitle}
							</SelectItem>
						))}
					</SelectContent>
				</Select>
			</section>

			<section
				className={
					'shrink-0 font-mono w-full flex flex-col md:flex-row gap-1 md:gap-2 items-center justify-items-center'
				}
			>
				<AverageMetricsCard metrics={metrics} winRate={winRate} rank={rank?.name} rankImg={rank?.img} />
				<MapAgentsMetricsCard matches={matches} />
				<AgentRadarChart metrics={metrics} matches={matches} />
			</section>
			<section className={'flex-1 overflow-auto font-mono w-full flex flex-col md:flex-row gap-1 md:gap-2'}>
				<MatchesList
					region={region}
					matches={matches}
					refresh={handlRefresh}
					loadMore={handleLoadMore}
					isLoading={isLoading}
				/>
				<MatchFrequencyChart data={matchFrequency} />
			</section>
		</main>
	)
}
