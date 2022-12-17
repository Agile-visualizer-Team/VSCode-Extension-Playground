"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.TableCreator = void 0;
var yargs = require("yargs");
var readline = require('readline');
var TableCreator = /** @class */ (function () {
    function TableCreator() {
        this.answer_sets = require('./answers_sets.json');
        this.config_file = require('./config_table.json');
        this.fs = require('fs');
        this.table = require('table');
        this.node_html_to_image = require('node-html-to-image');
        this.undefined_error_string = 'this data cannot be undefined';
        this.style = this.get_config_style();
        this.base_styling = this.get_base_styling();
    }
    /**
    * The function returns the value of the style property of the config_file object
    * @returns The style property of the config_file object.
    */
    TableCreator.prototype.get_config_style = function () {
        return this.config_file.style;
    };
    /**
     * It returns an object with the same keys as the object that is passed to it, but with the values
     * of the keys being the values of the keys in the object that is passed to it.
     * @returns An object with the properties html_background_color, html_text_color,
     * table_background_color, table_shadow_color, table_text_color, and table_bottom_border.
     */
    TableCreator.prototype.get_base_styling = function () {
        return {
            html_background_color: this.style.dark_mode ? "#101010" : "#ebebeb",
            html_text_color: this.style.dark_mode ? "#e1e1e1" : "#000000",
            table_background_color: this.style.dark_mode ? "#252525" : "#f8f8f8",
            table_shadow_color: this.style.dark_mode ? " rgba(200, 200, 200, 0.10)" : "rgba(0, 0, 0, 0.15)",
            table_text_color: this.style.dark_mode ? "#e1e1e1" : "#000000",
            table_bottom_border: this.style.dark_mode ? "1px solid #e1e1e1" : "1px solid #878787"
        };
    };
    /**
     * It takes the answer sets and the configuration file and creates the tables
     * @param {any} answer_sets - the list of answer sets returned by the solver
     * @returns the number of answer sets to convert in image.
     */
    TableCreator.prototype.run_script = function (answer_sets) {
        return __awaiter(this, void 0, void 0, function () {
            var mapping_list, max_num_of_as_to_convert, i, self;
            return __generator(this, function (_a) {
                mapping_list = this.config_file.cell;
                max_num_of_as_to_convert = this.maxNumOfAnswerSetToConvert();
                console.log('Your configuration: ');
                console.log('Mapped atoms: ' + mapping_list);
                console.log('Maximum number answer set to convert in image: ' + max_num_of_as_to_convert);
                i = 0;
                self = this;
                answer_sets.forEach(function (value) {
                    if (i >= max_num_of_as_to_convert)
                        return;
                    self.create_table_from_atoms_list(value.as, mapping_list, i);
                    i++;
                });
                return [2 /*return*/];
            });
        });
    };
    /**
     * It takes a list of atoms, a list of mappings, and an index, and creates an image from the html
     * table that is created from the atoms and mappings
     * @param {string[]} atoms_list - the list of atoms that will be used to create the table
     * @param {string[]} mapping_list - this is the list of atoms that you want to map.
     * @param {number} index - the index of the current table
     */
    TableCreator.prototype.create_table_from_atoms_list = function (atoms_list, mapping_list, index) {
        var table_html = '';
        var self = this;
        mapping_list.forEach(function (mapped_atom) {
            table_html = self.create_html_table_for_mapped_atom(atoms_list, mapped_atom, table_html);
        });
        var html_to_convert_in_image = this.create_html_to_convert_in_image(table_html);
        this.create_image_from_html(index, html_to_convert_in_image);
    };
    /**
     * It takes an index and an html string, and then it creates an image from the html string and
     * saves it to the file system
     * @param {number} index - the index of the answer set
     * @param {string} html_to_convert_in_image - This is the HTML that you want to convert into an
     * image.
     * @returns false.
     */
    TableCreator.prototype.create_image_from_html = function (index, html_to_convert_in_image) {
        this.node_html_to_image({
            output: './answer_set_table_' + index + '.png',
            html: html_to_convert_in_image
        })
            .then(function () {
            return true;
        });
        return false;
    };
    /**
     * It takes a string of HTML and returns a string of HTML that includes the HTML that was passed
     * in, plus some additional HTML that is needed to make the HTML look good when it is converted to
     * an image
     * @param {string} table_html - The HTML of the table you want to convert to an image.
     * @returns The html string is being returned.
     */
    TableCreator.prototype.create_html_to_convert_in_image = function (table_html) {
        if (table_html === undefined)
            return '';
        var html = "<html>\n            <head>\n                ".concat(this.get_html_style(), "\n            </head>\n            <body>") + table_html + "</body>\n        </html>";
        //Using this for debugging and testing
        this.fs.writeFileSync('./preview_table.html', html);
        return html;
    };
    /**
     * It returns a string containing the HTML code for the style of the page
     * @returns The HTML style for the table.
     */
    TableCreator.prototype.get_html_style = function () {
        return "\n    <style>\n    html{\n        background-color: " + this.base_styling.html_background_color + ";\n        color: " + this.base_styling.html_text_color + ";\n        font-family: Arial;\n    }\n    strong{\n        color: " + this.base_styling.html_text_color + ";\n        font-size: 20px;\n    }\n    body {\n        background-color: " + this.base_styling.html_background_color + ";\n        color: " + this.base_styling.html_text_color + ";\n        margin: 1em;\n        display: flex;\n        justify-content: space-evenly;\n        align-items: center;\n        gap: 20px;\n        padding:1em;\n        flex-direction: column;\n        margin: 1em;\n        padding-top: 1em;\n        height: -webkit-fill-available;\n    }\n    td {\n        padding: 12px 15px;\n    }\n    thead{\n        background-color: ".concat(this.style.header_color, ";\n        color: #ffffff;\n        width: 100%;\n        font-size: ").concat(this.style.header_font_size, ";\n        font-family: ").concat(this.style.header_font_family, ";\n        font-weight: ").concat(this.style.header_font_weight, ";\n        text-align: center;\n        display: table-caption;\n    }\n    tbody tr {\n        border-bottom: ").concat(this.base_styling.table_bottom_border, ";\n        background-color: ").concat(this.base_styling.table_background_color, ";\n    }\n    table {\n        border-collapse: collapse;\n        margin: 1em;\n        width: 100%;\n        font-size: 0.9em;\n        font-family: sans-serif;\n        min-width: 400px;\n        box-shadow: 0px 10px 15px -5px ").concat(this.base_styling.table_shadow_color, ";\n        color: ").concat(this.base_styling.table_text_color, ";\n    }\n    .fieldStyle{\n        background-color: ").concat(this.style.header_color, ";\n        color: #ffffff;\n        \n        font-size: ").concat(this.style.header_font_size, ";\n        font-family: ").concat(this.style.header_font_family, ";\n        font-weight: bold;\n        font-style: italic;\n        text-align: center;\n    }\n    \n\n    .titolo{\n        display: flex;\n        justify-content: space-around;\n        align-items: center;\n    }\n</style>");
    };
    /**
     * It takes an array of strings, a string, and a string, and returns a string
     * @param {string[]} atoms_list - string[] - the list of atoms from the answer set
     * @param {string} mapped_atom - the atom that is being mapped to the table
     * @param {string} table_html - the html string that will be returned
     * @returns a string that contains the html code for the table.
     */
    TableCreator.prototype.create_html_table_for_mapped_atom = function (atoms_list, mapped_atom, table_html) {
        var atoms_splitted_array = new Array();
        if (this.retrieve_answer_set_as_tuple_array(atoms_list, atoms_splitted_array, mapped_atom)) {
            if (atoms_splitted_array.length > 0) {
                table_html += this.create_table_html(atoms_splitted_array, mapped_atom);
            }
            else {
                table_html += '<strong>No value found in answer set for: ' + mapped_atom + '</strong><br>';
            }
        }
        else {
            table_html = "<strong>Problem in table creating, make sure data is correct (check the answer set)</strong>";
        }
        return table_html;
    };
    /**
     * It takes an array of arrays of strings and a string, and returns a string
     * @param {string[][]} atoms_splitted_array - the array of arrays containing the atoms of the answer
     * set
     * @param {string} mapped_atom - the atom that is mapped to the table
     * @returns a string that contains the HTML code of the table.
     */
    TableCreator.prototype.create_table_html = function (atoms_splitted_array, mapped_atom) {
        if (atoms_splitted_array == undefined || atoms_splitted_array.length == 0)
            return '';
        if (mapped_atom == undefined || mapped_atom == '')
            return '';
        var html_table = "<table><thead><tr class=\"titolo\"><th>Answer set</th><th>Mapped value: " + mapped_atom + "</th></tr></thead><tbody><tr>";
        for (var k = 0; k < atoms_splitted_array[0].length; k++) {
            if (this.config_file.table_field_mapping[k.toString()] == undefined)
                html_table += "<td class=fieldStyle>Field " + k + "</td>";
            else
                html_table += "<td class=fieldStyle>" + this.config_file.table_field_mapping[k] + "</td>";
        }
        html_table += '</tr>';
        for (var i = 0; i < atoms_splitted_array.length; i++) {
            html_table += "<tr>";
            for (var j = 0; j < atoms_splitted_array[i].length; j++) {
                //html_table+="<td>"+j+ "</td>";
                html_table += "<td>" + atoms_splitted_array[i][j] + "</td>";
            }
            html_table += "</tr>";
        }
        html_table += '</tbody></table>';
        return html_table;
    };
    /**
     * This function retrieves the answer set of a given atom and returns it as a tuple array
     * @param {string[]} atoms_list - This is the list of atoms that are returned by the answer set
     * solver.
     * @param {string[][]} atoms_splitted_array - This is the array that will contain the answer set.
     * @param {string} mapped_atom - The atom that you want to retrieve.
     * @returns a boolean value.
     */
    TableCreator.prototype.retrieve_answer_set_as_tuple_array = function (atoms_list, atoms_splitted_array, mapped_atom) {
        /* Checking if the input is valid. */
        if (atoms_list == undefined)
            return false;
        if (atoms_splitted_array == undefined)
            return false;
        if (mapped_atom == undefined)
            return false;
        for (var k = 0; k < atoms_list.length; k++) {
            if (atoms_list[k].includes(mapped_atom + '(')) {
                var atom_value = atoms_list[k].substring(atoms_list[k].indexOf("(") + 1, atoms_list[k].lastIndexOf(")"));
                //console.log(atom);
                var atom_values_tuple = atom_value.split(',');
                atoms_splitted_array.push(atom_values_tuple);
            }
        }
        return true;
    };
    /**
     * It returns the maximum number of answer sets to convert.
     * @returns The maximum number of answer sets to convert.
     */
    TableCreator.prototype.maxNumOfAnswerSetToConvert = function () {
        return this.config_file.maxNumOfAnswerSetToConvert;
    };
    /**
     * It reads the command line arguments and runs the script accordingly
     */
    TableCreator.prototype.read_commands_and_run = function () {
        var _this = this;
        yargs
            .command('fromfile', 'generate the table images from files', function (yargs) {
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
            });
        }, function (argv) {
            var config_file = JSON.parse(_this.fs.readFileSync(argv.template));
            var answer_set_json = JSON.parse(_this.fs.readFileSync(argv.as));
            _this.setup_and_run_script(config_file, answer_set_json, '');
        })
            .command('fromstr', 'generate the table images from json string inputs', function (yargs) {
            return yargs
                .option('template', {
                describe: 'the input json template file path',
                type: 'string',
                required: true
            });
        }, function (argv) {
            var rl = readline.createInterface({
                input: process.stdin,
                output: process.stdout,
                terminal: false
            });
            rl.question("Insert you as: ", function (answer_set_to_parse) {
                var config_file = JSON.parse(_this.fs.readFileSync(argv.template));
                var answer_set_json = JSON.parse(answer_set_to_parse);
                _this.setup_and_run_script(config_file, answer_set_json, '');
                rl.close();
            });
        })
            .version(false)
            .parseSync();
    };
    TableCreator.prototype.setup_and_run_script = function (config_file, answer_set, output_directory) {
        this.config_file = config_file;
        this.run_script(answer_set);
    };
    return TableCreator;
}());
exports.TableCreator = TableCreator;
/* Creating a new instance of the TableCreator class and then calling the read_commands_and_run()
method on it. */
if (require.main === module) {
    var script = new TableCreator();
    script.read_commands_and_run();
}
