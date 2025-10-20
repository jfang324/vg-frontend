import { ProfileContext } from '@components/providers/ProfileProvider'
import { useContext } from 'react'

export const useProfile = () => {
	const context = useContext(ProfileContext)

	if (!context) {
		throw new Error('useProfile must be used within a ProfileProvider')
	}

	return context
}
