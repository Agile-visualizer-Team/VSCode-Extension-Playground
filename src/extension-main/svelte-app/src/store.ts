import { writable, type Writable } from 'svelte/store';

type Graph = {
	template: string;
	nodes: {
		atom: { name: string; variables: string[] };
		style: { color: { root: string; leaves: string; nonRoot: string } };
	}[];
	edges: {
		atom: { name: string; variables: string[] };
		style: { color: string; oriented: boolean };
	}[];
};
type Matrix = {
	template: string;
	maxNumOfAnswerSetToConvert: number;
	cell: string[];
	useImages?: boolean;
	table_field_mapping?: Map<string, string>;
	images_binding?: Map<string, string>;
	colors_binding?: Map<string, string>;
	style: {
		header_color: string;
		header_font_size: number;
		header_font_family: string;
		header_font_weight: string;
		dark_mode: boolean;
	};
};

export const graph: Writable<Graph> = writable({
	template: 'graph',
	nodes: [],
	edges: []
});

export const nodeArgsUnique: Writable<Map<number,boolean>> = writable(new Map());
export const edgeArgsUnique: Writable<Map<number,boolean>> = writable(new Map());

export const matrix: Writable<Matrix> = writable({
	template: 'matrix',
	maxNumOfAnswerSetToConvert: 4,
	cell: [],
	style: {
		header_color: '',
		header_font_size: 0,
		header_font_family: '',
		header_font_weight: '',
		dark_mode: true
	}
});

export function REMOVE_NODE(idx: number) {
	graph.update((g) => {
		g.nodes.splice(idx, 1);
		return g;
	});
}

export function REMOVE_EDGE(idx: number) {
	graph.update((g) => {
		g.edges.splice(idx, 1);
		return g;
	});
}

export const COLORS = [
	'aliceblue',
	'antiquewhite',
	'aqua',
	'aquamarine',
	'azure',
	'beige',
	'bisque',
	'black',
	'blanchedalmond',
	'blue',
	'blueviolet',
	'brown',
	'burlywood',
	'cadetblue',
	'chartreuse',
	'chocolate',
	'coral',
	'cornflowerblue',
	'cornsilk',
	'crimson',
	'cyan',
	'darkblue',
	'darkcyan',
	'darkgoldenrod',
	'darkgray',
	'darkgrey',
	'darkgreen',
	'darkkhaki',
	'darkmagenta',
	'darkolivegreen',
	'darkorange',
	'darkorchid',
	'darkred',
	'darksalmon',
	'darkseagreen',
	'darkslateblue',
	'darkslategray',
	'darkslategrey',
	'darkturquoise',
	'darkviolet',
	'deeppink',
	'deepskyblue',
	'dimgray',
	'dimgrey',
	'dodgerblue',
	'firebrick',
	'floralwhite',
	'forestgreen',
	'fuchsia',
	'gainsboro',
	'ghostwhite',
	'gold',
	'goldenrod',
	'gray',
	'grey',
	'green',
	'greenyellow',
	'honeydew',
	'hotpink',
	'indianred ',
	'indigo ',
	'ivory',
	'khaki',
	'lavender',
	'lavenderblush',
	'lawngreen',
	'lemonchiffon',
	'lightblue',
	'lightcoral',
	'lightcyan',
	'lightgoldenrodyellow',
	'lightgray',
	'lightgrey',
	'lightgreen',
	'lightpink',
	'lightsalmon',
	'lightseagreen',
	'lightskyblue',
	'lightslategray',
	'lightslategrey',
	'lightsteelblue',
	'lightyellow',
	'lime',
	'limegreen',
	'linen',
	'magenta',
	'maroon',
	'mediumaquamarine',
	'mediumblue',
	'mediumorchid',
	'mediumpurple',
	'mediumseagreen',
	'mediumslateblue',
	'mediumspringgreen',
	'mediumturquoise',
	'mediumvioletred',
	'midnightblue',
	'mintcream',
	'mistyrose',
	'moccasin',
	'navajowhite',
	'navy',
	'oldlace',
	'olive',
	'olivedrab',
	'orange',
	'orangered',
	'orchid',
	'palegoldenrod',
	'palegreen',
	'paleturquoise',
	'palevioletred',
	'papayawhip',
	'peachpuff',
	'peru',
	'pink',
	'plum',
	'powderblue',
	'purple',
	'rebeccapurple',
	'red',
	'rosybrown',
	'royalblue',
	'saddlebrown',
	'salmon',
	'sandybrown',
	'seagreen',
	'seashell',
	'sienna',
	'silver',
	'skyblue',
	'slateblue',
	'slategray',
	'slategrey',
	'snow',
	'springgreen',
	'steelblue',
	'tan',
	'teal',
	'thistle',
	'tomato',
	'turquoise',
	'violet',
	'wheat',
	'white',
	'whitesmoke',
	'yellow',
	'yellowgreen'
];
