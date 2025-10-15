import { GraphMetadata } from './graph-metadata.type'
import { GraphMetrics } from './graph-metrics.type'

export type GraphedPlayer = {
	metadata: GraphMetadata
	matches: GraphMetrics[]
}
