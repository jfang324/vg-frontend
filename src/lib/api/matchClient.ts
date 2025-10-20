import { Configuration, MatchesApi, ValidRegions } from '@generated/vg-backend/api-client'

export class MatchClient {
	private readonly generatedClient: MatchesApi

	constructor() {
		const basePath = process.env.NEXT_PUBLIC_BACKEND_URL

		if (!basePath) {
			throw new Error('NEXT_PUBLIC_BACKEND_URL is not set')
		}

		const configuration = new Configuration({
			basePath
		})

		this.generatedClient = new MatchesApi(configuration)
	}

	/**
	 * Fetches a list of matches for a given region and nameTag
	 * @param region The region to fetch matches for
	 * @param nameTag The nameTag to fetch matches for
	 * @returns A list of matches
	 */
	async getMatch(region: string, matchId: string) {
		const response = await this.generatedClient.getMatch(matchId, region as ValidRegions)

		return response.data
	}
}

export const matchClient = new MatchClient()
