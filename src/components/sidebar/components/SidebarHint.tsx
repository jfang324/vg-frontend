'use client'
import { useSidebar } from '@components/ui/sidebar'
import { ChevronRight } from 'lucide-react'
import { useEffect, useState } from 'react'

interface SidebarHintProps {
	chevronCount?: number
	side?: 'left' | 'right'
}

export function SidebarHint({ chevronCount = 5, side = 'left' }: SidebarHintProps) {
	const { openMobile, isMobile } = useSidebar()
	const [visible, setVisible] = useState(isMobile)

	useEffect(() => {
		if (openMobile) setVisible(false)
	}, [openMobile])

	useEffect(() => {
		setVisible(isMobile)
	}, [isMobile])

	if (!visible) return null

	return (
		<div
			className={`fixed inset-0 max-w-[10px] max-h-[200px] top-1/2 -translate-y-3/4 z-50 animate-pulse bg-primary text-primary-foreground rounded-r-lg p-2 flex flex-col justify-center items-center gap-2 ${
				side === 'left' ? 'left-0' : 'right-0 rounded-l-lg rounded-r-none'
			}`}
		>
			{Array.from({ length: chevronCount }).map((_, i) => (
				<ChevronRight key={i} className="h-4 w-4" />
			))}
		</div>
	)
}
