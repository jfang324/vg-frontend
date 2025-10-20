import { Configuration, PlayersApi, ValidModes, ValidPlatforms, ValidRegions } from '@generated/vg-backend/api-client'

export class PlayerClient {
	private readonly generatedClient: PlayersApi

	constructor() {
		const basePath = process.env.NEXT_PUBLIC_BACKEND_URL

		if (!basePath) {
			throw new Error('NEXT_PUBLIC_BACKEND_URL is not set')
		}

		const config = new Configuration({
			basePath,
			baseOptions: {
				withCredentials: true
			}
		})

		this.generatedClient = new PlayersApi(config)
	}

	/**
	 *  Fetches the most recent matches for the player specified
	 */
	async getRecentMatches(nameTag: string, region: string, platform: string, mode: string, limit: number) {
		const response = await this.generatedClient.getRecentMatches(
			nameTag,
			region as ValidRegions,
			platform as ValidPlatforms,
			mode as ValidModes,
			limit
		)

		return response.data
	}
}

export const playerClient = new PlayerClient()
