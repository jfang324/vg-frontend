'use client'
import { usePlayers } from '@hooks/usePlayers'
import { stringToColor } from '@lib/utils'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'
import { GraphedPlayer } from '../../types/graphed-player.type'
import { PlayerInput } from './components/PlayerInput'
import { PlayerTracker } from './components/PlayerTracker'

export const ChartControls = () => {
	const { isLoading, players, fetchPlayer, removePlayer, togglePlayerVisibility, error } = usePlayers()
	const [pendingPlayer, setPendingPlayer] = useState<GraphedPlayer | null>(null)

	useEffect(() => {
		if (error) {
			toast(`Something went wrong: ${error.message}`)
		}
	}, [error])

	/**
	 *  Sets pending player and fetches player data, removing pending player after the API call finishes
	 */
	const handleAddPlayer = async (nameTag: string, region: string, mode: string, platform: string, limit: number) => {
		if (players.find((player) => player.metadata.nameTag === nameTag)) {
			toast(`Player ${nameTag} is already added`)
			return
		}

		const optimisticPlayer: GraphedPlayer = {
			metadata: {
				region,
				nameTag,
				color: stringToColor(nameTag),
				visibility: true
			},
			matches: []
		}

		setPendingPlayer(optimisticPlayer)

		await fetchPlayer(nameTag, limit, region, mode, platform)

		setPendingPlayer(null)
	}

	/**
	 *  Removes player from the list
	 */
	const handleRemovePlayer = (nameTag: string) => {
		removePlayer(nameTag)
	}

	/**
	 *  Toggles player visibility
	 */
	const handleTogglePlayerVisibility = (nameTag: string) => {
		togglePlayerVisibility(nameTag)
	}

	/**
	 *  Navigates to player profile page
	 */
	const handleProfileClick = (region: string, nameTag: string) => {
		window.open(`/profiles/${region}/${encodeURIComponent(nameTag)}`, '_blank')
	}

	return (
		<div className={'w-full flex flex-col md:flex-row gap-2'}>
			<PlayerInput isLoading={isLoading} onSubmit={handleAddPlayer} />
			<PlayerTracker
				players={players}
				pendingPlayer={pendingPlayer}
				onRemove={handleRemovePlayer}
				onToggleVisibility={handleTogglePlayerVisibility}
				onProfileClick={handleProfileClick}
			/>
		</div>
	)
}
