import type { INodeProperties } from 'n8n-workflow';

export const youTubeOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['youTube'],
			},
		},
		options: [
			{
				name: 'Fetch Channel',
				value: 'fetchChannel',
				description: 'Get channel details',
				action: 'Get channel details',
			},
			{
				name: 'Fetch Comments',
				value: 'fetchComments',
				description: 'Get comments for a video',
				action: 'Get video comments',
			},
			{
				name: 'Fetch Trending',
				value: 'fetchTrending',
				description: 'Get trending videos',
				action: 'Get trending videos',
			},
			{
				name: 'Fetch Video',
				value: 'fetchVideo',
				description: 'Get video details',
				action: 'Get video details',
			},
			{
				name: 'Fetch Videos by Hashtag',
				value: 'fetchHashtag',
				description: 'Get videos by hashtag',
				action: 'Get videos by hashtag',
			},
			{
				name: 'Search',
				value: 'search',
				description: 'Search YouTube',
				// eslint-disable-next-line n8n-nodes-base/node-param-operation-option-action-miscased
				action: 'Search YouTube',
			},
		],
		default: 'fetchChannel',
	},
];

export const youTubeFields: INodeProperties[] = [
	// ── Channel Identifier Type ───────────────────────────────
	{
		displayName: 'Identifier Type',
		name: 'channelIdentifierType',
		type: 'options',
		options: [
			{ name: 'Channel ID', value: 'id' },
			{ name: 'Handle', value: 'handle' },
			{ name: 'Channel URL', value: 'channelUrl' },
		],
		default: 'id',
		description: 'How to identify the channel',
		displayOptions: {
			show: {
				resource: ['youTube'],
				operation: ['fetchChannel'],
			},
		},
	},
	{
		displayName: 'Channel ID',
		name: 'channelId',
		type: 'string',
		default: '',
		required: true,
		description: 'The YouTube channel ID',
		displayOptions: {
			show: {
				resource: ['youTube'],
				operation: ['fetchChannel'],
				channelIdentifierType: ['id'],
			},
		},
	},
	{
		displayName: 'Handle',
		name: 'handle',
		type: 'string',
		default: '',
		required: true,
		placeholder: '@channelname',
		description: 'The YouTube channel handle',
		displayOptions: {
			show: {
				resource: ['youTube'],
				operation: ['fetchChannel'],
				channelIdentifierType: ['handle'],
			},
		},
	},
	{
		displayName: 'Channel URL',
		name: 'channelUrl',
		type: 'string',
		default: '',
		required: true,
		placeholder: 'https://www.youtube.com/channel/...',
		description: 'The YouTube channel URL',
		displayOptions: {
			show: {
				resource: ['youTube'],
				operation: ['fetchChannel'],
				channelIdentifierType: ['channelUrl'],
			},
		},
	},

	// ── Video ID (Comments, Video) ────────────────────────────
	{
		displayName: 'Video ID',
		name: 'videoId',
		type: 'string',
		default: '',
		required: true,
		description: 'The YouTube video ID',
		displayOptions: {
			show: {
				resource: ['youTube'],
				operation: ['fetchComments', 'fetchVideo'],
			},
		},
	},

	// ── Hashtag ───────────────────────────────────────────────
	{
		displayName: 'Hashtag',
		name: 'tag',
		type: 'string',
		default: '',
		required: true,
		description: 'The hashtag to search for',
		displayOptions: {
			show: {
				resource: ['youTube'],
				operation: ['fetchHashtag'],
			},
		},
	},

	// ── Search Query ──────────────────────────────────────────
	{
		displayName: 'Query',
		name: 'query',
		type: 'string',
		default: '',
		required: true,
		description: 'The search query',
		displayOptions: {
			show: {
				resource: ['youTube'],
				operation: ['search'],
			},
		},
	},

	// ── Search Mode (required) ────────────────────────────────
	{
		displayName: 'Mode',
		name: 'mode',
		type: 'options',
		options: [
			{ name: 'Video', value: 'video' },
			{ name: 'Channel', value: 'channel' },
			{ name: 'Playlist', value: 'playlist' },
		],
		default: 'video',
		description: 'The type of content to search for',
		displayOptions: {
			show: {
				resource: ['youTube'],
				operation: ['search'],
			},
		},
	},

	// ── Sort (Comments) ───────────────────────────────────────
	{
		displayName: 'Sort',
		name: 'sort',
		type: 'options',
		options: [
			{ name: 'Top', value: 'top' },
			{ name: 'Latest', value: 'latest' },
		],
		default: 'top',
		description: 'How to sort the comments',
		displayOptions: {
			show: {
				resource: ['youTube'],
				operation: ['fetchComments'],
			},
		},
	},

	// ── Pagination Type (Comments, Hashtag, Search) ───────────
	{
		displayName: 'Pagination Type',
		name: 'paginationType',
		type: 'options',
		options: [
			{ name: 'Max Items', value: 'maxItems' },
			{ name: 'Cursor', value: 'cursor' },
		],
		default: 'maxItems',
		description: 'Whether to limit results by count or paginate by cursor',
		displayOptions: {
			show: {
				resource: ['youTube'],
				operation: ['fetchComments', 'fetchHashtag', 'search'],
			},
		},
	},
	{
		displayName: 'Max Items',
		name: 'maxItems',
		type: 'number',
		typeOptions: { minValue: 1 },
		default: 100,
		description: 'Maximum number of results to return',
		displayOptions: {
			show: {
				resource: ['youTube'],
				operation: ['fetchComments', 'fetchHashtag', 'search'],
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
				resource: ['youTube'],
				operation: ['fetchComments', 'fetchHashtag', 'search'],
				paginationType: ['cursor'],
			},
		},
	},

	// ── Additional Fields (Fetch Video) ───────────────────────
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['youTube'],
				operation: ['fetchVideo'],
			},
		},
		options: [
			{
				displayName: 'Type',
				name: 'type',
				type: 'options',
				options: [
					{ name: 'Video', value: 'video' },
					{ name: 'Shorts', value: 'shorts' },
				],
				default: 'video',
				description: 'The type of video',
			},
		],
	},

	// ── Additional Fields (Fetch Trending) ────────────────────
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['youTube'],
				operation: ['fetchTrending'],
			},
		},
		options: [
			{
				displayName: 'Country',
				name: 'geo',
				type: 'string',
				default: '',
				placeholder: 'US',
				description: 'Two-letter country code',
			},
		],
	},

	// ── Additional Fields (Search) ────────────────────────────
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['youTube'],
				operation: ['search'],
			},
		},
		options: [
			{
				displayName: 'Country',
				name: 'geo',
				type: 'string',
				default: '',
				placeholder: 'US',
				description: 'Two-letter country code',
			},
			{
				displayName: 'Duration',
				name: 'duration',
				type: 'options',
				options: [
					{ name: 'Short', value: 'short' },
					{ name: 'Medium', value: 'medium' },
					{ name: 'Long', value: 'long' },
				],
				default: 'medium',
				description: 'Filter by video duration',
			},
			{
				displayName: 'Features',
				name: 'features',
				type: 'options',
				options: [
					{ name: '360', value: '360' },
					{ name: '3D', value: '3d' },
					{ name: '4K', value: '4k' },
					{ name: 'Creative Commons', value: 'creative_commons' },
					{ name: 'HD', value: 'hd' },
					{ name: 'HDR', value: 'hdr' },
					{ name: 'Live', value: 'live' },
					{ name: 'Location', value: 'location' },
					{ name: 'Purchased', value: 'purchased' },
					{ name: 'Subtitles', value: 'subtitles' },
					{ name: 'VR180', value: 'vr180' },
				],
				default: 'hd',
				description: 'Filter by video feature',
			},
			{
				displayName: 'Language',
				name: 'lang',
				type: 'string',
				default: '',
				placeholder: 'en',
				description: 'Language code for the results',
			},
			{
				displayName: 'Sort By',
				name: 'sortBy',
				type: 'options',
				options: [
					{ name: 'Relevance', value: 'relevance' },
					{ name: 'Rating', value: 'rating' },
					{ name: 'Upload Date', value: 'upload_date' },
					{ name: 'View Count', value: 'view_count' },
				],
				default: 'relevance',
				description: 'How to sort the results',
			},
			{
				displayName: 'Upload Date',
				name: 'uploadDate',
				type: 'options',
				// eslint-disable-next-line n8n-nodes-base/node-param-options-type-unsorted-items
				options: [
					{ name: 'Last Hour', value: 'hour' },
					{ name: 'Today', value: 'today' },
					{ name: 'This Week', value: 'week' },
					{ name: 'This Month', value: 'month' },
					{ name: 'This Year', value: 'year' },
				],
				default: 'week',
				description: 'Filter by upload date',
			},
		],
	},
];
