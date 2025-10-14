export const mockAnalytics = [
	{
		stat: 'acs',
		average: 287,
		highest: 276,
		lowest: 213,
		variance: 12.3
	},
	{
		stat: 'hs',
		average: 28.4,
		highest: 29.8,
		lowest: 21.3,
		variance: 10.3,
		unit: '%'
	},
	{
		stat: 'kd',
		average: 1.42,
		highest: 1.4,
		lowest: 1.3,
		variance: 5.3
	},
	{
		stat: 'kda',
		average: 1.89,
		highest: 1.89,
		lowest: 1.8,
		variance: 23
	},
	{
		stat: 'adr',
		average: 187,
		highest: 193,
		lowest: 173,
		variance: 12
	},
	{
		stat: 'dd',
		average: 42,
		highest: 39.2,
		lowest: 37.2,
		variance: 15.2
	}
]

export const mockPlayerData = {
	TenZ: {
		name: 'TenZ',
		tag: 'SEN',
		matches: [
			{ acs: 250, hs: 28.4, kd: 1.2, kda: 1.5, adr: 180, dd: 25 },
			{ acs: 275, hs: 32.1, kd: 1.3, kda: 1.6, adr: 190, dd: 28 },
			{ acs: 240, hs: 30.5, kd: 1.1, kda: 1.4, adr: 175, dd: 22 },
			{ acs: 300, hs: 35.2, kd: 1.4, kda: 1.7, adr: 200, dd: 30 },
			{ acs: 260, hs: 29.8, kd: 1.2, kda: 1.5, adr: 185, dd: 26 },
			{ acs: 280, hs: 33.0, kd: 1.3, kda: 1.6, adr: 190, dd: 27 }
		]
	},
	Aspas: {
		name: 'Aspas',
		tag: 'Gira',
		matches: [
			{ acs: 220, hs: 25.0, kd: 1.0, kda: 1.3, adr: 165, dd: 20 },
			{ acs: 240, hs: 28.3, kd: 1.1, kda: 1.4, adr: 170, dd: 22 },
			{ acs: 230, hs: 26.5, kd: 1.0, kda: 1.3, adr: 168, dd: 21 },
			{ acs: 250, hs: 30.1, kd: 1.2, kda: 1.5, adr: 180, dd: 24 },
			{ acs: 235, hs: 27.2, kd: 1.1, kda: 1.4, adr: 175, dd: 22 },
			{ acs: 245, hs: 29.0, kd: 1.2, kda: 1.5, adr: 178, dd: 23 }
		]
	}
}
