export const REGIONS = {
	na: {
		abbreviation: 'NA',
		fullTitle: 'North America'
	},
	eu: {
		abbreviation: 'EU',
		fullTitle: 'Europe'
	},
	ap: {
		abbreviation: 'AP',
		fullTitle: 'Asia Pacific'
	},
	latam: {
		abbreviation: 'LA',
		fullTitle: 'Latin America'
	},
	kr: {
		abbreviation: 'KR',
		fullTitle: 'Korea'
	},
	br: {
		abbreviation: 'BR',
		fullTitle: 'Brazil'
	}
}

export type RegionKey = keyof typeof REGIONS
