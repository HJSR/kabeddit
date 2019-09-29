
const subreddit = (name: string) => ({
	key: name.toLowerCase(), value:
		name.toLowerCase(),
	title: name,
})

const subredditsTree = [
	{
		...subreddit('Anime'),
		children: [
			subreddit('AnimePhoneWallpapers'),
			subreddit('awwnime'),
			subreddit('animeponytails'),
			subreddit('Pixiv'),
			subreddit('twodeeart'),
			subreddit('Moescape'),
			subreddit('Patchuu'),
			subreddit('AnimeWallpaper'),
			subreddit('megane'),
			subreddit('streetmoe'),
		],
	},
	{
		...subreddit('Nature'),
		children: [
			subreddit('EarthPorn'),
		],
	},
];
const defaultSubreddits = [
	'moescape',
	'streetmoe',
	'awwnime',
	'twodeeart',
	'AnimeWallpaper',
	'AnimePhoneWallpapers',
	'Pixiv'
]
export { defaultSubreddits };
export default subredditsTree;