import type { IDataObject, IExecuteFunctions } from 'n8n-workflow';
import { NodeOperationError } from 'n8n-workflow';

import { pullbayApiRequest } from '../GenericFunctions';

export async function executeGooglePlay(
	this: IExecuteFunctions,
	operation: string,
	itemIndex: number,
): Promise<IDataObject> {
	const additionalFields = this.getNodeParameter('additionalFields', itemIndex, {}) as {
		country?: string;
		lang?: string;
	};

	if (operation === 'fetchApp') {
		const appId = this.getNodeParameter('appId', itemIndex) as string;

		const qs: Record<string, string> = { appId };
		if (additionalFields.country) qs.country = additionalFields.country;
		if (additionalFields.lang) qs.lang = additionalFields.lang;

		return await pullbayApiRequest.call(this, 'GET', '/google-play/apps', qs);
	}

	if (operation === 'fetchDataSafety') {
		const appId = this.getNodeParameter('appId', itemIndex) as string;

		const qs: Record<string, string> = { appId };

		return await pullbayApiRequest.call(this, 'GET', '/google-play/data-safety', qs);
	}

	if (operation === 'fetchPermissions') {
		const appId = this.getNodeParameter('appId', itemIndex) as string;

		const qs: Record<string, string> = { appId };

		return await pullbayApiRequest.call(this, 'GET', '/google-play/permissions', qs);
	}

	if (operation === 'fetchSimilarApps') {
		const appId = this.getNodeParameter('appId', itemIndex) as string;

		const qs: Record<string, string> = { appId };

		return await pullbayApiRequest.call(this, 'GET', '/google-play/similar', qs);
	}

	if (operation === 'fetchReviews') {
		const appId = this.getNodeParameter('appId', itemIndex) as string;
		const sort = this.getNodeParameter('sort', itemIndex, 'NEWEST') as string;
		const paginationType = this.getNodeParameter('paginationType', itemIndex, 'maxItems') as string;

		const qs: Record<string, string | number> = { appId };
		if (additionalFields.country) qs.country = additionalFields.country;
		if (additionalFields.lang) qs.lang = additionalFields.lang;
		if (sort) qs.sort = sort;
		if (paginationType === 'maxItems') {
			const maxItems = this.getNodeParameter('maxItems', itemIndex, 0) as number;
			if (maxItems) qs.maxItems = maxItems;
		} else {
			const cursor = this.getNodeParameter('cursor', itemIndex, '') as string;
			if (cursor) qs.cursor = cursor;
		}

		return await pullbayApiRequest.call(this, 'GET', '/google-play/reviews', qs);
	}

	if (operation === 'searchApps') {
		const search = this.getNodeParameter('search', itemIndex) as string;
		const price = this.getNodeParameter('price', itemIndex, 'all') as string;

		const qs: Record<string, string> = { search };
		if (additionalFields.country) qs.country = additionalFields.country;
		if (additionalFields.lang) qs.lang = additionalFields.lang;
		if (price && price !== 'all') qs.price = price;

		return await pullbayApiRequest.call(this, 'GET', '/google-play/search', qs);
	}

	throw new NodeOperationError(this.getNode(), `Unsupported operation: ${operation}`);
}
