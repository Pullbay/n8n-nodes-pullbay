import type {
	IAuthenticateGeneric,
	ICredentialTestRequest,
	ICredentialType,
	Icon,
	INodeProperties,
} from 'n8n-workflow';

export class PullbayApi implements ICredentialType {
	name = 'pullbayApi';
	displayName = 'Pullbay API';
	icon: Icon = 'file:../nodes/Pullbay/pullbay.svg';
	documentationUrl = 'https://pullbay.com/docs';

	properties: INodeProperties[] = [
		{
			displayName: 'API Key',
			name: 'apiKey',
			type: 'string',
			typeOptions: { password: true },
			default: '',
			required: true,
		},
		{
			displayName: 'Base URL',
			name: 'baseUrl',
			type: 'string',
			default: 'https://api.pullbay.com',
			required: true,
			description: 'The base URL of the Pullbay API',
		},
	];

	authenticate: IAuthenticateGeneric = {
		type: 'generic',
		properties: {
			headers: {
				'x-api-key': '={{$credentials.apiKey}}',
			},
		},
	};

	test: ICredentialTestRequest = {
		request: {
			baseURL: '={{$credentials.baseUrl}}',
			url: '/appstore/apps?appId=284882215',
			method: 'GET',
		},
	};
}
