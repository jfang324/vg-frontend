import { MatchPerformance } from '@lib/types/player'
import Image from 'next/image'

interface PerformanceEntryProps {
	performance: MatchPerformance & { nameTag: string }
	onClick?: () => void
}

export const PerformanceEntry = ({ performance, onClick }: PerformanceEntryProps) => {
	const team = performance.stats.team
	const agent = performance.stats.agent

	const rounds = performance.redRounds + performance.blueRounds
	const shots = performance.stats.headshots + performance.stats.bodyshots + performance.stats.legshots

	const hs = (performance.stats.headshots / shots) * 100
	const dd = (performance.stats.damageDealt - performance.stats.damageTaken) / rounds
	const adr = performance.stats.damageDealt / rounds
	const acs = performance.stats.score / rounds

	return (
		<div
			key={performance.id}
			className={
				'font-mono text-xs tracking-tighter flex flex-row items-center rounded bg-muted-foreground/10 border-1 border-foreground/20 hover:cursor-pointer'
			}
			onClick={onClick}
		>
			<div
				className={`h-full ${team === 'Blue' ? 'border-blue-500/50 bg-blue-500/30' : 'border-red-500/50 bg-red-500/30'}`}
			>
				&nbsp;
			</div>
			<div className={'w-full p-1 md:p-2 flex flex-row justify-between items-center'}>
				<div className={'w-[50px] flex flex-row gap-2 items-center'}>
					<span className={'h-10 w-10 overflow-hidden relative'}>
						{agent.img ? (
							<Image src={agent.img} alt={agent.name} fill className={'object-contain'} sizes={'100px'} />
						) : null}
					</span>
				</div>

				<div className={'text-xs flex-1 flex flex-row md:grid md:grid-cols-6 gap-2'}>
					<div className={'w-[100px] flex items-center my-auto text-wrap'}>{performance.nameTag}</div>
					<div className={'flex-1 flex flex-col items-center justify-center'}>
						<span className={'text-muted-foreground'}>ACS</span>
						<span className={'text-foreground'}>{acs.toFixed(0)}</span>
					</div>
					<div className={'flex-1 flex flex-col items-center justify-center'}>
						<span className={'text-muted-foreground'}>K / D / A</span>
						<span className={'text-foreground'}>
							{performance.stats.kills} / {performance.stats.deaths} / {performance.stats.assists}
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
				</div>
			</div>
		</div>
	)
}
