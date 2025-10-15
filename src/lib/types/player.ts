export type Customization = {
	card: string
	title: string
	preferredLevelBorder: string
	cardImg?: string
}

export type FullRank = {
	id: number
	name: string
	img?: string
}

export type PlayerMetadata = {
	id: string
	name: string
	tag: string
	region: string
	level: number
	customization: Customization
	rank: FullRank
}

export type GameMap = {
	id: string
	name: string
	img?: string
}

export type GameMode = {
	id: string
	name: string
}

export type Agent = {
	id: string
	name: string
	img?: string
}

export type MatchPerformance = {
	id: string
	date: Date
	winningTeam: string
	redRounds: number
	blueRounds: number
	map: GameMap
	mode: GameMode
	stats: {
		team: string
		score: number
		kills: number
		deaths: number
		assists: number
		damageDealt: number
		damageTaken: number
		headshots: number
		bodyshots: number
		legshots: number
		agent: Agent
		rank: Omit<FullRank, 'img'>
	}
	agent: Agent
}
