import { Badge } from '@components/ui/badge'
import { Card } from '@components/ui/card'
import Image from 'next/image'

interface ProfileBannerProps {
	nameTag: string
	avatarUrl?: string
	rank?: string
	level?: number
	recentWins?: boolean[]
}

export const ProfileBanner = ({ nameTag, avatarUrl, rank, level, recentWins = [] }: ProfileBannerProps) => {
	return (
		<Card
			className={
				'w-full h-auto bg-linear-to-bl from-primary/80 to-secondary/20 rounded-xl p-2 md:p-4 flex flex-row justify-between'
			}
		>
			<div className={'w-fit flex flex-row gap-2 md:gap-4'}>
				<div className="w-20 h-20 md:w-25 md:h-25 border-2 border-foreground rounded-full overflow-hidden relative">
					{avatarUrl ? (
						<Image src={avatarUrl} alt={'player card'} fill className={'object-cover object-left-top'} />
					) : null}
				</div>
				<div className={'font-mono mt-auto flex flex-col gap-1'}>
					<div className={'flex flex-row gap-1.5 tracking-tighter'}>
						<div className={'bg-primary/20 border-1 border-primary text-primary text-xs p-1'}>{rank}</div>
						<div className={'bg-secondary border-muted-foreground border-1 text-foreground text-xs p-1'}>
							{level ? `Level ${level}` : null}
						</div>
					</div>
					<div className={'text-2xl md:text-3xl text-foreground font-bold tracking-wide'}>{nameTag}</div>
				</div>
			</div>
			<div className={'hidden md:block font-mono text-xs mt-auto'}>
				<div className={'w-full mt-auto flex flex-row gap-1 items-center text-sm'}>
					Recent:{' '}
					<span className={'grid grid-cols-5 gap-1'}>
						{recentWins.map((won, index) => (
							<Badge
								key={index}
								variant={'outline'}
								className={`h-6 w-6 p-0 text-xs ${
									won
										? 'border-green-500/50 bg-green-500/30 text-green-500'
										: 'border-red-500/50 bg-red-500/30 text-red-500'
								}`}
							>
								{won ? 'W' : 'L'}
							</Badge>
						))}
					</span>
				</div>
			</div>
		</Card>
	)
}
