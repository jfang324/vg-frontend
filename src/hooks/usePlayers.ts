import { PlayersContext } from '@components/providers/PlayersProvider'
import { useContext } from 'react'

export function usePlayers() {
	const context = useContext(PlayersContext)

	if (!context) {
		throw new Error('usePlayers must be used within a PlayersProvider')
	}

	return context
}
