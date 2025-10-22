'use client'
import { type ModeKey } from '@constants/modes'
import { playerClient } from '@lib/api/playerClient'
import { profileClient } from '@lib/api/profileClient'
import { Player } from '@lib/models/Player'
import { MatchPerformance } from '@lib/types/player'
import { createContext, useCallback, useMemo, useState } from 'react'

interface ProfileProviderProps {
	children: React.ReactNode
}

export interface ProfileContext {
	isLoading: boolean
	error: Error | null
	player: Player | null
	mode: ModeKey
	setMode: (mode: ModeKey) => void
	fetchProfile: (region: string, nameTag: string) => Promise<void>
	fetchMatches: (region: string, nameTag: string, page: number) => Promise<void>
	refreshProfile: (region: string, nameTag: string) => Promise<void>
}

export const ProfileContext = createContext<ProfileContext | null>(null)

export const ProfileProvider = ({ children }: ProfileProviderProps) => {
	const [isLoading, setIsLoading] = useState(false)
	const [error, setError] = useState<Error | null>(null)

	const [player, setPlayer] = useState<Player | null>(null)
	const [mode, setMode] = useState<ModeKey>('competitive')

	/**
	 * Fetch player profile data
	 */
	const fetchProfile = useCallback(
		async (region: string, nameTag: string) => {
			try {
				setIsLoading(true)

				const response = await profileClient.getPlayerProfile(nameTag, region, mode)

				if (!response) throw new Error('No response from API')

				const player = Player.fromApiData(response.data)

				setPlayer(player)
				setError(null)
			} catch (error: unknown) {
				console.error(error)
				setError(error as Error)
			} finally {
				setIsLoading(false)
			}
		},
		[mode]
	)

	/**
	 * Fetch player's latest matches
	 */
	const refreshProfile = useCallback(async (region: string, nameTag: string) => {
		try {
			setIsLoading(true)

			const response = await playerClient.getRecentMatches(nameTag, region, 'pc', 'competitive', 10)

			if (!response) throw new Error('No response from API')

			const player = Player.fromApiData(response.data)

			setPlayer(player)
			setError(null)
		} catch (error: unknown) {
			console.error(error)
			setError(error as Error)
		} finally {
			setIsLoading(false)
		}
	}, [])

	/**
	 * Fetch more matches and add them to the player
	 */
	const fetchMatches = useCallback(
		async (region: string, nameTag: string, page: number) => {
			try {
				setIsLoading(true)

				const response = await profileClient.getPlayerMatches(nameTag, region, 'competitive', page)

				if (!response) throw new Error('No response from API')

				const newData = Player.fromApiData(response.data)

				let newPlayer: Player
				let newMatches: MatchPerformance[]

				if (player) {
					newPlayer = Player.fromExistingPlayer(player)
					newMatches = newData.getMatches()
				} else {
					newPlayer = newData
					newMatches = []
				}

				newPlayer.addMatches(newMatches)

				setPlayer(newPlayer)
				setError(null)
			} catch (error: unknown) {
				console.error(error)
			} finally {
				setIsLoading(false)
			}
		},
		[player]
	)

	const contextValue = useMemo(
		() => ({
			isLoading,
			error,
			player,
			mode,
			setMode,
			fetchProfile,
			fetchMatches,
			refreshProfile
		}),
		[isLoading, error, player, fetchProfile, fetchMatches, refreshProfile, mode]
	)

	return <ProfileContext.Provider value={contextValue}>{children}</ProfileContext.Provider>
}
