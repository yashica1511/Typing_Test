// Helper.js
export const quotesArray = [
	{
		quote:
			"If we listened to our intellect we'd never have a love affair. We'd never have a friendship. We'd never go in business because we'd be cynical: \"It's gonna go wrong.\" Or \"She's going to hurt me.\" Or,\"I've had a couple of bad love affairs, so therefore . . .\" Well, that's nonsense. You're going to miss life. You've got to jump off the cliff all the time and build your wings on the way down.",
		author: 'Ray Bradbury'
	},
	{
		quote:
			"To-morrow, and to-morrow, and to-morrow, Creeps in this petty pace from day to day,To the last syllable of recorded time; And all our yesterdays have lighted fools The way to dusty death. Out, out, brief candle! Life's but a walking shadow, a poor player, That struts and frets his hour upon the stage, And then is heard no more. It is a tale Told by an idiot, full of sound and fury, Signifying nothing.",
		author: 'William Shakespeare'
	},
	{
		quote:
			"If a man is called to be a street sweeper, he should sweep streets even as a Michaelangelo painted, or Beethoven composed music or Shakespeare wrote poetry. He should sweep streets so well that all the hosts of heaven and earth will pause to say, 'Here lived a great street sweeper who did his job well.",
		author: 'Martin Luther King'
	},
	// ... [Add other quotes here]
]

export const random = array => array[Math.floor(Math.random() * array.length)];

export const allowedKeys = [
	'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p',
	'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l',
	'z', 'x', 'c', 'v', 'b', 'n', 'm',
	'Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P',
	'A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L',
	'Z', 'X', 'C', 'V', 'B', 'N', 'M',
	';', "'", ',', '.'
];
