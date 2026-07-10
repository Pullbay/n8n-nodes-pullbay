import type { INodeProperties } from 'n8n-workflow';

const languageCodeOptions = [
	{ name: 'العربية (الإمارات العربية المتحدة)', value: 'AE:ar' },
	{ name: 'العربية (المملكة العربية السعودية)', value: 'SA:ar' },
	{ name: 'العربية (لبنان)', value: 'LB:ar' },
	{ name: 'العربية (مصر)', value: 'EG:ar' },
	{ name: 'Bahasa Indonesia (Indonesia)', value: 'ID:id' },
	{ name: 'বাংলা (বাংলাদেশ)', value: 'BD:bn' },
	{ name: 'বাংলা (ভারত)', value: 'IN:bn' },
	{ name: 'Български (България)', value: 'BG:bg' },
	// eslint-disable-next-line n8n-nodes-base/node-param-display-name-miscased
	{ name: 'Čeština (Česko)', value: 'CZ:cs' },
	{ name: 'Deutsch (Deutschland)', value: 'DE:de' },
	{ name: 'Deutsch (Österreich)', value: 'AT:de' },
	{ name: 'Deutsch (Schweiz)', value: 'CH:de' },
	{ name: 'Ελληνικά (Ελλάδα)', value: 'GR:el' },
	{ name: 'English (Australia)', value: 'AU:en' },
	{ name: 'English (Botswana)', value: 'BW:en' },
	{ name: 'English (Canada)', value: 'CA:en' },
	{ name: 'English (Ethiopia)', value: 'ET:en' },
	{ name: 'English (Ghana)', value: 'GH:en' },
	{ name: 'English (India)', value: 'IN:en' },
	{ name: 'English (Indonesia)', value: 'ID:en' },
	{ name: 'English (Ireland)', value: 'IE:en' },
	{ name: 'English (Israel)', value: 'IL:en' },
	{ name: 'English (Kenya)', value: 'KE:en' },
	{ name: 'English (Latvia)', value: 'LV:en' },
	{ name: 'English (Malaysia)', value: 'MY:en' },
	{ name: 'English (Namibia)', value: 'NA:en' },
	{ name: 'English (New Zealand)', value: 'NZ:en' },
	{ name: 'English (Nigeria)', value: 'NG:en' },
	{ name: 'English (Pakistan)', value: 'PK:en' },
	{ name: 'English (Philippines)', value: 'PH:en' },
	{ name: 'English (Singapore)', value: 'SG:en' },
	{ name: 'English (South Africa)', value: 'ZA:en' },
	{ name: 'English (Tanzania)', value: 'TZ:en' },
	{ name: 'English (Uganda)', value: 'UG:en' },
	{ name: 'English (United Kingdom)', value: 'GB:en' },
	{ name: 'English (United States)', value: 'US:en' },
	{ name: 'English (Zimbabwe)', value: 'ZW:en' },
	{ name: 'Español (Argentina)', value: 'AR:es-419' },
	{ name: 'Español (Chile)', value: 'CL:es-419' },
	{ name: 'Español (Colombia)', value: 'CO:es-419' },
	{ name: 'Español (Cuba)', value: 'CU:es-419' },
	{ name: 'Español (España)', value: 'ES:es' },
	{ name: 'Español (Estados Unidos)', value: 'US:es-419' },
	{ name: 'Español (México)', value: 'MX:es-419' },
	{ name: 'Español (Perú)', value: 'PE:es-419' },
	{ name: 'Español (Venezuela)', value: 'VE:es-419' },
	{ name: 'Français (Belgique)', value: 'BE:fr' },
	{ name: 'Français (Canada)', value: 'CA:fr' },
	{ name: 'Français (France)', value: 'FR:fr' },
	{ name: 'Français (Maroc)', value: 'MA:fr' },
	{ name: 'Français (Sénégal)', value: 'SN:fr' },
	{ name: 'Français (Suisse)', value: 'CH:fr' },
	{ name: 'हिन्दी (भारत)', value: 'IN:hi' },
	{ name: 'Italiano (Italia)', value: 'IT:it' },
	{ name: 'עברית (ישראל)', value: 'IL:he' },
	{ name: '한국어 (대한민국)', value: 'KR:ko' },
	{ name: 'Latviešu (Latvija)', value: 'LV:lv' },
	{ name: 'Lietuvių (Lietuva)', value: 'LT:lt' },
	{ name: 'Magyar (Magyarország)', value: 'HU:hu' },
	{ name: 'മലയാളം (ഇന്ത്യ)', value: 'IN:ml' },
	{ name: 'मराठी (भारत)', value: 'IN:mr' },
	{ name: 'Nederlands (België)', value: 'BE:nl' },
	{ name: 'Nederlands (Nederland)', value: 'NL:nl' },
	{ name: '日本語 (日本)', value: 'JP:ja' },
	{ name: 'Norsk (Norge)', value: 'NO:no' },
	{ name: 'Polski (Polska)', value: 'PL:pl' },
	{ name: 'Português (Brasil)', value: 'BR:pt-419' },
	{ name: 'Português (Portugal)', value: 'PT:pt-150' },
	{ name: 'Română (România)', value: 'RO:ro' },
	{ name: 'Русский (Россия)', value: 'RU:ru' },
	{ name: 'Русский (Украина)', value: 'UA:ru' },
	{ name: 'Slovenčina (Slovensko)', value: 'SK:sk' },
	{ name: 'Slovenščina (Slovenija)', value: 'SI:sl' },
	{ name: 'Српски (Србија)', value: 'RS:sr' },
	{ name: 'Svenska (Sverige)', value: 'SE:sv' },
	{ name: 'தமிழ் (இந்தியா)', value: 'IN:ta' },
	{ name: 'తెలుగు (భారతదేశం)', value: 'IN:te' },
	{ name: 'ไทย (ไทย)', value: 'TH:th' },
	{ name: 'Tiếng Việt (Việt Nam)', value: 'VN:vi' },
	{ name: 'Türkçe (Türkiye)', value: 'TR:tr' },
	{ name: 'Українська (Україна)', value: 'UA:uk' },
	{ name: '中文 (中国)', value: 'CN:zh-Hans' },
	{ name: '中文 (台灣)', value: 'TW:zh-Hant' },
	{ name: '中文 (香港)', value: 'HK:zh-Hant' },
];

export const googleNewsOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['googleNews'],
			},
		},
		options: [
			{
				name: 'News By Category',
				value: 'newsByCategory',
				description: 'Get news articles by category',
				action: 'Get news by category',
			},
			{
				name: 'Search News',
				value: 'searchNews',
				description: 'Search for news articles',
				action: 'Search news',
			},
		],
		default: 'newsByCategory',
	},
];

export const googleNewsFields: INodeProperties[] = [
	// ── Category (newsByCategory only) ────────────────────────
	{
		displayName: 'Category',
		name: 'category',
		type: 'options',
		options: [
			{ name: 'Business', value: 'business' },
			{ name: 'Entertainment', value: 'entertainment' },
			{ name: 'Health', value: 'health' },
			{ name: 'Latest', value: 'latest' },
			{ name: 'Science', value: 'science' },
			{ name: 'Sport', value: 'sport' },
			{ name: 'Technology', value: 'technology' },
			{ name: 'World', value: 'world' },
		],
		default: 'latest',
		required: true,
		description: 'The news category to fetch',
		displayOptions: {
			show: {
				resource: ['googleNews'],
				operation: ['newsByCategory'],
			},
		},
	},

	// ── Search Query (searchNews only) ────────────────────────
	{
		displayName: 'Search Query',
		name: 'query',
		type: 'string',
		default: '',
		required: true,
		description: 'The search query (max 500 characters)',
		displayOptions: {
			show: {
				resource: ['googleNews'],
				operation: ['searchNews'],
			},
		},
	},

	// ── Max Items (searchNews only) ───────────────────────────
	{
		displayName: 'Max Items',
		name: 'maxItems',
		type: 'number',
		typeOptions: { minValue: 1 },
		default: 100,
		description: 'Maximum number of articles to return',
		displayOptions: {
			show: {
				resource: ['googleNews'],
				operation: ['searchNews'],
			},
		},
	},

	// ── Resolve URL (searchNews only) ─────────────────────────
	{
		displayName: 'Resolve URL',
		name: 'resolveUrl',
		type: 'options',
		options: [
			{ name: 'No', value: 'no' },
			{ name: 'Yes', value: 'yes' },
		],
		default: 'no',
		description: 'Whether to resolve the final URL of each article. Enabling this may significantly increase execution time.',
		displayOptions: {
			show: {
				resource: ['googleNews'],
				operation: ['searchNews'],
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
				resource: ['googleNews'],
				operation: ['newsByCategory', 'searchNews'],
			},
		},
		options: [
			{
				displayName: 'Language',
				name: 'languageCode',
				type: 'options',
				options: languageCodeOptions,
				default: 'US:en',
				description: 'The language and region for results',
			},
		],
	},
];
