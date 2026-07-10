import type { INodeProperties } from 'n8n-workflow';

export const googleSearchOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['googleSearch'],
			},
		},
		options: [
			{
				name: 'Search',
				value: 'search',
				description: 'Search the web via Google',
				action: 'Search the web',
			},
		],
		default: 'search',
	},
];

export const googleSearchFields: INodeProperties[] = [
	// ── Query (required) ──────────────────────────────────────
	{
		displayName: 'Query',
		name: 'query',
		type: 'string',
		default: '',
		required: true,
		description: 'The search query',
		displayOptions: {
			show: {
				resource: ['googleSearch'],
				operation: ['search'],
			},
		},
	},

	// ── Pagination Type ───────────────────────────────────────
	{
		displayName: 'Pagination Type',
		name: 'paginationType',
		type: 'options',
		options: [
			{ name: 'Max Items', value: 'maxItems' },
			{ name: 'Page', value: 'page' },
		],
		default: 'maxItems',
		description: 'Whether to limit results by count or paginate by page number',
		displayOptions: {
			show: {
				resource: ['googleSearch'],
				operation: ['search'],
			},
		},
	},
	{
		displayName: 'Max Items',
		name: 'maxItems',
		type: 'number',
		typeOptions: { minValue: 1 },
		placeholder: '10',
		default: 100,
		description: 'Maximum number of results to return',
		displayOptions: {
			show: {
				resource: ['googleSearch'],
				operation: ['search'],
				paginationType: ['maxItems'],
			},
		},
	},
	{
		displayName: 'Page',
		name: 'page',
		type: 'number',
		typeOptions: { minValue: 1 },
		default: 1,
		description: 'Page number for pagination',
		displayOptions: {
			show: {
				resource: ['googleSearch'],
				operation: ['search'],
				paginationType: ['page'],
			},
		},
	},

	// ── Additional Fields ─────────────────────────────────────
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['googleSearch'],
				operation: ['search'],
			},
		},
		options: [
			{
				displayName: 'Country',
				name: 'country',
				type: 'string',
				default: '',
				placeholder: 'us',
				description: 'Two-letter country code',
			},
			{
				displayName: 'Language',
				name: 'hl',
				type: 'string',
				default: '',
				placeholder: 'en',
				description: 'Language code for the results',
			},
			{
				displayName: 'Safe Search',
				name: 'safe',
				type: 'options',
				options: [
					{ name: 'Off', value: 'off' },
					{ name: 'On', value: 'on' },
				],
				default: 'off',
				description: 'Whether to enable safe search filtering',
			},
		],
	},
];
