
const subreddit = (name: string) => ({
	key: name.toLowerCase(),
	value: name.toLowerCase(),
	title: name,
})

const subredditsTree = [
	{
		...subreddit('General'),
		children: [
			subreddit('CityPorn'),
			subreddit('VillagePorn'),
			subreddit('SpacePorn'),
			subreddit('wallpapers'),
			subreddit('MobileWallpaper'),
			subreddit('Verticalwallpapers'),
			subreddit('wallpaper'),
		],
	},
	{
		...subreddit('Nature'),
		children: [
			subreddit('EarthPorn'),
			subreddit('BeachPorn'),
			subreddit('WaterPorn'),
			subreddit('SkyPorn'),
			subreddit('WeatherPorn'),
			subreddit('BotanicalPorn'),
			subreddit('LakePorn'),
		],
	},
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
];
const defaultSubreddits = [
	"MobileWallpaper",
	"nocontext_wallpapers",
	"wallpapers",
	"cityporn",
	"villageporn",
	"spaceporn",
	"mobilewallpaper",
	"verticalwallpapers",
	"wallpaper",
	"earthporn",
	"beachporn",
	"waterporn",
	"skyporn",
	"weatherporn",
	"botanicalporn",
	"lakeporn",
]
export { defaultSubreddits };
export default subredditsTree;