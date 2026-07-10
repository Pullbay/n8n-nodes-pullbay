import type { IDataObject, IExecuteFunctions, IHttpRequestMethods, IHttpRequestOptions, JsonObject } from 'n8n-workflow';
import { NodeApiError } from 'n8n-workflow';

export async function pullbayApiRequest(
	this: IExecuteFunctions,
	method: IHttpRequestMethods,
	endpoint: string,
	qs: Record<string, string | number> = {},
	body: object = {},
): Promise<IDataObject> {
	const credentials = await this.getCredentials('pullbayApi');
	const baseUrl = credentials.baseUrl as string;

	const options: IHttpRequestOptions = {
		method,
		url: `${baseUrl}${endpoint}`,
		qs,
		json: true,
	};

	if (Object.keys(body).length > 0) {
		options.body = body;
	}

	try {
		return await this.helpers.httpRequestWithAuthentication.call(this, 'pullbayApi', options) as IDataObject;
	} catch (error) {
		throw new NodeApiError(this.getNode(), error as JsonObject);
	}
}
