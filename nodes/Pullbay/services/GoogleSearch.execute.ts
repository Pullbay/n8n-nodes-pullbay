import type { IDataObject, IExecuteFunctions } from 'n8n-workflow';
import { NodeOperationError } from 'n8n-workflow';

import { pullbayApiRequest } from '../GenericFunctions';

export async function executeGoogleSearch(
	this: IExecuteFunctions,
	operation: string,
	itemIndex: number,
): Promise<IDataObject> {
	if (operation === 'search') {
		const query = this.getNodeParameter('query', itemIndex) as string;
		const paginationType = this.getNodeParameter('paginationType', itemIndex, 'maxItems') as string;
		const additionalFields = this.getNodeParameter('additionalFields', itemIndex, {}) as {
			country?: string;
			hl?: string;
			safe?: string;
		};

		const qs: Record<string, string | number> = { query };

		if (paginationType === 'maxItems') {
			const maxItems = this.getNodeParameter('maxItems', itemIndex, 0) as number;
			if (maxItems) qs.maxItems = maxItems;
		} else {
			const page = this.getNodeParameter('page', itemIndex, 0) as number;
			if (page) qs.page = page;
		}

		if (additionalFields.country) qs.country = additionalFields.country;
		if (additionalFields.hl) qs.hl = additionalFields.hl;
		if (additionalFields.safe && additionalFields.safe === 'on') qs.safe = 'on';

		return await pullbayApiRequest.call(this, 'GET', '/google-search/search', qs);
	}

	throw new NodeOperationError(this.getNode(), `Unsupported operation: ${operation}`);
}
