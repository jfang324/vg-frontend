import { MatchProvider } from '@components/providers/MatchProvider'
import { MatchPerformance } from '@lib/types/player'
import { MatchesList as MatchesListComponent } from './components/MatchList'

interface MatchListProps {
	region: string
	matches: MatchPerformance[]
	refresh: () => Promise<void>
	loadMore: (page: number) => Promise<void>
	isLoading: boolean
}

export const MatchesList = ({ region, matches = [], refresh, loadMore, isLoading }: MatchListProps) => {
	return (
		<MatchProvider>
			<MatchesListComponent
				region={region}
				matches={matches}
				refresh={refresh}
				loadMore={loadMore}
				isLoading={isLoading}
			/>
		</MatchProvider>
	)
}
