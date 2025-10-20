import { MatchContext } from '@components/providers/MatchProvider'
import { useContext } from 'react'

export const useMatch = () => {
	const context = useContext(MatchContext)

	if (!context) {
		throw new Error('useMatch must be used within a MatchProvider')
	}

	return context
}
