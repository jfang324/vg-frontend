import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { GraphedPlayer } from '../../../types/graphed-player.type'
import { PlayerEntry } from './PlayerEntry'

interface PlayerTrackerProps {
	players: GraphedPlayer[]
	pendingPlayer: GraphedPlayer | null
	onRemove: (nameTag: string) => void
	onToggleVisibility: (nameTag: string) => void
	onProfileClick: (nameTag: string) => void
}

export const PlayerTracker = ({
	players,
	pendingPlayer,
	onRemove,
	onToggleVisibility,
	onProfileClick
}: PlayerTrackerProps) => {
	return (
		<Card className={'w-full md:w-1/2'}>
			<CardHeader className={'flex flex-row flex-wrap w-full justify-between gap-2'}>
				<span className={'w-full md:w-3/5 tracking-tight md:tracking-normal'}>
					<h1 className={'font-mono text-2xl font-bold text-foreground'}>ACTIVE PLAYERS</h1>
					<p className={'mt-1 text-sm text-muted-foreground'}>Currently tracking {players.length} players</p>
				</span>
			</CardHeader>
			<CardContent className={'w-full flex flex-wrap gap-2 md:gap-4'}>
				{players.map((player) => (
					<PlayerEntry
						key={player.metadata.nameTag}
						pending={false}
						player={player}
						onProfileClick={() => onProfileClick(player.metadata.nameTag)}
						onRemove={() => onRemove(player.metadata.nameTag)}
						onToggleVisibility={() => onToggleVisibility(player.metadata.nameTag)}
					/>
				))}
				{pendingPlayer && (
					<PlayerEntry
						player={pendingPlayer}
						pending={true}
						onProfileClick={() => onProfileClick(pendingPlayer.metadata.nameTag)}
						onRemove={() => onRemove(pendingPlayer.metadata.nameTag)}
						onToggleVisibility={() => onToggleVisibility(pendingPlayer.metadata.nameTag)}
					/>
				)}
			</CardContent>
		</Card>
	)
}
