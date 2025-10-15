'use client'
import { playerClient } from '@lib/api/playerClient'
import { Player } from '@lib/models/Player'
import { calculateOverallPerformanceAnalytics, stringToColor } from '@lib/utils'
import { createContext, useCallback, useMemo, useState } from 'react'
import type { GraphMetadata } from '../../types/graph-metadata.type'
import type { GraphedPlayer } from '../../types/graphed-player.type'
import type { PlayerAnalytics } from '../../types/player-analytics.type'

interface PlayersProviderProps {
	children: React.ReactNode
}

export interface PlayersContext {
	isLoading: boolean
	error: Error | null
	players: GraphedPlayer[]
	calculatePerformanceAnalytics: () => PlayerAnalytics
	fetchPlayer: (nameTag: string, limit: number, region: string, mode: string, platform: string) => Promise<void>
	removePlayer: (nameTag: string) => void
	togglePlayerVisibility: (nameTag: string) => void
}

export const PlayersContext = createContext<PlayersContext | null>(null)

export const PlayersProvider = ({ children }: PlayersProviderProps) => {
	const [isLoading, setIsLoading] = useState(false)
	const [error, setError] = useState<Error | null>(null)

	const [players, setPlayers] = useState<Map<string, Player>>(new Map())
	const [graphMetadata, setGraphMetadata] = useState<Map<string, GraphMetadata>>(new Map())

	/**
	 * Fetch recent performance data for a given player
	 */
	const fetchPlayer = useCallback(
		async (nameTag: string, limit: number, region: string, mode: string, platform: string) => {
			try {
				setIsLoading(true)

				const response = await playerClient.getRecentMatches(nameTag, region, platform, mode, limit)

				if (!response) throw new Error('No response from API')

				const player = new Player(response.data)

				setPlayers((prev) => {
					const newPlayers = new Map(prev)
					newPlayers.set(nameTag, player)

					return newPlayers
				})

				setGraphMetadata((prev) => {
					const newGraphMetadata = new Map(prev)
					newGraphMetadata.set(nameTag, {
						nameTag,
						color: stringToColor(nameTag),
						visibility: true
					})

					return newGraphMetadata
				})

				setError(null)
			} catch (error: unknown) {
				console.error(error)
				setError(error as Error)
			} finally {
				setIsLoading(false)
			}
		},
		[]
	)

	/**
	 * Calculate overall performance analytics for all players
	 */
	const calculatePerformanceAnalytics = useCallback(() => {
		const averages = [...players.keys()].map((nameTag) =>
			players.get(nameTag)!.calculateAveragePerformanceMetrics()
		)

		const analytics = calculateOverallPerformanceAnalytics(averages)

		return analytics
	}, [players])

	/**
	 * Remove a player from the players list
	 */
	const removePlayer = useCallback((nameTag: string) => {
		try {
			setPlayers((prev) => {
				const newPlayers = new Map(prev)
				newPlayers.delete(nameTag)

				return newPlayers
			})

			setGraphMetadata((prev) => {
				const newGraphMetadata = new Map(prev)
				newGraphMetadata.delete(nameTag)

				return newGraphMetadata
			})
		} catch (error: unknown) {
			console.error(error)
		}
	}, [])

	/**
	 * Toggle the visibility of a player in the graph
	 */
	const togglePlayerVisibility = useCallback((nameTag: string) => {
		try {
			setGraphMetadata((prev) => {
				const newGraphMetadata = new Map(prev)
				const metadata = newGraphMetadata.get(nameTag)

				if (metadata) {
					newGraphMetadata.set(nameTag, {
						...metadata,
						visibility: !metadata.visibility
					})
				}

				return newGraphMetadata
			})
		} catch (error: unknown) {
			console.error(error)
		}
	}, [])

	const contextValue = useMemo(
		() => ({
			isLoading,
			error,
			players: [...players.keys()].map((nameTag: string) => ({
				metadata: graphMetadata.get(nameTag) as GraphMetadata,
				matches: players.get(nameTag)!.calculatePerformanceMetrics() || []
			})),
			calculatePerformanceAnalytics,
			fetchPlayer,
			removePlayer,
			togglePlayerVisibility
		}),
		[
			isLoading,
			error,
			players,
			calculatePerformanceAnalytics,
			fetchPlayer,
			removePlayer,
			togglePlayerVisibility,
			graphMetadata
		]
	)

	return <PlayersContext.Provider value={contextValue}>{children}</PlayersContext.Provider>
}
