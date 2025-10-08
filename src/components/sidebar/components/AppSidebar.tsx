'use client'
import { Button } from '@components/ui/button'
import {
	Sidebar,
	SidebarContent,
	SidebarGroup,
	SidebarHeader,
	SidebarMenuItem,
	useSidebar
} from '@components/ui/sidebar'
import { ChevronLeft } from 'lucide-react'
import { SidebarHint } from './SidebarHint'

export const AppSidebar = ({ ...props }: React.ComponentProps<typeof Sidebar>) => {
	const { open, setOpen, openMobile, setOpenMobile, isMobile } = useSidebar()

	const isOpen = open || openMobile

	const handleClose = () => {
		setOpen(false)
		setOpenMobile(false)
	}

	return (
		<>
			<SidebarHint />
			<Sidebar collapsible={'icon'} variant={isMobile ? 'sidebar' : 'floating'} {...props}>
				<SidebarHeader>
					{isOpen ? (
						<div className={'flex flex-row items-center justify-between'}>
							<div className={'flex flex-col flex-1 px-2'}>
								<h2 className={'font-mono text-xl font-bold text-primary'}>ValoGraphs</h2>
								<p className={'text-xs text-muted-foreground'}>Performance Analytics</p>
							</div>
							<Button
								variant={'ghost'}
								size={'icon'}
								onClick={handleClose}
								className={'hover:cursor-pointer'}
							>
								<ChevronLeft className={'h-5 w-5'} />
							</Button>
						</div>
					) : (
						<div className={'flex mx-auto hover:cursor-pointer'} onClick={() => setOpen(true)}>
							<h2 className={'font-mono text-lg font-bold text-primary'}>VG</h2>
						</div>
					)}
				</SidebarHeader>
			</Sidebar>
		</>
	)
}
