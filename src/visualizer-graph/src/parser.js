"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GraphParser = void 0;
const fs_1 = __importDefault(require("fs"));
const models_1 = require("./models");
const schema_validators_1 = require("./schema-validators");
const assert_1 = __importDefault(require("assert"));
class GraphParser {
    /**
     * It takes a template object, which is validated with a schema, and an array of answer set.
     */
    check_variables_name(variables, mandatory_variables) {
        //TODO Remember to make case insensitive
        const check = mandatory_variables.every(value => {
            return variables.includes(value);
        });
        if (!check)
            throw Error(`Variables provided: \"${variables}\" must contain \"${mandatory_variables}\"`);
    }
    constructor(template, answerSets) {
        this.MANDATORY_NODE_VARIABLE = ["label"];
        this.MANDATORY_EDGE_VARIABLE = ["from", "to"];
        if (!(0, schema_validators_1.validateTemplateSchema)(template)) {
            (0, assert_1.default)(schema_validators_1.validateTemplateSchema.errors);
            const error = schema_validators_1.validateTemplateSchema.errors[0];
            const path = error.instancePath || "template";
            throw Error("Template is not valid: " + path + " " + error.message);
        }
        this.template = template;
        this.check_variables_name(this.template.nodes.atom.variables, this.MANDATORY_NODE_VARIABLE);
        this.check_variables_name(this.template.edges.atom.variables, this.MANDATORY_EDGE_VARIABLE);
        if (!(0, schema_validators_1.validateAnswerSetsSchema)(answerSets)) {
            (0, assert_1.default)(schema_validators_1.validateAnswerSetsSchema.errors);
            const error = schema_validators_1.validateAnswerSetsSchema.errors[0];
            const path = error.instancePath || "answer sets";
            throw Error("Answer sets are not valid: " + path + " " + error.message);
        }
        if (!answerSets.length) {
            throw Error("Answer set list is empty");
        }
        this.answerSets = answerSets;
    }
    /**
     * @param {string|null} [outputFile=null] - the file to write the output to. If null, the output is
     * returned as an array of objects.
     * @returns An array of objects. Each object has two properties: nodes and edges.
     */
    extractNodesAndEdgesFromAnswerSets(outputFile = null) {
        const node_atom = new RegExp(this.template.nodes.atom.name + '\(.+\)'), node_arity_template = this.template.nodes.atom.variables.length;
        const edge_atom = new RegExp(this.template.edges.atom.name + '\(.+\)'), edge_arity_template = this.template.edges.atom.variables.length;
        const output = [];
        this.answerSets.forEach(answerSet => {
            const nodes = [];
            const edges = [];
            answerSet.as.forEach((atom) => {
                if (node_atom.test(atom)) {
                    let arity = atom.split(",").length;
                    if (arity == node_arity_template) {
                        nodes.push(atom);
                    }
                    else {
                        throw Error(`node fact <${atom}> has arity ${arity}, expected value from template was ${node_arity_template}`);
                    }
                }
                else if (edge_atom.test(atom)) {
                    let arity = atom.split(",").length;
                    if (arity == edge_arity_template) {
                        edges.push(atom);
                    }
                    else {
                        throw Error(`edge fact <${atom}> has arity ${arity}, expected value from template was ${edge_arity_template}`);
                    }
                }
            });
            if (nodes) {
                output.push({ "nodes": nodes, "edges": edges });
            }
        });
        if (outputFile) {
            fs_1.default.writeFileSync(outputFile, JSON.stringify(output, null, 4));
        }
        return output;
    }
    /**
     * @returns An array of Graphs.
     */
    parse() {
        const answerSets = this.extractNodesAndEdgesFromAnswerSets();
        const node_variables = this.get_node_variables(this.template.nodes.atom.variables);
        const edge_variables = this.get_edge_variables(this.template.edges.atom.variables);
        return answerSets.map((as) => {
            const nodes = as.nodes.map((atom) => {
                return this.create_node(atom, node_variables);
            });
            const edges = as.edges.map((atom) => {
                return this.create_edge(atom, edge_variables);
            });
            this.checkEdgesConnections(edges, nodes);
            this.assignDefaultNodesColors(nodes, edges);
            this.assignDefaultEdgesColors(edges);
            return {
                nodes: nodes,
                edges: edges,
                oriented: this.template.edges.style
                    ? this.template.edges.style.oriented
                    : false
            };
        });
    }
    /**
     * If specified, assign the default color to edges which are not colored
     * @param nodes
     * @param edges
     * @private
     */
    assignDefaultEdgesColors(edges) {
        if (this.template.edges.style.color) {
            edges.filter(e => !e.color).forEach(n => {
                n.color = this.template.edges.style.color.branch;
            });
        }
    }
    /**
     * If specified, assign the default colors to nodes which are not colored
     * @param nodes
     * @param edges
     * @private
     */
    assignDefaultNodesColors(nodes, edges) {
        if (this.template.nodes.style.color) {
            nodes.filter(n => !n.color).forEach(n => {
                if (!edges.find(e => e.destination == n.name)) {
                    n.color = this.template.nodes.style.color.root;
                }
                else if (!edges.find(e => e.from == n.name)) {
                    n.color = this.template.nodes.style.color.leaves;
                }
                else {
                    n.color = this.template.nodes.style.color.nonRoot;
                }
            });
        }
    }
    /**
     * Check if edges are connected to existing nodes
     * @param edges
     * @param nodes
     * @private
     */
    checkEdgesConnections(edges, nodes) {
        edges.forEach((e) => {
            if (!nodes.find(n => n.name == e.from)) {
                throw Error(`edge from <${e.from}> to <${e.destination}> is invalid, from node <${e.from}> does not exist`);
            }
            if (!nodes.find(n => n.name == e.destination)) {
                throw Error(`edge from <${e.from}> to <${e.destination}> is invalid, destination node <${e.destination}> does not exist`);
            }
        });
    }
    get_node_variables(variables) {
        return {
            name: variables.indexOf('label'),
            color: variables.indexOf('color')
        };
    }
    get_edge_variables(variables) {
        return {
            from: variables.indexOf('from'),
            to: variables.indexOf('to'),
            weight: variables.indexOf('weight'),
            color: variables.indexOf('color')
        };
    }
    create_node(node, variables) {
        let node_var = node.split("(")[1].split(")")[0].split(",");
        const node_name = node_var[variables['name']];
        return (0, models_1.createGraphNode)({
            name: node_name,
            color: variables['color'] != -1 ? node_var[variables['color']] : null
        });
    }
    create_edge(edge, variables) {
        let edge_var = edge.split("(")[1].split(")")[0].split(",");
        const edge_from = edge_var[variables['from']];
        const edge_to = edge_var[variables['to']];
        const edge_weight = variables['weight'] != -1 ? edge_var[variables['weight']] : null;
        return (0, models_1.createGraphEdge)({
            from: edge_from,
            destination: edge_to,
            weight: edge_weight,
            color: variables['color'] != -1 ? edge_var[variables['color']] : null,
        });
    }
}
exports.GraphParser = GraphParser;
