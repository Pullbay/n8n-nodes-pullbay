import type { IDataObject, IExecuteFunctions } from 'n8n-workflow';
import { NodeOperationError } from 'n8n-workflow';

import { pullbayApiRequest } from '../GenericFunctions';

const endpointMap: Record<string, string> = {
	search: '/duckduckgo/search',
	searchImages: '/duckduckgo/images',
	searchNews: '/duckduckgo/news',
	searchVideos: '/duckduckgo/videos',
};

export async function executeDuckDuckGo(
	this: IExecuteFunctions,
	operation: string,
	itemIndex: number,
): Promise<IDataObject> {
	const endpoint = endpointMap[operation];
	if (!endpoint) {
		throw new NodeOperationError(this.getNode(), `Unsupported operation: ${operation}`);
	}

	const term = this.getNodeParameter('term', itemIndex) as string;
	const region = this.getNodeParameter('region', itemIndex) as string;
	const offset = this.getNodeParameter('offset', itemIndex, 0) as number;
	const safeSearch = this.getNodeParameter('safeSearch', itemIndex, 'off') as string;

	const qs: Record<string, string | number> = { term, region, safeSearch };
	if (offset) qs.offset = offset;

	if (operation !== 'searchImages') {
		const time = this.getNodeParameter('time', itemIndex, 'a') as string;
		if (time && time !== 'a') qs.time = time;
	}

	return await pullbayApiRequest.call(this, 'GET', endpoint, qs);
}
