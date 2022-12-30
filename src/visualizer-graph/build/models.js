"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createGraphEdge = exports.createGraphNode = void 0;
function createGraphNode(options) {
    const defaults = {
        label: "node",
        variables: {},
        templateIndex: 0
    };
    return Object.assign(Object.assign({}, defaults), options);
}
exports.createGraphNode = createGraphNode;
function createGraphEdge(options) {
    const defaults = {
        from: "a",
        to: "b",
        weight: null,
        oriented: true,
        variables: {},
        templateIndex: 0
    };
    return Object.assign(Object.assign({}, defaults), options);
}
exports.createGraphEdge = createGraphEdge;
