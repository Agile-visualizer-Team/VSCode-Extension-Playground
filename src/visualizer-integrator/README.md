
## Cloning and installing all the required modules
    git clone --recurse-submodules https://github.com/Agile-visualizer-Team/AgileScriptIntegration.git
    cd AgileScriptIntegration
    npm run build

## Usage
    node visualizer.js -d path_to_dlv -i path_to_asp_file -t path_to_template -o path_to_output_directory
    
# Graph visualizer
## Asp file example (3-colorability)
        starting(a).
        starting(b).
        starting(c).
        starting(d).
        starting(e).
        starting(f).
        edge(a,b, blue).
        edge(a,c, blue).
        edge(b,c, blue).
        edge(b,d, blue).
        edge(c,d, blue).
        edge(c,e, blue).
        edge(d,e, blue).
        edge(d,f, blue).
        edge(e,f, blue).
        node(X, red) | node(X, yellow) | node(X, green) :- starting(X).
        :- node(X,C),node(Y,C), edge(X,Y,_),X!=Y.
## Template file example
    {
        "template": "graph",
        "layout": "dagre",
        "nodes": [
            {
                "atom": {
                    "name": "inNode",
                    "variables": ["label"]
                },
                "style": {
                    "color": {
                        "all": {
                            "if": [
                                {"variable": "label", "matches": "a", "then": "green"},
                                {"variable": "label", "matches": "d", "then": "blue"},
                                {"variable": "label", "matches": "h", "then": "fuchsia"}
                            ],
                            "else": "orange"
                        }
                    }
                }
            },
            {
                "atom": {
                    "name": "outNode",
                    "variables": ["label"]
                },
                "style": {
                    "color": {
                        "all": "grey"
                    }
                }
            }
        ],
        "edges": [
            {
                "atom": {
                    "name": "inEdge",
                    "variables": ["from", "to", "weight"]
                },
                "style": {
                    "color": {
                        "if": [
                            {"variable": "weight", "gte": 6, "then": "red"},
                            {"variable": "weight", "gte": 4, "then": "orange"},
                            {"variable": "weight", "gte": 2, "then": "yellow"}
                        ],
                        "else": "green"
                    },
                    "oriented": true
                }
            },
            {
                "atom": {
                    "name": "outEdge",
                    "variables": ["from", "to", "weight"]
                },
                "style": {
                    "color": "grey",
                    "oriented": false
                }
            }
        ]
    }
# Matrix/Table visualizer
TODO
