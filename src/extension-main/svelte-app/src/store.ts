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
	use_images?: boolean;
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
