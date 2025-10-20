'use client'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Button } from '@components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@components/ui/dialog'
import { Spinner } from '@components/ui/spinner'
import { useMatch } from '@hooks/useMatches'
import { MatchPerformance } from '@lib/types/player'
import { RotateCcw } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'
import { MatchEntry } from './MatchEntry'
import { PerformanceEntry } from './PerformanceEntry'

interface MatchesListProps {
	region: string
	matches: MatchPerformance[]
	refresh: () => Promise<void>
	loadMore: (page: number) => Promise<void>
	isLoading: boolean
}

export const MatchesList = ({ region, matches = [], refresh, loadMore, isLoading: refreshing }: MatchesListProps) => {
	const [dialogOpen, setDialogOpen] = useState(false)
	const { isLoading, error, match, fetchMatch } = useMatch()
	const [data, setData] = useState<(MatchPerformance & { nameTag: string })[]>([])
	const [page, setPage] = useState(1)

	const router = useRouter()

	useEffect(() => {
		if (error) {
			toast('Something went wrong')
		}
	}, [error])

	useEffect(() => {
		if (match) {
			setData(match?.getPerformances() || [])
		}
	}, [match])

	const handleDialogOpen = async (region: string, id: string) => {
		await fetchMatch(region, id)

		setDialogOpen(true)
	}

	const handleProfileClick = (region: string, nameTag: string) => {
		router.push(`/profiles/${region}/${encodeURIComponent(nameTag)}`)
	}

	const handleLoadMore = async () => {
		await loadMore(page + 1)
		setPage((page) => page + 1)
	}

	return (
		<Card className={'w-full md:w-2/3 tracking-tight'}>
			<CardHeader className={'flex flex-row justify-between items-center'}>
				<h1 className={'text-xl font-semibold text-nowrap'}>RECENT MATCHES</h1>
				<Button
					size={'sm'}
					variant={'outline'}
					className={'hover:cursor-pointer md:w-fit rounded'}
					onClick={refresh}
				>
					{refreshing ? <Spinner className={'w-4 h-4'} /> : <RotateCcw className={'w-4 h-4'} />} Refresh
				</Button>
			</CardHeader>
			<CardContent
				className={'w-full flex flex-col gap-2 overflow-y-scroll max-h-[250px] md:max-h-full'}
				style={{ scrollbarWidth: 'none' }}
			>
				{matches.map((match) => (
					<MatchEntry key={match.id} match={match} onClick={() => handleDialogOpen(region, match.id)} />
				))}

				<div className={'w-full flex items-center'}>
					{refreshing ? (
						<Spinner className={'h-10 w-10 mx-auto my-auto'} />
					) : (
						<Button
							onClick={handleLoadMore}
							className={'hover:cursor-pointer mx-auto'}
							size={'sm'}
							variant={'outline'}
						>
							Load More
						</Button>
					)}
				</div>
			</CardContent>
			<Dialog open={dialogOpen} onOpenChange={(open) => !open && setDialogOpen(false)}>
				{isLoading ? <Spinner className={'absolute inset-0 h-15 w-15 mx-auto my-auto'} /> : null}
				{!isLoading && data.length > 0 && (
					<DialogContent className={'bg-card max-w-screen md:max-w-[800px]'}>
						<DialogHeader className={'w-full flex flex-row justify-between items-center'}>
							<div className={'w-fit flex flex-col gap-1 md:gap-2'}>
								<DialogTitle className={'w-full'}>
									{data[0]?.mode.name} • {data[0]?.map.name}
								</DialogTitle>
								<DialogDescription className={'w-full text-xs'}>
									{data[0]?.date.toLocaleDateString()}
								</DialogDescription>
							</div>
						</DialogHeader>
						<div className={'w-full flex flex-col gap-2'} style={{ scrollbarWidth: 'none' }}>
							{data.map((performance) => (
								<PerformanceEntry
									key={performance.id + performance.stats.agent.id + performance.stats.team}
									performance={performance}
									onClick={() => handleProfileClick(region, performance.nameTag)}
								/>
							))}
						</div>
					</DialogContent>
				)}
			</Dialog>
		</Card>
	)
}
