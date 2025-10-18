'use client'
import { playerClient } from '@lib/api/playerClient'
import { profileClient } from '@lib/api/profileClient'
import { Player } from '@lib/models/Player'
import { createContext, useCallback, useMemo, useState } from 'react'

interface ProfileProviderProps {
	children: React.ReactNode
}

export interface ProfileContext {
	isLoading: boolean
	error: Error | null
	player: Player | null
	fetchProfile: (region: string, nameTag: string, page: number) => Promise<void>
	refreshProfile: (region: string, nameTag: string) => Promise<void>
}

export const ProfileContext = createContext<ProfileContext | null>(null)

export const ProfileProvider = ({ children }: ProfileProviderProps) => {
	const [isLoading, setIsLoading] = useState(false)
	const [error, setError] = useState<Error | null>(null)

	const [player, setPlayer] = useState<Player | null>(null)

	/**
	 * Fetch player profile data
	 */
	const fetchProfile = useCallback(async (region: string, nameTag: string, page: number) => {
		try {
			setIsLoading(true)

			const response = await profileClient.getPlayerProfile(nameTag, region, 'competitive', page)

			if (!response) throw new Error('No response from API')

			const player = new Player(response.data)

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
	 * Fetch player's latest matches
	 */
	const refreshProfile = useCallback(async (region: string, nameTag: string) => {
		try {
			setIsLoading(true)

			const response = await playerClient.getRecentMatches(nameTag, region, 'pc', 'competitive', 10)

			if (!response) throw new Error('No response from API')

			const player = new Player(response.data)

			setPlayer(player)
			setError(null)
		} catch (error: unknown) {
			console.error(error)
			setError(error as Error)
		} finally {
			setIsLoading(false)
		}
	}, [])

	const contextValue = useMemo(
		() => ({
			isLoading,
			error,
			player,
			fetchProfile,
			refreshProfile
		}),
		[isLoading, error, player, fetchProfile, refreshProfile]
	)

	return <ProfileContext.Provider value={contextValue}>{children}</ProfileContext.Provider>
}
