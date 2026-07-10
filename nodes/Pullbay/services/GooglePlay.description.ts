import type { INodeProperties } from 'n8n-workflow';

export const googlePlayOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['googlePlay'],
			},
		},
		options: [
			{
				name: 'Fetch App',
				value: 'fetchApp',
				description: 'Get app details by package name',
				action: 'Get app details',
			},
			{
				name: 'Fetch Data Safety',
				value: 'fetchDataSafety',
				description: 'Get data safety information for an app',
				action: 'Get data safety',
			},
			{
				name: 'Fetch Permissions',
				value: 'fetchPermissions',
				description: 'Get permissions for an app',
				action: 'Get permissions',
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

export const googlePlayFields: INodeProperties[] = [
	// ── App ID (all operations) ────────────────────────────────
	{
		displayName: 'App ID',
		name: 'appId',
		type: 'string',
		default: '',
		required: true,
		description: 'The application package name (e.g. com.example.app)',
		displayOptions: {
			show: {
				resource: ['googlePlay'],
				operation: ['fetchApp', 'fetchDataSafety', 'fetchPermissions', 'fetchReviews', 'fetchSimilarApps'],
			},
		},
	},

	// ── Search Term (Search only) ──────────────────────────────
	{
		displayName: 'Search Term',
		name: 'search',
		type: 'string',
		default: '',
		required: true,
		description: 'The search query',
		displayOptions: {
			show: {
				resource: ['googlePlay'],
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
			{ name: 'Newest', value: 'NEWEST' },
			{ name: 'Rating', value: 'RATING' },
			{ name: 'Helpfulness', value: 'HELPFULNESS' },
		],
		default: 'NEWEST',
		description: 'How to sort the reviews',
		displayOptions: {
			show: {
				resource: ['googlePlay'],
				operation: ['fetchReviews'],
			},
		},
	},

	// ── Pagination Type (Reviews only) ─────────────────────────
	{
		displayName: 'Pagination Type',
		name: 'paginationType',
		type: 'options',
		options: [
			{ name: 'Max Items', value: 'maxItems' },
			{ name: 'Cursor', value: 'cursor' },
		],
		default: 'maxItems',
		description: 'Whether to limit results by count or use a cursor for pagination',
		displayOptions: {
			show: {
				resource: ['googlePlay'],
				operation: ['fetchReviews'],
			},
		},
	},
	{
		displayName: 'Max Items',
		name: 'maxItems',
		type: 'number',
		typeOptions: { minValue: 1 },
		default: 100,
		description: 'Maximum number of reviews to return',
		displayOptions: {
			show: {
				resource: ['googlePlay'],
				operation: ['fetchReviews'],
				paginationType: ['maxItems'],
			},
		},
	},
	{
		displayName: 'Cursor',
		name: 'cursor',
		type: 'string',
		default: '',
		description: 'Pagination cursor from a previous response',
		displayOptions: {
			show: {
				resource: ['googlePlay'],
				operation: ['fetchReviews'],
				paginationType: ['cursor'],
			},
		},
	},

	// ── Price (Search only) ────────────────────────────────────
	{
		displayName: 'Price',
		name: 'price',
		type: 'options',
		options: [
			{ name: 'All', value: 'all' },
			{ name: 'Free', value: 'free' },
			{ name: 'Paid', value: 'paid' },
		],
		default: 'all',
		description: 'Filter by price',
		displayOptions: {
			show: {
				resource: ['googlePlay'],
				operation: ['searchApps'],
			},
		},
	},

	// ── Additional Fields ──────────────────────────────────────
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['googlePlay'],
				operation: ['fetchApp', 'fetchReviews', 'searchApps'],
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
