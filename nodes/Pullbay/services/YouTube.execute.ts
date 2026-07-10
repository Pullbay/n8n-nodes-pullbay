import type { IDataObject, IExecuteFunctions } from 'n8n-workflow';
import { NodeOperationError } from 'n8n-workflow';

import { pullbayApiRequest } from '../GenericFunctions';

export async function executeYouTube(
	this: IExecuteFunctions,
	operation: string,
	itemIndex: number,
): Promise<IDataObject> {
	if (operation === 'fetchChannel') {
		const identifierType = this.getNodeParameter('channelIdentifierType', itemIndex) as string;
		const qs: Record<string, string> = {};

		if (identifierType === 'id') {
			qs.id = this.getNodeParameter('channelId', itemIndex) as string;
		} else if (identifierType === 'handle') {
			qs.handle = this.getNodeParameter('handle', itemIndex) as string;
		} else {
			qs.channelUrl = this.getNodeParameter('channelUrl', itemIndex) as string;
		}

		return await pullbayApiRequest.call(this, 'GET', '/api/youtube/channel', qs);
	}

	if (operation === 'fetchComments') {
		const videoId = this.getNodeParameter('videoId', itemIndex) as string;
		const sort = this.getNodeParameter('sort', itemIndex, 'top') as string;
		const paginationType = this.getNodeParameter('paginationType', itemIndex, 'maxItems') as string;

		const qs: Record<string, string | number> = { id: videoId };
		if (sort) qs.sort = sort;

		if (paginationType === 'maxItems') {
			const maxItems = this.getNodeParameter('maxItems', itemIndex, 0) as number;
			if (maxItems) qs.maxItems = maxItems;
		} else {
			const cursor = this.getNodeParameter('cursor', itemIndex, '') as string;
			if (cursor) qs.cursor = cursor;
		}

		return await pullbayApiRequest.call(this, 'GET', '/api/youtube/comments', qs);
	}

	if (operation === 'fetchTrending') {
		const additionalFields = this.getNodeParameter('additionalFields', itemIndex, {}) as {
			geo?: string;
		};

		const qs: Record<string, string> = {};
		if (additionalFields.geo) qs.geo = additionalFields.geo;

		return await pullbayApiRequest.call(this, 'GET', '/api/youtube/trending', qs);
	}

	if (operation === 'fetchVideo') {
		const videoId = this.getNodeParameter('videoId', itemIndex) as string;
		const additionalFields = this.getNodeParameter('additionalFields', itemIndex, {}) as {
			type?: string;
		};

		const qs: Record<string, string> = { id: videoId };
		if (additionalFields.type) qs.type = additionalFields.type;

		return await pullbayApiRequest.call(this, 'GET', '/api/youtube/video', qs);
	}

	if (operation === 'fetchHashtag') {
		const tag = this.getNodeParameter('tag', itemIndex) as string;
		const paginationType = this.getNodeParameter('paginationType', itemIndex, 'maxItems') as string;

		const qs: Record<string, string | number> = { tag };

		if (paginationType === 'maxItems') {
			const maxItems = this.getNodeParameter('maxItems', itemIndex, 0) as number;
			if (maxItems) qs.maxItems = maxItems;
		} else {
			const cursor = this.getNodeParameter('cursor', itemIndex, '') as string;
			if (cursor) qs.cursor = cursor;
		}

		return await pullbayApiRequest.call(this, 'GET', '/api/youtube/hashtag', qs);
	}

	if (operation === 'search') {
		const query = this.getNodeParameter('query', itemIndex) as string;
		const mode = this.getNodeParameter('mode', itemIndex) as string;
		const paginationType = this.getNodeParameter('paginationType', itemIndex, 'maxItems') as string;
		const additionalFields = this.getNodeParameter('additionalFields', itemIndex, {}) as {
			sortBy?: string;
			lang?: string;
			geo?: string;
			duration?: string;
			features?: string;
			uploadDate?: string;
		};

		const qs: Record<string, string | number> = { query, mode };

		if (paginationType === 'maxItems') {
			const maxItems = this.getNodeParameter('maxItems', itemIndex, 0) as number;
			if (maxItems) qs.maxItems = maxItems;
		} else {
			const cursor = this.getNodeParameter('cursor', itemIndex, '') as string;
			if (cursor) qs.cursor = cursor;
		}

		if (additionalFields.sortBy) qs.sortBy = additionalFields.sortBy;
		if (additionalFields.lang) qs.lang = additionalFields.lang;
		if (additionalFields.geo) qs.geo = additionalFields.geo;
		if (additionalFields.duration) qs.duration = additionalFields.duration;
		if (additionalFields.features) qs.features = additionalFields.features;
		if (additionalFields.uploadDate) qs.uploadDate = additionalFields.uploadDate;

		return await pullbayApiRequest.call(this, 'GET', '/api/youtube/search', qs);
	}

	throw new NodeOperationError(this.getNode(), `Unsupported operation: ${operation}`);
}
