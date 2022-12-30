"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.renderGraph = void 0;
const path = __importStar(require("path"));
const yargs = __importStar(require("yargs"));
const fs = __importStar(require("fs"));
const renderer_1 = require("./renderer");
const renderer_themes_1 = require("./renderer-themes");
const parser_1 = require("./parser");
const readline = __importStar(require("readline"));
class GraphScript {
    constructor(debugMode) {
        if (debugMode) {
            this.runCliScript();
        }
        else {
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
    }
    static jsonFileToObject(path) {
        return JSON.parse(fs.readFileSync(path, 'utf8'));
    }
    static jsonStringToObject(jsonStr) {
        return JSON.parse(jsonStr);
    }
    runCliScript() {
        const FILE_PATHS_RELATIVE_TO = process.cwd();
        yargs
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
            const template = GraphScript.jsonFileToObject(path.join(FILE_PATHS_RELATIVE_TO, argv.template));
            const answerSets = GraphScript.jsonFileToObject(path.join(FILE_PATHS_RELATIVE_TO, argv.as));
            const outputDirPath = path.join(FILE_PATHS_RELATIVE_TO, argv.output);
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
            const rl = readline.createInterface({
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
                const template = GraphScript.jsonFileToObject(path.join(FILE_PATHS_RELATIVE_TO, argv.template));
                const answerSets = GraphScript.jsonStringToObject(jsonStr);
                const outputDirPath = path.join(FILE_PATHS_RELATIVE_TO, argv.output);
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
        const parser = new parser_1.GraphParser(template, answerSets);
        const graphs = parser.parse();
        renderer.render(graphs, (index) => {
            console.log(`Rendering graph ${index}...`);
        }, (index, graph, output) => {
            console.log(`Graph ${index} rendered successfully...`);
            const filename = 'graph-' + index + '-' + Date.now() + '.png';
            const filepath = outputDirPath + '/' + filename;
            if (!fs.existsSync(outputDirPath)) {
                fs.mkdirSync(outputDirPath, {
                    recursive: true
                });
            }
            fs.writeFileSync(filepath, output, 'base64');
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
    new GraphScript(false);
}
