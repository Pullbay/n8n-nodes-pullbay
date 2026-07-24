import type { IDataObject, IExecuteFunctions } from 'n8n-workflow';
import { NodeOperationError } from 'n8n-workflow';

import { pullbayApiRequest } from '../GenericFunctions';

export async function executeAppStore(
	this: IExecuteFunctions,
	operation: string,
	itemIndex: number,
): Promise<IDataObject> {
	const additionalFields = this.getNodeParameter('additionalFields', itemIndex, {}) as {
		country?: string;
		lang?: string;
	};

	if (operation === 'fetchApp') {
		const identifierType = this.getNodeParameter('identifierType', itemIndex) as string;
		const qs: Record<string, string> = {};
		if (identifierType === 'appId') {
			qs.appId = this.getNodeParameter('appId', itemIndex) as string;
		} else {
			qs.bundleId = this.getNodeParameter('bundleId', itemIndex) as string;
		}
		if (additionalFields.country) qs.country = additionalFields.country;
		if (additionalFields.lang) qs.lang = additionalFields.lang;

		return await pullbayApiRequest.call(this, 'GET', '/appstore/apps', qs);
	}

	if (operation === 'fetchDeveloper') {
		const developerId = this.getNodeParameter('developerId', itemIndex) as string;

		const qs: Record<string, string> = { developerId };
		if (additionalFields.country) qs.country = additionalFields.country;

		return await pullbayApiRequest.call(this, 'GET', '/appstore/developer', qs);
	}

	if (operation === 'fetchReviews') {
		const identifierType = this.getNodeParameter('identifierType', itemIndex) as string;
		const sort = this.getNodeParameter('sort', itemIndex, 'recent') as string;
		const paginationType = this.getNodeParameter('paginationType', itemIndex, 'maxItems') as string;

		const qs: Record<string, string | number> = {};
		if (identifierType === 'appId') {
			qs.appId = this.getNodeParameter('appId', itemIndex) as string;
		} else {
			qs.bundleId = this.getNodeParameter('bundleId', itemIndex) as string;
		}
		if (additionalFields.country) qs.country = additionalFields.country;
		if (sort) qs.sort = sort;
		if (paginationType === 'maxItems') {
			const maxItems = this.getNodeParameter('maxItems', itemIndex, 0) as number;
			if (maxItems) qs.maxItems = maxItems;
		} else {
			const page = this.getNodeParameter('page', itemIndex, 0) as number;
			if (page) qs.page = page;
		}

		return await pullbayApiRequest.call(this, 'GET', '/appstore/reviews', qs);
	}

	if (operation === 'fetchSimilarApps') {
		const identifierType = this.getNodeParameter('identifierType', itemIndex) as string;
		const qs: Record<string, string> = {};
		if (identifierType === 'appId') {
			qs.appId = this.getNodeParameter('appId', itemIndex) as string;
		} else {
			qs.bundleId = this.getNodeParameter('bundleId', itemIndex) as string;
		}
		if (additionalFields.country) qs.country = additionalFields.country;
		if (additionalFields.lang) qs.lang = additionalFields.lang;

		return await pullbayApiRequest.call(this, 'GET', '/appstore/similar', qs);
	}

	if (operation === 'searchApps') {
		const term = this.getNodeParameter('term', itemIndex) as string;
		const paginationType = this.getNodeParameter('paginationType', itemIndex, 'maxItems') as string;

		const qs: Record<string, string | number> = { term };
		if (additionalFields.country) qs.country = additionalFields.country;
		if (additionalFields.lang) qs.lang = additionalFields.lang;
		if (paginationType === 'maxItems') {
			const maxItems = this.getNodeParameter('maxItems', itemIndex, 0) as number;
			if (maxItems) qs.maxItems = maxItems;
		} else {
			const page = this.getNodeParameter('page', itemIndex, 0) as number;
			if (page) qs.page = page;
		}

		return await pullbayApiRequest.call(this, 'GET', '/appstore/search', qs);
	}

	throw new NodeOperationError(this.getNode(), `Unsupported operation: ${operation}`);
}
