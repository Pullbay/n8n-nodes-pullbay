import type { INodeProperties } from 'n8n-workflow';

export const appStoreOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['appStore'],
			},
		},
		options: [
			{
				name: 'Fetch App',
				value: 'fetchApp',
				description: 'Get app details by ID or bundle ID',
				action: 'Get app details',
			},
			{
				name: 'Fetch Developer',
				value: 'fetchDeveloper',
				description: 'Get apps by a developer',
				action: 'Get developer apps',
			},
			{
				name: 'Fetch Reviews',
				value: 'fetchReviews',
				description: 'Get reviews for an app',
				action: 'Get reviews',
			},
			{
				name: 'Fetch Similar Apps',
				value: 'fetchSimilarApps',
				description: 'Get similar apps',
				action: 'Get similar apps',
			},
			{
				name: 'Search Apps',
				value: 'searchApps',
				description: 'Search for apps',
				action: 'Search apps',
			},
		],
		default: 'fetchApp',
	},
];

export const appStoreFields: INodeProperties[] = [
	// ── Identifier Type (App, Reviews, Similar) ───────────────
	{
		displayName: 'Identifier Type',
		name: 'identifierType',
		type: 'options',
		options: [
			{ name: 'App ID', value: 'appId' },
			{ name: 'Bundle ID', value: 'bundleId' },
		],
		default: 'appId',
		description: 'Whether to identify the app by its numeric App ID or Bundle ID',
		displayOptions: {
			show: {
				resource: ['appStore'],
				operation: ['fetchApp', 'fetchReviews', 'fetchSimilarApps'],
			},
		},
	},
	{
		displayName: 'App ID',
		name: 'appId',
		type: 'string',
		default: '389801252',
		required: true,
		description: 'The numeric App Store ID (8-12 digits)',
		displayOptions: {
			show: {
				resource: ['appStore'],
				operation: ['fetchApp', 'fetchReviews', 'fetchSimilarApps'],
				identifierType: ['appId'],
			},
		},
	},
	{
		displayName: 'Bundle ID',
		name: 'bundleId',
		type: 'string',
		default: '',
		required: true,
		description: 'The bundle identifier (e.g. com.example.app)',
		displayOptions: {
			show: {
				resource: ['appStore'],
				operation: ['fetchApp', 'fetchReviews', 'fetchSimilarApps'],
				identifierType: ['bundleId'],
			},
		},
	},

	// ── Developer ID (Developer only) ──────────────────────────
	{
		displayName: 'Developer ID',
		name: 'developerId',
		type: 'string',
		default: '',
		required: true,
		description: 'The numeric developer ID (8-12 digits)',
		displayOptions: {
			show: {
				resource: ['appStore'],
				operation: ['fetchDeveloper'],
			},
		},
	},

	// ── Search Term (Search only) ──────────────────────────────
	{
		displayName: 'Search Term',
		name: 'term',
		type: 'string',
		default: '',
		required: true,
		description: 'The search query',
		displayOptions: {
			show: {
				resource: ['appStore'],
				operation: ['searchApps'],
			},
		},
	},

	// ── Sort (Reviews only) ────────────────────────────────────
	{
		displayName: 'Sort',
		name: 'sort',
		type: 'options',
		options: [
			{ name: 'Recent', value: 'recent' },
			{ name: 'Helpful', value: 'helpful' },
		],
		default: 'recent',
		description: 'How to sort the reviews',
		displayOptions: {
			show: {
				resource: ['appStore'],
				operation: ['fetchReviews'],
			},
		},
	},

	// ── Pagination Type (Reviews + Search) ─────────────────────
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
				resource: ['appStore'],
				operation: ['fetchReviews', 'searchApps'],
			},
		},
	},
	{
		displayName: 'Max Items',
		name: 'maxItems',
		type: 'number',
		typeOptions: { minValue: 1 },
		placeholder: '50',
		default: 100,
		description: 'Maximum number of results to return',
		displayOptions: {
			show: {
				resource: ['appStore'],
				operation: ['fetchReviews', 'searchApps'],
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
				resource: ['appStore'],
				operation: ['fetchReviews', 'searchApps'],
				paginationType: ['page'],
			},
		},
	},

	// ── Additional Fields (Developer, Reviews — country only) ──
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['appStore'],
				operation: ['fetchDeveloper', 'fetchReviews'],
			},
		},
		options: [
			{
				displayName: 'Country',
				name: 'country',
				type: 'string',
				default: '',
				placeholder: 'us',
				description: 'Two-letter country code (ISO 3166-1 alpha-2)',
			},
		],
	},

	// ── Additional Fields (App, Similar, Search — country + lang) ──
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['appStore'],
				operation: ['fetchApp', 'fetchSimilarApps', 'searchApps'],
			},
		},
		options: [
			{
				displayName: 'Country',
				name: 'country',
				type: 'string',
				default: '',
				placeholder: 'us',
				description: 'Two-letter country code (ISO 3166-1 alpha-2)',
			},
			{
				displayName: 'Language',
				name: 'lang',
				type: 'string',
				default: '',
				placeholder: 'en',
				description: 'Language code (e.g. "en", "pt-br")',
			},
		],
	},
];
