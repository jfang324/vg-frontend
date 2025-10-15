import { RecentMatchesPayloadDto } from '@generated/vg-backend/api-client'
import { MatchPerformance, PlayerMetadata } from '@lib/types/player'
import { GraphMetrics } from '../../types/graph-metrics.type'

export class Player {
	private readonly metadata: PlayerMetadata
	private readonly matches: MatchPerformance[]

	constructor(data: RecentMatchesPayloadDto) {
		this.metadata = {
			id: data.player.id,
			name: data.player.name,
			tag: data.player.tag,
			region: data.player.region,
			level: data.player.level,
			customization: {
				card: data.player.customization.card,
				title: data.player.customization.title,
				preferredLevelBorder: data.player.customization.preferredLevelBorder,
				cardImg: data.player.customization.cardImg
			},
			rank: {
				id: data.player.rank.id,
				name: data.player.rank.name,
				img: data.player.rank.img
			}
		}

		this.matches = data.matches.map((match) => ({
			id: match.id,
			date: new Date(match.date),
			winningTeam: match.winningTeam,
			redRounds: match.redRounds,
			blueRounds: match.blueRounds,
			map: {
				id: match.map.id,
				name: match.map.name,
				img: match.map.img
			},
			mode: {
				id: match.mode.id,
				name: match.mode.name
			},
			stats: {
				team: match.stats.team,
				score: match.stats.score,
				kills: match.stats.kills,
				deaths: match.stats.deaths,
				assists: match.stats.assists,
				damageDealt: match.stats.damageDealt,
				damageTaken: match.stats.damageTaken,
				headshots: match.stats.headshots,
				bodyshots: match.stats.bodyshots,
				legshots: match.stats.legshots,
				agent: {
					id: match.stats.agent.id,
					name: match.stats.agent.name,
					img: match.stats.agent.img
				},
				rank: {
					id: match.stats.rank.id,
					name: match.stats.rank.name
				}
			},
			agent: {
				id: match.stats.agent.id,
				name: match.stats.agent.name,
				img: match.stats.agent.img
			}
		}))
	}

	/**
	 * Calculate the performance metrics for each match
	 * @returns An array of performance metrics
	 */
	calculatePerformanceMetrics(): GraphMetrics[] {
		return this.matches.map((match) => ({
			acs: match.stats.score / (match.redRounds + match.blueRounds),
			hs: (match.stats.headshots / (match.stats.headshots + match.stats.bodyshots + match.stats.legshots)) * 100,
			kd: match.stats.kills / match.stats.deaths,
			kda: (match.stats.kills + match.stats.assists) / match.stats.deaths,
			adr: match.stats.damageDealt / (match.redRounds + match.blueRounds),
			dd: (match.stats.damageDealt - match.stats.damageTaken) / (match.redRounds + match.blueRounds)
		}))
	}

	/**
	 * Calculate the average performance metrics across all matches
	 * @returns The average performance metrics
	 */
	calculateAveragePerformanceMetrics(): GraphMetrics {
		const averages = this.calculatePerformanceMetrics()

		return {
			acs: averages.reduce((acc, match) => acc + match.acs, 0) / averages.length,
			hs: averages.reduce((acc, match) => acc + match.hs, 0) / averages.length,
			kd: averages.reduce((acc, match) => acc + match.kd, 0) / averages.length,
			kda: averages.reduce((acc, match) => acc + match.kda, 0) / averages.length,
			adr: averages.reduce((acc, match) => acc + match.adr, 0) / averages.length,
			dd: averages.reduce((acc, match) => acc + match.dd, 0) / averages.length
		}
	}
}
