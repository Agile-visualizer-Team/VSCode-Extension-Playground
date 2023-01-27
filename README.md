# Visualizer ASP Extension User Manual
This extension allows you to convert your **ASP answer sets** into various **visualizations**. The available visualizations are:
* **Graph** - a graph representation of the answer set
* **Table** - a table representation of the answer set
* **Matrix** - a matrix representation of the answer set
* **Image** - a image representation of the answer set
* **Gif** - a gif representation of the image answer set

The visualizations have some customizations available, such as the ability to change the **color** of the nodes and edges, the **theme**, the **color** of the table, and the ability to choose to use images or colors for AS visualization.

## Installation dependencies
In order to use this extension, you need to have the following installed:
* [DLV Solver](https://dlv.demacs.unical.it/home)
* A Chromium-based browser (Google Chrome, Microsoft Edge, etc.)
* [FFMPEG](https://ffmpeg.org/) (optional for GIF creation)

# Getting Started:
## Extension Folder
At the start of the extension, you will be required to **create a folder for the extension's files**. This folder will be used to store the *configuration files* to run the extension with the same setting every time. 

![Popup](https://raw.githubusercontent.com/Agile-visualizer-Team/visualizer-asp/master/usermanual/popup.png)

## Initial configuration
After creating the folder for the extension's files, the extension will look like this:
![initial](https://raw.githubusercontent.com/Agile-visualizer-Team/visualizer-asp/master/usermanual/Initial%20setup.png)

All the **mandatory** settings are marked with the *required* keyword. In particular, you need to set the following:

* \# of Answer Sets: the number of answer sets to be visualized
* Solver Path: the path to the DLV solver based on the operating system you are using. 
* Program File: the path to the ASP program file that contains the rules and facts to be visualized
* Output directory: the path to the folder where the visualizations will be saved
* Chrome Executable: the path to the Chrome executable file based on the Chromium-based browser you are using.
* Template file: the path to the file containing the mapping for the execution to be runned. It's suggested to **generate the file using the extension** appropriate menu.
    * The first dropdown menu allows you to choose the type of visualization you want to generate. 
    * Clicking **Save template file** will ask you a name for the json file that will be saved in the extension's folder. 
    * You can select this file in the dropdown menu to use it as a template for the execution.
    
    ![Gif template file](https://raw.githubusercontent.com/Agile-visualizer-Team/visualizer-asp/master/usermanual/gif%20template.gif)
* Image Directory: the path to the folder containing the images to be used in the image visualization. It's suggested to name the files in the folder with the same name of the node in the ASP program in order to have an easier configuration.
    
After all of this you are ready to run the extension with the template file you just created. 


# Features:
The extension is capable of generating various visualizations, each with its own features. 

## Graph
In the **Graph** menu it's possible to *Add* or *Remove* nodes and edges from the visualization.

It's is possible to set the **name of the atom** and, for each atom, add or remove **arguments**.

For each node, it's possible to style it with different color for:
* Root node
* Leaves node
* Non root node

For each edge, you can set the **atom name** and the **attributes** for each edge. It's possible to setup the color of the edges and to choose if the edge is **oriented or not**.

![Screen graph](https://raw.githubusercontent.com/Agile-visualizer-Team/visualizer-asp/master/usermanual/graph.png)
## Table

In the **Table** menu it's possible to *Add* or *Remove* cells from the visualization. It's mandatory to map the cells to the atoms in the ASP program.

In the Table Mapping section, it's possible to setup the columns of the table and set a name for each coulmn.

It's possible to style the table with:
* The color of the table's header
* The font size
* The font family
* The font weight
* Choose to use dark mode or not

![Screen table](https://raw.githubusercontent.com/Agile-visualizer-Team/visualizer-asp/master/usermanual/table.png)
## Matrix

In the **Matrix** menu it's possible to *Add* or *Remove* cells from the visualization. It's mandatory to map the cells to the atoms in the ASP program.

Here is added the possiblity to choose the **number of answer sets to compute**.

It's possible to style the matrix with:
* The color of the table's header
* The font size
* The font family
* The font weight
* Choose to use dark mode or not

![Screen matrix](https://raw.githubusercontent.com/Agile-visualizer-Team/visualizer-asp/master/usermanual/matrix.png)


## Matrix Image

In the **Matrix Image** menu it's possible to *Add* or *Remove* cells from the visualization. It's mandatory to map the cells to the atoms in the ASP program.

Here is added the possiblity to choose the **number of answer sets to compute**.

It's possible to choose to use images or colors for the visualization.

 If you choose to use images, you need to set the **image directory** in the initial configuration. Plus, you need to set the **image name** for each attribute.

 If you choose to use colors, you need to set the **color** for each attribute.

It's possible to style the matrix changing:
* The color of the table's header
* The font size
* The font family
* The font weight
* Choose to use dark mode or not

It's possible to **check** the *Make image sequence* checkbox to prepare the files for the gif creation.

![Matrix images screen](https://raw.githubusercontent.com/Agile-visualizer-Team/visualizer-asp/master/usermanual/matrix_image.png)




# Graph template documentation and advanced usages
For advanced usages, instead of using the UI you can create a JSON template to achieve a fine grained personalization. 
## JSON template
```json
{
    "template": "graph",
    "layout": "string",
    "nodes": [
        {
            "atom": {
                "name": "string",
                "variables": ["string"]
            },
            "style": {
                "color": {
                    "node_type": {
                        "if": [
                            {"variable": "string", "condition": "string" | number, "then": "string"}
                        ],
                        "else": "string"
                    },
                }
            }
        },
    ],
    "edges": [
        {
            "atom": {
                "name": "string",
                "variables": ["string"]
            },
            "style": {
                "color": {
                    "if": [
                        {"variable": "string", "condition": "string" | number, "then": "string"},
                    ],
                    "else": "string"
                },
                "oriented": boolean
            }
        },
    ]
}
```
## JSON Parameters explaination
* **layout**: 
    * Specifies the layout of the nodes in the output image
    * Can be **dagre** or **avsdf** 
    * Required: True

* **atom.name**:
    * Name of the atom that we want to map as a nodes/edge of the graph
    * Pattern: **"^[A-Za-z][A-Za-z0-9\_]{0,19}$"**
    * Required: False, if omitted the atom **node** will be mapped by default

* **nodes.atom.variables**:
    * Represents the predicates of the atom
    * Must contain at least **label**
    * Can contain **color** to specify the color of the node
    * Other user defined parameters can be referred inside **IF condition operators**
    * Example: node(name,Y,color), we can map X as the node label using variables = ['label', 'param1','color'].
    * Required: False, if omitted ['label'] is used
* **style**:
    * Required: False, the default style is used

* **node_type**:
    * Can be **root**, **non-root**, **leaf**, **all** and specify what type of node we want to target with this specific style

* **edges.atom.variables**:
    * Represents the predicates of the atom
    * Must contain at least **from** and **to**
    * Can contain **color** to specify the color of the edge
    * Can contain **weight** to specify the weight of the edge
    * Other user defined parameters can be referred inside **IF condition operators**
    * Required: False, if omitted ['from', 'to'] is used

* **oriented**:
    * True if the graph is oriented, false otherwise 
    * Required: False, if omitted the default value is True

## IF condition operators
Is it possible to specify colors of root, leaves and non-root by using simple if conditions. Only the first satisfied condition is applied, if none of the if conditions are met then the else is executed.
| IF Condition operator | Description and example |
|-----------------------|-------------------------|
| `matches: foo` | True if the fact variable is exactly `foo` (case sensitive equal comparator) |
| `imatches: foo` | True if the fact variable is `FOO` or `foo` (case insensitive equal comparator) |
| `contains: bar` | True if the fact variable contains `bar`, example: `foobar` (case sensitive) |
| `icontains: bar` | True if the fact variable contains `bar` or `BAR`, example: `fooBAR` (case insensitive) |
| `lt: 25` | True if the fact variable is less than `25`, example: `24` |
| `lte: 25` | True if the fact variable is less than `25` or equal to `25`, example: `25` or `24` |
| `gt: 50` | True if the fact variable is greater than `50`, example: `51` |
| `gte: 50` | True if the fact variable is greater than `50` or equal to `50`, example: `51` or `52` |
## JSON template example
```json
{
    "template": "graph",
    "layout": "dagre",
    "nodes": [
        {
            "atom": {
                "name": "inNode",
                "variables": ["label", "weight"]
            },
            "style": {
                "color": {
                    "root": {
                        "if": [
                            {"variable": "label", "matches": "a", "then": "green"}
                        ],
                        "else": "orange"
                    },
                    "nonRoot": {
                        "if": [
                            {"variable": "weight", "lte": 5, "then": "yellow"},
                            {"variable": "weight", "gt": 6, "then": "red"}
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
                "variables": ["from", "to", "weight","my_predicate"]
            },
            "style": {
                "color": {
                    "if": [
                        {"variable": "weight", "gte": 6, "then": "red"},
                        {"variable": "weight", "gte": 4, "then": "orange"},
                        {"variable": "weight", "gte": 2, "then": "yellow"},
                        {"variable": "my_predicate", "icontains": "example", "then": "purple"}
                    ],
                    "else": "green"
                },
                "oriented": true
            }
        },
        {
            "atom": {
                "name": "outEdge",
                "variables": ["from", "to", "color"]
            }
        }
    ]
}
```
This template can be used to visualize this answer set
```
inNode(a)
inNode(b)
inNode(g)
inNode(d)
inNode(h)
inEdge(a,b,2)
inEdge(b,d,6)
inEdge(d,g,4)
inEdge(g,h,0)
outNode(c)
outNode(e)
outEdge(b,e,7)
outEdge(a,c,10)
outEdge(c,d,4)
outEdge(e,h,19)
outEdge(b,g,8)
```
Resulting in this output image

![Graph images examples](https://raw.githubusercontent.com/Agile-visualizer-Team/visualizer-asp/master/usermanual/graph-example.png)

# Common issues 
Un poco
