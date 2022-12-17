"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GraphRenderer = void 0;
const renderer_themes_1 = require("./renderer-themes");
const renderer_layout_1 = require("./renderer-layout");
const cytosnap = require('cytosnap');
cytosnap.use(['cytoscape-dagre']);
class GraphRenderer {
    constructor() {
        this.width = 800;
        this.height = 600;
        this.theme = renderer_themes_1.VSCODE_THEME;
        this.layout = renderer_layout_1.GraphRendererLayout.Dagre;
        this.outputType = 'base64';
    }
    generateCytoscapeElements(graph) {
        const elements = [];
        graph.nodes.forEach(n => {
            let shape, width, height;
            if (n.name.length > 1) {
                shape = "round-rectangle";
                width = n.name.length * this.theme.node.roundRectangle.widthMultiplier;
                height = this.theme.node.roundRectangle.heightMultiplier;
            }
            else {
                shape = "ellipse";
                width = this.theme.node.ellipse.sizeMultiplier;
                height = this.theme.node.ellipse.sizeMultiplier;
            }
            elements.push({
                data: {
                    id: n.name,
                    label: n.name,
                    shape: shape,
                    width: width,
                    height: height,
                    color: n.color
                        ? this.convertColorWithThemePalette(n.color)
                        : this.theme.node.borderColor
                }
            });
        });
        graph.edges.forEach(e => {
            elements.push({
                data: {
                    id: e.from + '-' + e.destination,
                    source: e.from,
                    target: e.destination,
                    weight: e.weight,
                    color: e.color
                        ? this.convertColorWithThemePalette(e.color)
                        : this.theme.edge.lineColor,
                    arrowShape: graph.oriented ? 'triangle' : 'none'
                }
            });
        });
        return elements;
    }
    convertColorWithThemePalette(colorName) {
        if (colorName in this.theme.palette) {
            return this.theme.palette[colorName];
        }
        return colorName;
    }
    generateCytoscapeLayout() {
        if (this.layout == renderer_layout_1.GraphRendererLayout.Dagre) {
            return {
                name: 'dagre',
                edgeSep: 50,
                rankDir: 'TB',
            };
        }
        throw new Error("Unsupported layout type");
    }
    generateCytoscapeStyle() {
        return [
            {
                selector: 'node',
                style: {
                    'font-family': this.theme.node.fontFamily,
                    'font-size': this.theme.node.fontSize,
                    'font-weight': this.theme.node.fontWeight,
                    'label': 'data(label)',
                    'background-color': this.theme.node.backgroundColor,
                    'text-valign': 'center',
                    'text-halign': 'center',
                    'border-width': '1px',
                    'border-color': 'data(color)',
                    'color': this.theme.node.textColor,
                    'padding': '0 0 0 100px',
                    'width': 'data(width)',
                    'height': 'data(height)',
                    'shape': 'data(shape)'
                }
            },
            {
                selector: 'edge',
                style: {
                    'width': 1,
                    'line-color': 'data(color)',
                    'line-style': 'dashed',
                    'line-dash-pattern': [6, 3],
                    'line-dash-offset': 0,
                    'curve-style': 'bezier',
                    'arrow-scale': 0.7,
                    'target-arrow-shape': 'data(arrowShape)',
                    'target-arrow-color': 'data(color)',
                    'source-label': 'data(weight)',
                    'source-text-offset': 18,
                    'font-family': this.theme.edge.fontFamily,
                    'font-size': this.theme.edge.fontSize,
                    'font-weight': this.theme.edge.fontWeight,
                    'color': this.theme.edge.textColor,
                    'text-background-shape': 'round-rectangle',
                    'text-background-padding': '1px',
                    'text-background-color': this.theme.backgroundColor,
                    "text-background-opacity": 1,
                }
            }
        ];
    }
    render(graphs, onGraphStarted, onGraphCompleted) {
        const that = this;
        const snap = cytosnap({
            args: ['--disable-gpu', '--no-sandbox', '--disable-dev-shm-usage'] // ubuntu fix
        });
        const layout = that.generateCytoscapeLayout();
        const style = that.generateCytoscapeStyle();
        snap.start().then(() => {
            const renderedPromises = [];
            graphs.forEach((graph, index) => {
                if (onGraphStarted) {
                    onGraphStarted(index, graph);
                }
                const renderingPromise = snap.shot({
                    elements: that.generateCytoscapeElements(graph),
                    layout: layout,
                    style: style,
                    resolvesTo: this.outputType,
                    format: 'png',
                    quality: 100,
                    width: that.width,
                    height: that.height,
                    background: that.theme.backgroundColor
                }).then(function (output) {
                    if (onGraphCompleted) {
                        onGraphCompleted(index, graph, output);
                    }
                });
                renderedPromises.push(renderingPromise);
            });
            Promise.all(renderedPromises).then(() => {
                snap.stop();
            });
        });
    }
}
exports.GraphRenderer = GraphRenderer;
