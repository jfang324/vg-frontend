export const MODES = {
	competitive: {
		abbreviation: 'Comp',
		fullTitle: 'Competitive'
	},
	unrated: {
		abbreviation: 'Unr',
		fullTitle: 'Unrated'
	}
	// deathmatch: {
	// 	abbreviation: 'Dm',
	// 	fullTitle: 'Deathmatch'
	// },
	// teamdeathmatch: {
	// 	abbreviation: 'Tdm',
	// 	fullTitle: 'Team Deathmatch'
	// }
}

export type ModeKey = keyof typeof MODES
