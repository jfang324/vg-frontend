import { Configuration, PlayersApi, ValidModes, ValidRegions } from '@generated/vg-backend/api-client'

export class ProfileClient {
	private readonly generatedClient: PlayersApi

	constructor() {
		const basePath = process.env.NEXT_PUBLIC_BACKEND_URL

		if (!basePath) {
			throw new Error('NEXT_PUBLIC_BACKEND_URL is not set')
		}

		const config = new Configuration({
			basePath
		})

		this.generatedClient = new PlayersApi(config)
	}

	/**
	 *  Fetches stored matches for the player specified
	 */
	async getPlayerProfile(nameTag: string, region: string, mode: string) {
		const response = await this.generatedClient.getStoredMatches(
			nameTag,
			region as ValidRegions,
			mode as ValidModes,
			1,
			10
		)

		return response.data
	}

	/**
	 *  Fetches stored matches for the player specified
	 */
	async getPlayerMatches(nameTag: string, region: string, mode: string, page: number) {
		const response = await this.generatedClient.getStoredMatches(
			nameTag,
			region as ValidRegions,
			mode as ValidModes,
			page,
			10
		)

		return response.data
	}
}

export const profileClient = new ProfileClient()
