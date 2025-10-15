'use client'
import { usePlayers } from '@hooks/usePlayers'
import { stringToColor } from '@lib/utils'
import { useState } from 'react'
import { toast } from 'sonner'
import { GraphedPlayer } from '../../types/graphed-player.type'
import { PlayerInput } from './components/PlayerInput'
import { PlayerTracker } from './components/PlayerTracker'

export const ChartControls = () => {
	const { isLoading, players, fetchPlayer, removePlayer, togglePlayerVisibility } = usePlayers()
	const [pendingPlayer, setPendingPlayer] = useState<GraphedPlayer | null>(null)

	/**
	 *  Sets pending player and fetches player data, removing pending player after the API call finishes
	 */
	const handleAddPlayer = async (nameTag: string, region: string, mode: string, platform: string, limit: number) => {
		try {
			if (players.find((player) => player.metadata.nameTag === nameTag)) {
				toast(`Player ${nameTag} is already added`)
				return
			}

			const optimisticPlayer: GraphedPlayer = {
				metadata: {
					nameTag,
					color: stringToColor(nameTag),
					visibility: true
				},
				matches: []
			}

			setPendingPlayer(optimisticPlayer)

			await fetchPlayer(nameTag, limit, region, mode, platform)
		} catch (error: unknown) {
			console.error(error)
			toast('Something went wrong')
		} finally {
			setPendingPlayer(null)
		}
	}

	/**
	 *  Removes player from the list
	 */
	const handleRemovePlayer = (nameTag: string) => {
		try {
			removePlayer(nameTag)
		} catch (error: unknown) {
			console.error(error)
			toast('Something went wrong')
		}
	}

	/**
	 *  Toggles player visibility
	 */
	const handleTogglePlayerVisibility = (nameTag: string) => {
		try {
			togglePlayerVisibility(nameTag)
		} catch (error: unknown) {
			console.error(error)
			toast('Something went wrong')
		}
	}

	/**
	 *  Navigates to player profile page
	 */
	const handleProfileClick = (nameTag: string) => {
		window.open(`/profile/${nameTag}`, '_blank')
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
