'use client'
import { matchClient } from '@lib/api/matchClient'
import { Match } from '@lib/models/Match'
import { MatchPerformance } from '@lib/types/player'
import { createContext, useCallback, useMemo, useState } from 'react'

interface PlayersProviderProps {
	children: React.ReactNode
}

export interface MatchContext {
	isLoading: boolean
	error: Error | null
	match: Match | null
	fetchMatch: (region: string, matchId: string) => Promise<void>
	getPerformances: () => MatchPerformance[]
}

export const MatchContext = createContext<MatchContext | null>(null)

export const MatchProvider = ({ children }: PlayersProviderProps) => {
	const [isLoading, setIsLoading] = useState(false)
	const [error, setError] = useState<Error | null>(null)

	const [match, setMatch] = useState<Match | null>(null)

	/**
	 * Fetch match data
	 */
	const fetchMatch = useCallback(async (region: string, matchId: string) => {
		try {
			setIsLoading(true)

			const response = await matchClient.getMatch(region, matchId)

			if (!response) throw new Error('No response from API')

			const match = new Match(response.data)

			setMatch(match)
			setError(null)
		} catch (error: unknown) {
			console.error(error)
			setError(error as Error)
		} finally {
			setIsLoading(false)
		}
	}, [])

	/**
	 * Get the all the player performances for the match
	 */
	const getPerformances = useCallback((): MatchPerformance[] => {
		return match?.getPerformances() || []
	}, [match])

	const contextValue = useMemo(
		() => ({
			isLoading,
			error,
			match,
			fetchMatch,
			getPerformances
		}),
		[isLoading, error, match, fetchMatch, getPerformances]
	)

	return <MatchContext.Provider value={contextValue}>{children}</MatchContext.Provider>
}
