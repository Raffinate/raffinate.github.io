export interface Project {
	title: string;
	description: string;
	/** Live GitHub Pages URL */
	url: string;
	/** Source repository */
	repo: string;
}

const pages = (name: string) => `https://raffinate.github.io/${name}/`;
const repo = (name: string) => `https://github.com/Raffinate/${name}`;

export const projects: Project[] = [
	{
		title: "Boat Polar Solver",
		description: "Find the fastest heading toward your destination from a boat polar and the wind.",
		url: pages("boatpolar"),
		repo: repo("boatpolar"),
	},
	{
		title: "Sailgrid",
		description:
			"A turn-based sailing regatta on grid paper. Pick a real boat, play the wind shifts and race AI boats or friends.",
		url: pages("sailgrid"),
		repo: repo("sailgrid"),
	},
	{
		title: "Doubt It",
		description:
			"The bluffing card game with a revolver twist. Play against GTO-trained AI solvers or a friend.",
		url: pages("doubt-it"),
		repo: repo("doubt-it"),
	},
	{
		title: "Snooker Aim Trainer",
		description: "A 3D game for practicing snooker aiming in the browser.",
		url: pages("snookeraim"),
		repo: repo("snookeraim"),
	},
	{
		title: "Leduc Hold'em",
		description:
			"The small poker game from game-theory research. Play against GTO-trained AI solvers or a friend.",
		url: pages("leduc-holdem"),
		repo: repo("leduc-holdem"),
	},
];
