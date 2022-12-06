import { execSync } from 'child_process';
var fs = require('fs')
var { argv } = require("yargs")
.scriptName("asp_visualizer")
.usage("Usage: node $0 -d dlv -i asp_file -t template_file -o output_directory")
.option("d", {
  alias: "dlv_path",
  describe: "The path of the dlv solver",
  demandOption: "The dlv excutable is required.",
  type: "string",
})
.option("i", {
  alias: "asp_file",
  describe: "ASP file to solve",
  demandOption: "The input file is required.",
  type: "string",
})
.option("o", {
  alias: "output",
  describe: "path to the output directory",
  demandOption: "the output directory is required",
  type: "string",
})
.option("t",{
    alias: "template_file",
    describe: "path to the template file",
    type: "string",
    demandOption: "The template file is required",
})
.option("n", {
    alias: "as_number",
    describe: "Number of AS you want to display, insert 0 for all",
    type: "number",
    default: 1,
  })
.describe("help", "Show help.")

let visualizer_object = {
    'graph': `node ./asd-graph-renderer/build/script.js fromstr --template ${argv.template_file} --output ${argv.output}`,
    'tree': `node ./asd-graph-renderer/build/script.js fromstr --template ${argv.template_file} --output ${argv.output}`,
    'table': `node agile_visualizer_matrix_visualizaton/src/table_visualization.js fromstr --template ${argv.template_file}`,
    'matrix': `node agile_visualizer_matrix_visualizaton/src/matrix_visualization.js fromstr --template ${argv.template_file}`,
}

let rawdata = fs.readFileSync(`${argv.template_file}`);
let tmp = JSON.parse(rawdata);
let dlv_execution = `node ./NodeJs-DLV-Wrapper/dlv_wrapper.js -i ${argv.asp_file} -d ${argv.dlv_path} -n ${argv.as_number}`
let dlv_result = "" + execSync(dlv_execution)
let res = execSync(`${visualizer_object[tmp['template']]}`, {input: `${dlv_result}\n\r`})

console.log("" + res)