import type { IDataObject, IExecuteFunctions } from 'n8n-workflow';
import { NodeOperationError } from 'n8n-workflow';

import { pullbayApiRequest } from '../GenericFunctions';

export async function executeGoogleNews(
	this: IExecuteFunctions,
	operation: string,
	itemIndex: number,
): Promise<IDataObject> {
	const additionalFields = this.getNodeParameter('additionalFields', itemIndex, {}) as {
		languageCode?: string;
	};

	if (operation === 'newsByCategory') {
		const category = this.getNodeParameter('category', itemIndex) as string;

		const qs: Record<string, string> = { category };
		if (additionalFields.languageCode) qs.languageCode = additionalFields.languageCode;

		return await pullbayApiRequest.call(this, 'GET', '/google-news/category', qs);
	}

	if (operation === 'searchNews') {
		const query = this.getNodeParameter('query', itemIndex) as string;
		const maxItems = this.getNodeParameter('maxItems', itemIndex, 50) as number;
		const resolveUrl = this.getNodeParameter('resolveUrl', itemIndex, 'no') as string;

		const qs: Record<string, string | number> = { query };
		if (additionalFields.languageCode) qs.languageCode = additionalFields.languageCode;
		if (maxItems) qs.maxItems = maxItems;
		if (resolveUrl !== 'no') qs.resolveUrl = resolveUrl;

		return await pullbayApiRequest.call(this, 'GET', '/google-news/search', qs);
	}

	throw new NodeOperationError(this.getNode(), `Unsupported operation: ${operation}`);
}
