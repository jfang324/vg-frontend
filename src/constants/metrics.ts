import { Crosshair, HeartMinus, HeartPlus, Skull, Swords, Target } from 'lucide-react'

export const METRICS = {
	acs: {
		abbreviation: 'ACS',
		shorthand: 'AVG COMBAT SCORE',
		fullTitle: 'AVERAGE COMBAT SCORE',
		description:
			'Average Combat Score (ACS) is a metric that measures the average number of kills, deaths, and assists per round in a match',
		icon: Target
	},
	hs: {
		abbreviation: 'HS%',
		shorthand: 'HEADSHOT %',
		fullTitle: 'HEADSHOT PERCENTAGE',
		description: 'Headshot percentage is a metric that measures the percentage of headshots in a match',
		icon: Crosshair
	},
	kd: {
		abbreviation: 'KD',
		shorthand: 'K/D RATIO',
		fullTitle: 'KILL/DEATH RATIO',
		description: 'Kill/Death Ratio (KDR) is a metric that measures the ratio of kills to deaths in a match',
		icon: Skull
	},
	kda: {
		abbreviation: 'KDA',
		shorthand: 'KAD RATIO',
		fullTitle: 'KILL+ASSIST/DEATH RATIO',
		description:
			'Kill+Assist/Death Ratio (KADR) is a metric that measures the ratio of kills and assists to deaths in a match',
		icon: Swords
	},
	adr: {
		abbreviation: 'ADR',
		shorthand: 'AVG DMG/ROUND',
		fullTitle: 'AVG DMG/ROUND',
		description:
			'Average Damage Per Round (ADR) is a metric that measures the average damage dealt per round in a match',
		icon: HeartMinus
	},
	dd: {
		abbreviation: 'ΔDD',
		shorthand: 'DMG DIFFERENTIAL',
		fullTitle: 'DMG DIFFERENTIAL',
		description:
			'Damage Differential (DD) is a metric that measures the difference between the highest and lowest damage dealt in a match',
		icon: HeartPlus
	}
}

export type MetricKey = keyof typeof METRICS
