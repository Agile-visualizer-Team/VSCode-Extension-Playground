"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.renderGraph = void 0;
const path_1 = __importDefault(require("path"));
const yargs_1 = __importDefault(require("yargs"));
const fs_1 = __importDefault(require("fs"));
const renderer_1 = require("./renderer");
const renderer_themes_1 = require("./renderer-themes");
const renderer_layout_1 = require("./renderer-layout");
const parser_1 = require("./parser");
const readline_1 = __importDefault(require("readline"));
class GraphScript {
    constructor() {
        try {
            this.runCliScript();
        }
        catch (error) {
            if (error instanceof Error) {
                console.error(error.message);
            }
            else {
                console.log('an error occurred: ', error);
            }
        }
    }
    static jsonFileToObject(path) {
        return JSON.parse(fs_1.default.readFileSync(path, 'utf8'));
    }
    static jsonStringToObject(jsonStr) {
        return JSON.parse(jsonStr);
    }
    runCliScript() {
        const FILE_PATHS_RELATIVE_TO = process.cwd();
        yargs_1.default
            .command('fromfile', 'generate the graph image from files', (yargs) => {
            return yargs
                .option('template', {
                describe: 'the input json template file path',
                type: 'string',
                required: true
            })
                .option('as', {
                describe: 'the input json answer sets file path',
                type: 'string',
                required: true
            })
                .option('output', {
                describe: 'the output dir path',
                type: 'string',
                required: true
            });
        }, (argv) => {
            console.log(`Using <<${argv.template}>> as template file...`);
            console.log(`Using <<${argv.as}>> as answer set file...`);
            console.log(`Using <<${argv.output}>> as output directory...`);
            console.log();
            const template = GraphScript.jsonFileToObject(path_1.default.join(FILE_PATHS_RELATIVE_TO, argv.template));
            const answerSets = GraphScript.jsonFileToObject(path_1.default.join(FILE_PATHS_RELATIVE_TO, argv.as));
            const outputDirPath = path_1.default.join(FILE_PATHS_RELATIVE_TO, argv.output);
            GraphScript.runRendering(template, answerSets, outputDirPath);
        })
            .command('fromstr', 'generate the graph image from json string inputs', (yargs) => {
            return yargs
                .option('template', {
                describe: 'the input json template file path',
                type: 'string',
                required: true
            })
                .option('output', {
                describe: 'the output dir path',
                type: 'string',
                required: true
            });
        }, (argv) => {
            const rl = readline_1.default.createInterface({
                input: process.stdin,
                output: process.stdout,
                terminal: false
            });
            rl.question("", (jsonStr) => {
                console.log();
                console.log(`Using <<${argv.template}>> as template file...`);
                console.log(`Using answer set json from stdin (${jsonStr.length} chars)...`);
                console.log(`Using ${argv.output} as output directory...`);
                console.log();
                const template = GraphScript.jsonFileToObject(path_1.default.join(FILE_PATHS_RELATIVE_TO, argv.template));
                const answerSets = GraphScript.jsonStringToObject(jsonStr);
                const outputDirPath = path_1.default.join(FILE_PATHS_RELATIVE_TO, argv.output);
                GraphScript.runRendering(template, answerSets, outputDirPath);
                rl.close();
            });
        })
            .version(false)
            .parseSync();
    }
    static runRendering(template, answerSets, outputDirPath) {
        const renderer = new renderer_1.GraphRenderer();
        renderer.width = 1280;
        renderer.height = 1280;
        renderer.theme = renderer_themes_1.VSCODE_THEME;
        renderer.layout = renderer_layout_1.GraphRendererLayout.Dagre;
        renderer.outputType = 'base64';
        const parser = new parser_1.GraphParser(template, answerSets);
        const graphs = parser.parse();
        renderer.render(graphs, (index, graph) => {
            console.log(`Rendering graph ${index}...`);
        }, (index, graph, output) => {
            console.log(`Graph ${index} rendered successfully...`);
            const filename = 'graph-' + index + '-' + Date.now() + '.png';
            const filepath = outputDirPath + '/' + filename;
            if (!fs_1.default.existsSync(outputDirPath)) {
                fs_1.default.mkdirSync(outputDirPath, {
                    recursive: true
                });
            }
            fs_1.default.writeFileSync(filepath, output, 'base64');
            console.log(`Graph ${index} saved as ${filename}`);
        });
    }
}
function renderGraph(template, jsonAnswerset, outputDirPath) {
    const answerSets = JSON.parse(jsonAnswerset);
    return GraphScript.runRendering(template, answerSets, outputDirPath);
}
exports.renderGraph = renderGraph;
if (require.main === module) {
    new GraphScript();
}
