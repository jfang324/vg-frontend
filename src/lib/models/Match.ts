import { GetMatchPayloadDto } from '@generated/vg-backend/api-client'
import { MatchPerformance } from '@lib/types/player'

export class Match {
	private readonly performances: (MatchPerformance & { nameTag: string })[]

	constructor(data: GetMatchPayloadDto) {
		const match = data.match
		const players = data.players

		this.performances = players.map((p) => {
			const player = p.player
			const stats = p.stats

			return {
				id: match.id,
				nameTag: `${player.name}#${player.tag}`,
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
					team: stats.team,
					score: stats.score,
					kills: stats.kills,
					deaths: stats.deaths,
					assists: stats.assists,
					damageDealt: stats.damageDealt,
					damageTaken: stats.damageTaken,
					headshots: stats.headshots,
					bodyshots: stats.bodyshots,
					legshots: stats.legshots,
					agent: {
						id: stats.agent.id,
						name: stats.agent.name,
						img: stats.agent.img
					},
					rank: {
						id: stats.rank.id,
						name: stats.rank.name
					}
				},
				agent: {
					id: stats.agent.id,
					name: stats.agent.name,
					img: stats.agent.img
				}
			}
		})
	}

	/**
	 *  Get the match's performances
	 * @returns All player performances for the match
	 */
	getPerformances(): (MatchPerformance & { nameTag: string })[] {
		return this.performances.sort((a, b) => {
			const teamCompare = a.stats.team.localeCompare(b.stats.team)
			if (teamCompare !== 0) return teamCompare

			return b.stats.score - a.stats.score
		})
	}
}
