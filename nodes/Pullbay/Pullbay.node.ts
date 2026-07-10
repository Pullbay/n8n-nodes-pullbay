import type {
	IDataObject,
	IExecuteFunctions,
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
} from 'n8n-workflow';
import { NodeConnectionTypes } from 'n8n-workflow';

import { appStoreFields, appStoreOperations } from './services/AppStore.description';
import { executeAppStore } from './services/AppStore.execute';
import { duckDuckGoFields, duckDuckGoOperations } from './services/DuckDuckGo.description';
import { executeDuckDuckGo } from './services/DuckDuckGo.execute';
import { googleNewsFields, googleNewsOperations } from './services/GoogleNews.description';
import { executeGoogleNews } from './services/GoogleNews.execute';
import { googlePlayFields, googlePlayOperations } from './services/GooglePlay.description';
import { executeGooglePlay } from './services/GooglePlay.execute';
import { googleSearchFields, googleSearchOperations } from './services/GoogleSearch.description';
import { executeGoogleSearch } from './services/GoogleSearch.execute';
import { youTubeFields, youTubeOperations } from './services/YouTube.description';
import { executeYouTube } from './services/YouTube.execute';

export class Pullbay implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Pullbay',
		name: 'pullbay',
		icon: 'file:pullbay.svg',
		group: ['transform'],
		version: 1,
		subtitle: '={{$parameter["resource"] + ": " + $parameter["operation"]}}',
		description: 'Interact with the Pullbay API',
		defaults: {
			name: 'Pullbay',
		},
		inputs: [NodeConnectionTypes.Main],
		outputs: [NodeConnectionTypes.Main],
		usableAsTool: true,
		credentials: [
			{
				name: 'pullbayApi',
				required: true,
			},
		],
		properties: [
			{
				displayName: 'Resource',
				name: 'resource',
				type: 'options',
				noDataExpression: true,
				options: [
					{
						name: 'App Store',
						value: 'appStore',
					},
					{
						name: 'DuckDuckGo',
						value: 'duckDuckGo',
					},
					{
						// eslint-disable-next-line n8n-nodes-base/node-param-resource-with-plural-option
						name: 'Google News',
						value: 'googleNews',
					},
					{
						name: 'Google Play',
						value: 'googlePlay',
					},
					{
						name: 'Google Search',
						value: 'googleSearch',
					},
					{
						name: 'YouTube',
						value: 'youTube',
					},
				],
				default: 'appStore',
				description: 'The service to use',
			},

			...appStoreOperations,
			...appStoreFields,

			...duckDuckGoOperations,
			...duckDuckGoFields,

			...googleNewsOperations,
			...googleNewsFields,

			...googlePlayOperations,
			...googlePlayFields,

			...googleSearchOperations,
			...googleSearchFields,

			...youTubeOperations,
			...youTubeFields,
		],
	};

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const items = this.getInputData();
		const returnData: INodeExecutionData[] = [];

		const resource = this.getNodeParameter('resource', 0) as string;
		const operation = this.getNodeParameter('operation', 0) as string;

		for (let i = 0; i < items.length; i++) {
			try {
				let responseData: IDataObject | undefined;

				if (resource === 'appStore') {
					responseData = await executeAppStore.call(this, operation, i);
				} else if (resource === 'duckDuckGo') {
					responseData = await executeDuckDuckGo.call(this, operation, i);
				} else if (resource === 'googleNews') {
					responseData = await executeGoogleNews.call(this, operation, i);
				} else if (resource === 'googlePlay') {
					responseData = await executeGooglePlay.call(this, operation, i);
				} else if (resource === 'googleSearch') {
					responseData = await executeGoogleSearch.call(this, operation, i);
				} else if (resource === 'youTube') {
					responseData = await executeYouTube.call(this, operation, i);
				}

				if (responseData) {
					returnData.push({
						json: responseData,
						pairedItem: { item: i },
					});
				}
			} catch (error) {
				if (this.continueOnFail()) {
					returnData.push({
						json: { error: (error as Error).message },
						pairedItem: { item: i },
					});
					continue;
				}
				throw error;
			}
		}

		return [returnData];
	}
}
