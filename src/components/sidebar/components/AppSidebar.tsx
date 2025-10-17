'use client'
import { Button } from '@components/ui/button'
import { Separator } from '@components/ui/separator'
import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarHeader, useSidebar } from '@components/ui/sidebar'
import { ChevronLeft, CreditCard, Github, Heart, Home, LogIn, Search, UserPlus } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useRef } from 'react'
import { SearchInput } from './SearchInput'
import { SidebarHint } from './SidebarHint'

export const AppSidebar = ({ ...props }: React.ComponentProps<typeof Sidebar>) => {
	const { open, setOpen, openMobile, setOpenMobile, isMobile } = useSidebar()
	const isOpen = open || openMobile

	const handleClose = () => {
		setOpen(false)
		setOpenMobile(false)
	}

	const searchRef = useRef<HTMLInputElement>(null)
	const router = useRouter()

	const handleSearch = (region: string, value: string) => {
		router.push(`/profiles/${region}/${encodeURIComponent(value)}`)
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
							<h2 className={'font-mono text-2xl font-bold text-primary'}>VG</h2>
						</div>
					)}
					<Separator className={'mt-2'} />
				</SidebarHeader>

				<SidebarContent>
					<SidebarGroup>
						<div className={'flex flex-col items-center gap-3'}>
							<SearchInput
								visible={isOpen}
								label={'Profile Search'}
								placeholder={'Player name#tag'}
								searchRef={searchRef}
								onSearch={handleSearch}
							/>

							{!isOpen && (
								<Button
									size={'icon-sm'}
									variant={'ghost'}
									className={'hover:cursor-pointer w-full justify-start px-2'}
									onClick={() => {
										setOpen(true)
										setTimeout(() => searchRef.current?.focus(), 0)
									}}
								>
									<Search className={'h-5 w-5'} />
								</Button>
							)}
							<Button
								size={'icon-sm'}
								variant={'ghost'}
								className={'hover:cursor-pointer w-full justify-start px-2'}
								onClick={() => router.push('/')}
							>
								<Home className={'h-5 w-5'} /> {isOpen ? 'Home' : null}
							</Button>
							<Button
								size={'icon-sm'}
								variant={'ghost'}
								className={'hover:cursor-pointer w-full justify-start px-2'}
								onClick={() => window.open(process.env.NEXT_PUBLIC_REPO_URL, '_blank')}
							>
								<Github className={'h-5 w-5'} /> {isOpen ? 'GitHub Repository' : null}
							</Button>
							<Button
								size={'icon-sm'}
								variant={'ghost'}
								className={'hover:cursor-pointer w-full justify-start px-2'}
								onClick={() => window.open(process.env.NEXT_PUBLIC_SUPPORT_URL, '_blank')}
							>
								<Heart className={'h-5 w-5'} /> {isOpen ? 'Support Me' : null}
							</Button>
							<Button
								size={'icon-sm'}
								variant={'ghost'}
								className={'hover:cursor-pointer w-full justify-start px-2'}
								onClick={() => router.push('/plans')}
							>
								<CreditCard className={'h-5 w-5'} /> {isOpen ? 'Premium Plans' : null}
							</Button>
						</div>
					</SidebarGroup>

					{!isOpen && (
						<SidebarGroup>
							<div className={'flex flex-col items-center gap-3'}>
								<Separator className={'my-1'} />
								<Button
									size={'icon-sm'}
									variant={'ghost'}
									className={'hover:cursor-pointer'}
									onClick={() => router.push('/login')}
								>
									<LogIn className={'h-5 w-5'} />
								</Button>
								<Button
									size={'icon-sm'}
									variant={'ghost'}
									className={'hover:cursor-pointer'}
									onClick={() => router.push('/signup')}
								>
									<UserPlus className={'h-5 w-5'} />
								</Button>
							</div>
						</SidebarGroup>
					)}
				</SidebarContent>

				{isOpen && (
					<SidebarFooter>
						<Separator className={'mb-2'} />
						<div className={'flex flex-col items-center gap-3'}>
							<Button
								size={'icon-sm'}
								variant={'outline'}
								className={'hover:cursor-pointer w-full justify-start px-2 rounded'}
							>
								<LogIn className={'h-5 w-5'} /> Log In
							</Button>
							<Button
								size={'icon-sm'}
								variant={'outline'}
								className={'hover:cursor-pointer w-full justify-start px-2 rounded bg-primary'}
							>
								<UserPlus className={'h-5 w-5'} /> Create Account
							</Button>
						</div>
					</SidebarFooter>
				)}
			</Sidebar>
		</>
	)
}
