import { Crosshair, HeartMinus, HeartPlus, Skull, Swords, Target } from 'lucide-react'

export enum Stats {
	acs = 'AVG COMBAT SCORE',
	hs = 'HEADSHOT %',
	kd = 'K/D RATIO',
	kda = 'KAD RATIO',
	adr = 'AVG DMG/ROUND',
	dd = 'DMG DIFFERENTIAL'
}

export const statIcons: Record<keyof typeof Stats, React.ElementType> = {
	acs: Target,
	hs: Crosshair,
	kd: Skull,
	kda: Swords,
	adr: HeartMinus,
	dd: HeartPlus
}
