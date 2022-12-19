"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createGraphEdge = exports.createGraphNode = void 0;
function createGraphNode(options) {
    const defaults = {
        name: "node",
    };
    return Object.assign(Object.assign({}, defaults), options);
}
exports.createGraphNode = createGraphNode;
function createGraphEdge(options) {
    const defaults = {
        from: "a",
        destination: "b",
        weight: null,
        oriented: true
    };
    return Object.assign(Object.assign({}, defaults), options);
}
exports.createGraphEdge = createGraphEdge;
