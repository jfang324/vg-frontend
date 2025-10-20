import { useSidebar } from '@components/ui/sidebar'
import { useDrag } from '@use-gesture/react'

/**
 * Provides swipe gestures for mobile devices to open/close the sidebar
 */
export const useGestures = () => {
	const { isMobile, setOpenMobile } = useSidebar()

	const bind = useDrag(
		({ last, velocity, direction }) => {
			if (!last || !isMobile) return

			const [horizontalDirection] = direction
			const [horizontalVelocity] = velocity

			if (horizontalDirection === 1 && horizontalVelocity > 0.25) {
				setOpenMobile(true)
			}
		},
		{
			filterTaps: true,
			axis: 'x'
		}
	)

	return bind
}
