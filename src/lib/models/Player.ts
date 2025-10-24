import { RecentMatchesPayloadDto, StoredMatchPayloadDto } from '@generated/vg-backend/api-client'
import { MatchPerformance, PlayerMetadata } from '@lib/types/player'
import { GraphMetrics } from '../../types/graph-metrics.type'

export class Player {
	private readonly metadata: PlayerMetadata
	private readonly matches: MatchPerformance[]

	constructor(metdata: PlayerMetadata, matches: MatchPerformance[] = []) {
		this.metadata = metdata
		this.matches = matches
	}

	static fromApiData(data: RecentMatchesPayloadDto | StoredMatchPayloadDto) {
		const metadata = {
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

		const matches = data.matches.map((match) => ({
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

		return new Player(metadata, matches)
	}

	static fromExistingPlayer(player: Player) {
		return new Player(player.getMetadata(), player.getMatches())
	}

	/**
	 * Calculate the performance metrics for each match
	 * @returns An array of performance metrics
	 */
	calculatePerformanceMetrics(): GraphMetrics[] {
		return this.matches.map((match) => {
			const totalRounds = match.redRounds + match.blueRounds || 1
			const totalShots = match.stats.headshots + match.stats.bodyshots + match.stats.legshots || 1

			return {
				acs: match.stats.score / totalRounds,
				hs: (match.stats.headshots / totalShots) * 100,
				kd: match.stats.kills / match.stats.deaths,
				kda: (match.stats.kills + match.stats.assists) / match.stats.deaths,
				adr: match.stats.damageDealt / totalRounds,
				dd: (match.stats.damageDealt - match.stats.damageTaken) / totalRounds
			}
		})
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

	/**
	 *  Get the player's metadata
	 * @returns The player's metadata
	 */
	getMetadata(): PlayerMetadata {
		return this.metadata
	}

	/**
	 * Get the player's recent matches
	 * @returns The player's recent matches
	 */
	getMatches(): MatchPerformance[] {
		return this.matches
	}

	/**
	 * Get the player's match frequency
	 * @returns The player's match frequency
	 */
	getMatchFrequency(): { date: string; count: number }[] {
		const map = new Map<string, number>()

		for (const match of this.matches) {
			const day = match.date.toISOString().split('T')[0]
			map.set(day, (map.get(day) ?? 0) + 1)
		}

		return [...map.entries()].sort(([a], [b]) => a.localeCompare(b)).map(([date, count]) => ({ date, count }))
	}

	/**
	 * Add matches to the player's recent matches
	 * @param matches The matches to add
	 */
	addMatches(matches: MatchPerformance[]) {
		this.matches.push(...matches)
	}
}
