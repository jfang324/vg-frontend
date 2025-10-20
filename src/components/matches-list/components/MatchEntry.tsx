import { MatchPerformance } from '@lib/types/player'
import Image from 'next/image'

interface MatchEntryProps {
	match: MatchPerformance
	onClick?: () => void
}

export const MatchEntry = ({ match, onClick }: MatchEntryProps) => {
	const won = match.winningTeam === match.stats.team
	const map = match.map
	const agent = match.stats.agent

	const date = new Date(match.date)
	const now = new Date()

	const diffTime = now.getTime() - date.getTime()
	const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24))

	const rounds = match.redRounds + match.blueRounds
	const shots = match.stats.headshots + match.stats.bodyshots + match.stats.legshots

	const hs = (match.stats.headshots / shots) * 100
	const dd = (match.stats.damageDealt - match.stats.damageTaken) / rounds
	const adr = match.stats.damageDealt / rounds
	const acs = match.stats.score / rounds

	return (
		<div
			key={match.id}
			className={
				'font-mono text-xs tracking-tighter flex flex-row items-center rounded bg-muted-foreground/10 border-1 border-foreground/20 hover:cursor-pointer'
			}
			onClick={onClick}
		>
			<div
				className={`h-full ${won ? 'border-green-500/50 bg-green-500/30' : 'border-red-500/50 bg-red-500/30'}`}
			>
				&nbsp;
			</div>
			<div className={'w-full p-1 md:p-2 flex flex-row justify-between items-center'}>
				<div className={'w-[100px] md:w-[150px] flex flex-row gap-2 items-center'}>
					<span className={'h-10 w-10 overflow-hidden relative'}>
						{agent.img ? (
							<Image src={agent.img} alt={agent.name} fill className={'object-contain'} sizes={'100px'} />
						) : null}
					</span>

					<div className={'flex flex-col'}>
						<span className={'text-sm text-foreground font-semibold'}>{map.name}</span>
						<span className={'text-xs text-muted-foreground'}>
							{diffDays ? `${diffDays} days ago` : 'Today'}
						</span>
					</div>
				</div>

				<div className={'w-[100px] items-center flex'}>
					<span className={'w-fit font-semibold text-nowrap text-foreground mx-auto'}>
						{match.stats.team === 'Red'
							? `${match.redRounds} - ${match.blueRounds}`
							: `${match.blueRounds} - ${match.redRounds}`}
					</span>
				</div>

				<div className={'text-xs flex-1 md:grid md:grid-cols-5 gap-2'}>
					<div className={'flex flex-col items-center justify-center'}>
						<span className={'text-muted-foreground'}>K / D / A</span>
						<span className={'text-foreground'}>
							{match.stats.kills} / {match.stats.deaths} / {match.stats.assists}
						</span>
					</div>
					<div className={'hidden md:flex flex-col items-center justify-center'}>
						<span className={'text-muted-foreground'}>HS %</span>
						<span className={'text-foreground'}>{hs.toFixed(2)} %</span>
					</div>
					<div className={'hidden md:flex flex-col items-center justify-center'}>
						<span className={'text-muted-foreground'}>DD</span>
						<span className={'text-foreground'}>{dd.toFixed(0)}</span>
					</div>
					<div className={'hidden md:flex flex-col items-center justify-center'}>
						<span className={'text-muted-foreground'}>ADR</span>
						<span className={'text-foreground'}>{adr.toFixed(0)}</span>
					</div>
					<div className={'hidden md:flex flex-col items-center justify-center'}>
						<span className={'text-muted-foreground'}>ACS</span>
						<span className={'text-foreground'}>{acs.toFixed(0)}</span>
					</div>
				</div>
			</div>
		</div>
	)
}
