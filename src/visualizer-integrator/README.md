
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
            "nodes": {
                "atom": {
                    "name": "node",
                    "variables": ["label", "color"]
                },
                "style": {
                    "color": {
                        "root": "yellow",
                        "leaves": "fuchsia",
                        "nonRoot": "blue"
                    }
                }
            },
            "edges": {
                "atom": {
                    "name": "edge",
                    "variables": ["from", "to", "color"]
                },
                "style": {
                    "color": {
                        "branch": "green",
                        "path": "yellow"
                    },
                    "oriented": false
                }
            }
        }
# Matrix/Table visualizer
TODO
