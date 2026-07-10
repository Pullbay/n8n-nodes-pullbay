import type { INodeProperties } from 'n8n-workflow';

const regionOptions = [
	{ name: 'All Regions', value: 'wt-wt' },
	{ name: 'Argentina', value: 'ar-es' },
	{ name: 'Australia', value: 'au-en' },
	{ name: 'Austria', value: 'at-de' },
	{ name: 'Belgium (French)', value: 'be-fr' },
	{ name: 'Belgium (Dutch)', value: 'be-nl' },
	{ name: 'Brazil', value: 'br-pt' },
	{ name: 'Bulgaria', value: 'bg-bg' },
	{ name: 'Canada (English)', value: 'ca-en' },
	{ name: 'Canada (French)', value: 'ca-fr' },
	{ name: 'Catalonia', value: 'ct-ca' },
	{ name: 'Chile', value: 'cl-es' },
	{ name: 'China', value: 'cn-zh' },
	{ name: 'Colombia', value: 'co-es' },
	{ name: 'Croatia', value: 'hr-hr' },
	{ name: 'Czech Republic', value: 'cz-cs' },
	{ name: 'Denmark', value: 'dk-da' },
	{ name: 'Estonia', value: 'ee-et' },
	{ name: 'Finland', value: 'fi-fi' },
	{ name: 'France', value: 'fr-fr' },
	{ name: 'Germany', value: 'de-de' },
	{ name: 'Greece', value: 'gr-el' },
	{ name: 'Hong Kong', value: 'hk-tzh' },
	{ name: 'Hungary', value: 'hu-hu' },
	{ name: 'India', value: 'in-en' },
	{ name: 'Indonesia', value: 'id-en' },
	{ name: 'Ireland', value: 'ie-en' },
	{ name: 'Israel', value: 'il-en' },
	{ name: 'Italy', value: 'it-it' },
	{ name: 'Japan', value: 'jp-jp' },
	{ name: 'Korea', value: 'kr-kr' },
	{ name: 'Latvia', value: 'lv-lv' },
	{ name: 'Lithuania', value: 'lt-lt' },
	{ name: 'Malaysia', value: 'my-en' },
	{ name: 'Mexico', value: 'mx-es' },
	{ name: 'Netherlands', value: 'nl-nl' },
	{ name: 'New Zealand', value: 'nz-en' },
	{ name: 'Norway', value: 'no-no' },
	{ name: 'Pakistan', value: 'pk-en' },
	{ name: 'Peru', value: 'pe-es' },
	{ name: 'Philippines', value: 'ph-en' },
	{ name: 'Poland', value: 'pl-pl' },
	{ name: 'Portugal', value: 'pt-pt' },
	{ name: 'Romania', value: 'ro-ro' },
	{ name: 'Russia', value: 'ru-ru' },
	{ name: 'Saudi Arabia', value: 'xa-ar' },
	{ name: 'Singapore', value: 'sg-en' },
	{ name: 'Slovakia', value: 'sk-sk' },
	{ name: 'Slovenia', value: 'sl-sl' },
	{ name: 'South Africa', value: 'za-en' },
	{ name: 'Spain (Catalan)', value: 'es-ca' },
	{ name: 'Spain', value: 'es-es' },
	{ name: 'Sweden', value: 'se-sv' },
	{ name: 'Switzerland (German)', value: 'ch-de' },
	{ name: 'Switzerland (French)', value: 'ch-fr' },
	{ name: 'Taiwan', value: 'tw-tzh' },
	{ name: 'Thailand', value: 'th-en' },
	{ name: 'Turkey', value: 'tr-tr' },
	{ name: 'Ukraine', value: 'ua-uk' },
	{ name: 'United Kingdom', value: 'uk-en' },
	{ name: 'United States', value: 'us-en' },
	{ name: 'United States (Spanish)', value: 'us-es' },
	{ name: 'Vietnam', value: 'vn-en' },
];

export const duckDuckGoOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['duckDuckGo'],
			},
		},
		options: [
			{
				name: 'Search',
				value: 'search',
				description: 'Search the web',
				action: 'Search the web',
			},
			{
				name: 'Search Images',
				value: 'searchImages',
				description: 'Search for images',
				action: 'Search images',
			},
			{
				name: 'Search News',
				value: 'searchNews',
				description: 'Search for news',
				action: 'Search news',
			},
			{
				name: 'Search Videos',
				value: 'searchVideos',
				description: 'Search for videos',
				action: 'Search videos',
			},
		],
		default: 'search',
	},
];

export const duckDuckGoFields: INodeProperties[] = [
	// ── Search Term (all operations) ──────────────────────────
	{
		displayName: 'Search Term',
		name: 'term',
		type: 'string',
		default: '',
		required: true,
		description: 'The search query',
		displayOptions: {
			show: {
				resource: ['duckDuckGo'],
				operation: ['search', 'searchImages', 'searchNews', 'searchVideos'],
			},
		},
	},

	// ── Region (all operations) ───────────────────────────────
	{
		displayName: 'Region',
		name: 'region',
		type: 'options',
		options: regionOptions,
		default: 'wt-wt',
		description: 'The region to search in',
		displayOptions: {
			show: {
				resource: ['duckDuckGo'],
				operation: ['search', 'searchImages', 'searchNews', 'searchVideos'],
			},
		},
	},

	// ── Offset (all operations) ───────────────────────────────
	{
		displayName: 'Offset',
		name: 'offset',
		type: 'number',
		typeOptions: { minValue: 0 },
		default: 0,
		description: 'Number of results to skip (for pagination)',
		displayOptions: {
			show: {
				resource: ['duckDuckGo'],
				operation: ['search', 'searchImages', 'searchNews', 'searchVideos'],
			},
		},
	},

	// ── Safe Search (all operations, required by API) ────────
	{
		displayName: 'Safe Search',
		name: 'safeSearch',
		type: 'options',
		options: [
			{ name: 'Moderate', value: 'moderate' },
			{ name: 'Off', value: 'off' },
			{ name: 'Strict', value: 'strict' },
		],
		default: 'off',
		description: 'Safe search filtering level',
		displayOptions: {
			show: {
				resource: ['duckDuckGo'],
				operation: ['search', 'searchImages', 'searchNews', 'searchVideos'],
			},
		},
	},

	// ── Time (search, news, videos only) ──────────────────────
	{
		displayName: 'Time',
		name: 'time',
		type: 'options',
		options: [
			{ name: 'Any Time', value: 'a' },
			{ name: 'Past Day', value: 'd' },
			{ name: 'Past Month', value: 'm' },
			{ name: 'Past Week', value: 'w' },
			{ name: 'Past Year', value: 'y' },
		],
		default: 'a',
		description: 'Time range for results',
		displayOptions: {
			show: {
				resource: ['duckDuckGo'],
				operation: ['search', 'searchNews', 'searchVideos'],
			},
		},
	},
];
