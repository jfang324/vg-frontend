import { Card } from '@/components/ui/card'
import { Button } from '@components/ui/button'
import { Eye, EyeOff, User, X } from 'lucide-react'
import { GraphedPlayer } from '../../../types/graphed-player.type'

interface PlayerEntryProps {
	player: GraphedPlayer
	pending: boolean
	onProfileClick: () => void
	onToggleVisibility: () => void
	onRemove: () => void
}

export const PlayerEntry = ({ player, pending, onProfileClick, onToggleVisibility, onRemove }: PlayerEntryProps) => {
	const [name, tag] = player.metadata.nameTag.split('#')

	return (
		<Card className={`w-sm px-4 ${pending ? 'pointer-events-none opacity-50' : ''}`}>
			<div className={'w-full flex flex-row justify-between'}>
				<div className={'w-4/5 flex flex-row gap-4 justify-start'}>
					<User className={'h-5 w-5 my-auto'} style={{ color: player.metadata.color }} />

					<span
						className={'flex-1 flex flex-col gap-1 hover:cursor-pointer hover:opacity-50'}
						onClick={onProfileClick}
					>
						<h1 className={'font-mono text-sm font-bold text-foreground'}>{name}</h1>
						<p className={'text-xs text-muted-foreground'}>#{tag}</p>
					</span>
				</div>
				<div className={'flex-1 flex flex-row justify-around gap-0.5'}>
					<Button
						size={'icon'}
						variant={'ghost'}
						className={'hover:cursor-pointer my-auto'}
						onClick={onToggleVisibility}
					>
						{player.metadata.visibility ? (
							<Eye className={'h-2.5 w-2.5'} />
						) : (
							<EyeOff className={'h-2.5 w-2.5'} />
						)}
					</Button>
					<Button
						size={'icon'}
						variant={'ghost'}
						className={'hover:cursor-pointer my-auto'}
						onClick={onRemove}
					>
						<X className={'h-2.5 w-2.5'} />
					</Button>
				</div>
			</div>
		</Card>
	)
}
