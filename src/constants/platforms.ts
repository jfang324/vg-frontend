export const PLATFORMS = {
	pc: {
		abbreviation: 'PC',
		fullTitle: 'PC'
	},
	console: {
		abbreviation: 'Console',
		fullTitle: 'Console'
	}
}

export type PlatformKey = keyof typeof PLATFORMS
