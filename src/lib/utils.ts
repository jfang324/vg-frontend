import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { PlayerAnalytics } from '../types/player-analytics.type'
import { GraphMetrics } from './../types/graph-metrics.type'

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs))
}

/**
 * Convert a string to a color
 * @param str The string to convert
 * @returns The color in hex format
 */
export function stringToColor(str: string): string {
	let hash = 0
	let color = '#'

	str.split('').forEach((char) => {
		hash = char.charCodeAt(0) + ((hash << 5) - hash)
	})

	for (let i = 0; i < 3; i++) {
		const value = (hash >> (i * 8)) & 0xff
		color += `00${value.toString(16)}`.slice(-2)
	}

	return color
}

/**
 * Calculate the overall performance analytics for a list of players
 * @param averages The list of average performance metrics
 * @returns The overall performance analytics
 */
export function calculateOverallPerformanceAnalytics(averages: GraphMetrics[]) {
	const empty = averages.length === 0

	const analytics: PlayerAnalytics = {
		acs: {
			average: 0,
			highest: empty ? 0 : averages[0].acs,
			lowest: empty ? 0 : averages[0].acs,
			variance: 0
		},
		hs: {
			average: 0,
			highest: empty ? 0 : averages[0].hs,
			lowest: empty ? 0 : averages[0].hs,
			variance: 0
		},
		kd: {
			average: 0,
			highest: empty ? 0 : averages[0].kd,
			lowest: empty ? 0 : averages[0].kd,
			variance: 0
		},
		kda: {
			average: 0,
			highest: empty ? 0 : averages[0].kda,
			lowest: empty ? 0 : averages[0].kda,
			variance: 0
		},
		adr: {
			average: 0,
			highest: empty ? 0 : averages[0].adr,
			lowest: empty ? 0 : averages[0].adr,
			variance: 0
		},
		dd: {
			average: 0,
			highest: empty ? 0 : averages[0].dd,
			lowest: empty ? 0 : averages[0].dd,
			variance: 0
		}
	}

	for (const average of averages) {
		analytics.acs.average += average.acs
		analytics.hs.average += average.hs
		analytics.kd.average += average.kd
		analytics.kda.average += average.kda
		analytics.adr.average += average.adr
		analytics.dd.average += average.dd

		analytics.acs.highest = Math.max(analytics.acs.highest, average.acs)
		analytics.hs.highest = Math.max(analytics.hs.highest, average.hs)
		analytics.kd.highest = Math.max(analytics.kd.highest, average.kd)
		analytics.kda.highest = Math.max(analytics.kda.highest, average.kda)
		analytics.adr.highest = Math.max(analytics.adr.highest, average.adr)
		analytics.dd.highest = Math.max(analytics.dd.highest, average.dd)

		analytics.acs.lowest = Math.min(analytics.acs.lowest, average.acs)
		analytics.hs.lowest = Math.min(analytics.hs.lowest, average.hs)
		analytics.kd.lowest = Math.min(analytics.kd.lowest, average.kd)
		analytics.kda.lowest = Math.min(analytics.kda.lowest, average.kda)
		analytics.adr.lowest = Math.min(analytics.adr.lowest, average.adr)
		analytics.dd.lowest = Math.min(analytics.dd.lowest, average.dd)
	}

	analytics.acs.average = analytics.acs.average / (averages.length || 1)
	analytics.hs.average = analytics.hs.average / (averages.length || 1)
	analytics.kd.average = analytics.kd.average / (averages.length || 1)
	analytics.kda.average = analytics.kda.average / (averages.length || 1)
	analytics.adr.average = analytics.adr.average / (averages.length || 1)
	analytics.dd.average = analytics.dd.average / (averages.length || 1)

	return {
		acs: {
			...analytics.acs,
			variance: empty
				? 0
				: (Math.max(
						analytics.acs.highest - analytics.acs.average,
						analytics.acs.average - analytics.acs.lowest
					) /
						analytics.acs.average) *
					100
		},
		hs: {
			...analytics.hs,
			variance: empty
				? 0
				: (Math.max(analytics.hs.highest - analytics.hs.average, analytics.hs.average - analytics.hs.lowest) /
						analytics.hs.average) *
					100
		},
		kd: {
			...analytics.kd,
			variance: empty
				? 0
				: (Math.max(analytics.kd.highest - analytics.kd.average, analytics.kd.average - analytics.kd.lowest) /
						analytics.kd.average) *
					100
		},
		kda: {
			...analytics.kda,
			variance: empty
				? 0
				: (Math.max(
						analytics.kda.highest - analytics.kda.average,
						analytics.kda.average - analytics.kda.lowest
					) /
						analytics.kda.average) *
					100
		},
		adr: {
			...analytics.adr,
			variance: empty
				? 0
				: (Math.max(
						analytics.adr.highest - analytics.adr.average,
						analytics.adr.average - analytics.adr.lowest
					) /
						analytics.adr.average) *
					100
		},
		dd: {
			...analytics.dd,
			variance: empty
				? 0
				: (Math.max(analytics.dd.highest - analytics.dd.average, analytics.dd.average - analytics.dd.lowest) /
						analytics.dd.average) *
					100
		}
	}
}
