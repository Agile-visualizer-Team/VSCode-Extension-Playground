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
exports.MatrixImagesCreator = void 0;
var path = require("path");
var readline = require("readline");
var fs = require("fs");
var MatrixImagesCreator = /** @class */ (function () {
    function MatrixImagesCreator() {
        this.answer_sets = require("./answers_sets_matrix_images.json");
        this.config_file = require("./config_matrix_images.json");
        this.style = this.get_config_style();
        this.base_styling = this.get_base_styling();
        this.table = require("table");
        this.node_html_to_image = require("node-html-to-image");
        this.undefined_error_string = "this data cannot be undefined";
        this.images_directory_path = "";
        this.almost_one_image_printed = false;
        this.output_dir = '';
    }
    /**
     * It takes a list of atoms, a mapped_atom (the atom choosen by user to be mapped on the table), and a table_html string
     * it tries to create a table the mapped atom, if the answer set contains this atom it will create a table
     *
     * If the answer set doesn't contain the atom the user will see "No value found in answer set for: (name of the mapped atom)"
     * @param {string[]} atoms_list - the list of atoms in the answer set
     * @param {string} mapped_atom - the value of the atom we want to map
     * @param {string} table_html - the html code of the table
     * @returns A string containing the HTML code for the table.
     */
    MatrixImagesCreator.prototype.create_html_table_for_mapped_atom = function (atoms_list, mapped_atom, table_html) {
        var rows_list = new Array();
        var columns_list = new Array();
        var atoms_splitted_array = new Array();
        if (this.retrieve_matrix_cell_as_tuple(atoms_list, rows_list, columns_list, atoms_splitted_array, mapped_atom)) {
            if (rows_list.length != 0 && columns_list.length != 0) {
                var matrix = new Array();
                matrix = this.init_matrix_rows_and_columns(matrix, rows_list, columns_list);
                this.fill_matrix_with_values(atoms_splitted_array, matrix);
                table_html += this.create_table_html(matrix, mapped_atom);
            }
            else {
                table_html +=
                    "<strong>No value found in answer set for: " +
                        mapped_atom +
                        "</strong><br>";
            }
        }
        else {
            table_html =
                "<strong>Problem in matrix creating, make sure data is correct</strong>";
        }
        return table_html;
    };
    /**
     * This function returns the maximum number of answer sets to convert.
     * @returns The maxNumOfAnswerSetToConvert property of the config_file object.
     */
    MatrixImagesCreator.prototype.maxNumOfAnswerSetToConvert = function () {
        return this.config_file.maxNumOfAnswerSetToConvert;
    };
    /**
     * It takes a list of atoms, a list of mapped atoms, and an index, and creates an image from the html
     * table that it creates
     * @param {string[]} atoms_list - list of atoms
     * @param {string[]} mapping_list - the list of atoms that are mapped to the current atom
     * @param {number} index - the index of the matrix in the list of matrices
     */
    MatrixImagesCreator.prototype.create_matrix_from_atoms_list = function (atoms_list, mapping_list, index) {
        var table_html = "";
        var self = this;
        mapping_list.forEach(function (mapped_atom) {
            table_html = self.create_html_table_for_mapped_atom(atoms_list, mapped_atom, table_html);
        });
        var html_to_convert_in_image = this.create_html_to_convert_in_image(table_html);
        this.create_image_from_html(index, html_to_convert_in_image);
    };
    /**
     * It takes an index and an html string as input, and it creates an image from the html string. It stores this image in the current working folder
     *
     * @param {number} index - the index of the answer set matrix
     * @param {string} html_to_convert_in_image - the html string that you want to convert to an image
     * @returns A boolean value.
     */
    MatrixImagesCreator.prototype.create_image_from_html = function (index, html_to_convert_in_image) {
        if (!fs.existsSync(this.output_dir)) {
            fs.mkdirSync(this.output_dir, { recursive: true });
        }
        this.node_html_to_image({
            output: this.output_dir + "answer_set_matrix_with_images" + index + ".png",
            html: html_to_convert_in_image,
            puppeteerArgs: { executablePath: process.env.CHROME_PATH }
        }).then(function () {
            return true;
        });
        return false;
    };
    /**
     * It takes a matrix, a list of rows and a list of columns (initally empty), and returns a matrix with the same
     * dimensions as the input matrix, but with all the values set to "Not defined" (just to initialize, in case the answer set doesn't contain
     * all matrix cells)
     * @param {string[][]} matrix - The matrix that will be returned.
     * @param {number[]} rows_list - a list of all the rows that are defined in the input file
     * @param {number[]} columns_list - A list of all the columns in the table.
     * @returns A matrix with the dimensions of the largest row and column in the input.
     */
    MatrixImagesCreator.prototype.init_matrix_rows_and_columns = function (matrix, rows_list, columns_list) {
        if (rows_list == undefined)
            throw new Error(this.undefined_error_string + " rows_list");
        if (columns_list == undefined)
            throw new Error(this.undefined_error_string + " columns_list");
        if (rows_list.length != 0 && columns_list.length != 0) {
            matrix = new Array(Math.max.apply(null, rows_list) + 1);
            for (var i = 0; i < matrix.length; i++) {
                matrix[i] = new Array(Math.max.apply(null, columns_list) + 1);
                for (var j = 0; j < Math.max.apply(null, columns_list) + 1; j++) {
                    matrix[i][j] = "undefined";
                }
            }
        }
        return matrix;
    };
    /**
     * The function returns the value of the style property of the config_file object
     * @returns The style property of the config_file object.
     */
    MatrixImagesCreator.prototype.get_config_style = function () {
        return this.config_file.style;
    };
    /**
     * It returns an object with the same keys as the object that is passed to it, but with the values
     * of the keys being the values of the keys in the object that is passed to it.
     * @returns An object with the properties html_background_color, html_text_color,
     * table_background_color, table_shadow_color, table_text_color, and table_bottom_border.
     */
    MatrixImagesCreator.prototype.get_base_styling = function () {
        return {
            html_background_color: this.style.dark_mode ? "#101010" : "#ebebeb",
            html_text_color: this.style.dark_mode ? "#e1e1e1" : "#000000",
            table_background_color: this.style.dark_mode ? "#252525" : "#f8f8f8",
            table_shadow_color: this.style.dark_mode
                ? " rgba(200, 200, 200, 0.10)"
                : "rgba(0, 0, 0, 0.15)",
            table_text_color: this.style.dark_mode ? "#e1e1e1" : "#000000",
            table_bottom_border: this.style.dark_mode
                ? "1px solid #e1e1e1"
                : "1px solid #878787"
        };
    };
    /**
     * It returns a string containing the HTML code for the style of the table.
     * @returns a string.
     */
    MatrixImagesCreator.prototype.get_html_style = function () {
        return ("\n        <style>\n        html{\n            background-color: " +
            this.base_styling.html_background_color +
            ";\n            color: " +
            this.base_styling.html_text_color +
            ";\n            font-family: " +
            this.style.header_font_family +
            ";\n        }\n        strong{\n            color: " +
            this.base_styling.html_text_color +
            ";\n            font-size: " +
            this.style.header_font_size +
            "px;\n        }\n        body {\n            background-color: " +
            this.base_styling.html_background_color +
            ";\n            color: " +
            this.base_styling.html_text_color +
            ";\n            margin: 1em;\n            display: flex;\n            justify-content: space-evenly;\n            align-items: center;\n            gap: 20px;\n            padding:1em;\n            flex-direction: column;\n            margin: 1em;\n            padding-top: 1em;\n            height: -webkit-fill-available;\n            height: auto;\n        }\n        td {\n            padding: 0;\n        }\n        \n        \n        thead{\n            background-color: ".concat(this.style.header_color, ";\n            color: #ffffff;\n            width: 100%;\n            font-size: ").concat(this.style.header_font_size, ";\n            font-family: ").concat(this.style.header_font_family, ";\n            font-weight: ").concat(this.style.header_font_weight, ";\n            text-align: center;\n            display: table-caption;\n        }\n        tbody tr {\n            background-color: ").concat(this.base_styling.table_background_color, ";\n        }\n        tbody{\n            display: flex;\n            flex-direction: column;\n            justify-content: center;\n            align-items: center;\n            gap:0;\n            margin: 1em;\n        }\n        table {\n            border-collapse: collapse;\n            margin: 1em;\n            width: 100%;\n            font-size: 0.9em;\n            font-family: sans-serif;\n            min-width: 400px;\n            box-shadow: 0px 10px 15px -5px ").concat(this.base_styling.table_shadow_color, ";\n            color: ").concat(this.base_styling.table_text_color, ";\n        }\n        \n\n        .titolo{\n            display: flex;\n            justify-content: space-around;\n            align-items: center;\n        }\n    </style>"));
    };
    /**
     * It takes the HTML of the table a the entire HTML (with the style we choose) of the page which
     * will be converted into an image
     * @param {string} table_html - The HTML of the table you want to convert to an image.
     * @param {number} index - The index of the table in the HTML file.
     * @returns the html that will be converted into an image.
     */
    MatrixImagesCreator.prototype.create_html_to_convert_in_image = function (table_html) {
        if (table_html === undefined)
            return "";
        var html = "<html>\n            <head>\n                ".concat(this.get_html_style(), "\n            </head>\n            <body>") +
            table_html +
            "</body>\n        </html>";
        //Using this for debugging and testing
        fs.writeFileSync("./preview_matrix.html", html);
        return html;
    };
    /**
     * It takes an array of arrays of strings (array that contains all the cells as an array [i,j,value] and a matrix of strings
     * (the matrix we want to fill with the atoms values)
     * and fills the matrix with the values from the array
     * @param {string[][]} atoms_splitted_matrix - This is the array that contains the atoms that are split
     * by the ',' character.
     * @param {string[][]} matrix - The matrix that will be filled with the values.
     */
    MatrixImagesCreator.prototype.fill_matrix_with_values = function (atoms_splitted_matrix, matrix) {
        if (atoms_splitted_matrix === undefined)
            return false;
        if (atoms_splitted_matrix.length === 0)
            return false;
        if (matrix === undefined)
            return false;
        var self = this;
        atoms_splitted_matrix.forEach(function (atom) {
            if (atom.length == 3) {
                var row = Number(atom[0]);
                var column = Number(atom[1]);
                if (self.config_file.useImages) {
                    if (self.config_file.images_binding[atom[2].toString()] != undefined)
                        matrix[row][column] =
                            self.config_file.images_binding[atom[2].toString()];
                    //   console.log(".---------------", self.config_file.images_binding, atom[2].toString());
                    //   console.log(".---------------", matrix[row][column]);
                }
                else {
                    if (self.config_file.colors_binding[atom[2]] != undefined)
                        matrix[row][column] = self.config_file.colors_binding[atom[2]];
                }
            }
        });
        return true;
    };
    /**
     * It takes a list of atoms, and for each atom that contains a the mapped atom name chosed from the user,
     *  it extracts the row and column number of that cell, and adds them to the rows_list and columns_list (we will use it to
     * define the correct matrix number of rows and columns)
     * after this this method puts in atoms_splitted_array all the atoms (mapped) as an array [i,j, value] (strings)
     * @param {string[]} atoms_list - string[]: This is the list of atoms that you want to retrieve the
     * matrix cell from.
     * @param {number[]} rows_list - number[] - this is an array of numbers that will contain the row
     * numbers of the matrix cells
     * @param {number[]} columns_list - number[]
     * @param {string[][]} atoms_splitted_matrix - This is the array that will contain the values of the
     * matrix cell.
     * @param {string} cell_name - the name of the cell you want to retrieve
     */
    MatrixImagesCreator.prototype.retrieve_matrix_cell_as_tuple = function (atoms_list, rows_list, columns_list, atoms_splitted_matrix, cell_name) {
        /* Checking if the input is valid. */
        if (atoms_list == undefined)
            return false;
        if (rows_list == undefined || rows_list.length !== 0)
            return false;
        if (columns_list == undefined || columns_list.length !== 0)
            return false;
        if (atoms_splitted_matrix == undefined)
            return false;
        if (atoms_splitted_matrix.length !== 0)
            return false;
        for (var k = 0; k < atoms_list.length; k++) {
            if (atoms_list[k].includes(cell_name + "(")) {
                var atom_value = atoms_list[k].substring(atoms_list[k].indexOf("(") + 1, atoms_list[k].lastIndexOf(")"));
                //console.log(atom);
                var atom_values_tuple = atom_value.split(",");
                rows_list.push(Number(atom_values_tuple[0]));
                columns_list.push(Number(atom_values_tuple[1]));
                atoms_splitted_matrix.push(atom_values_tuple);
            }
        }
        return true;
    };
    /**
     * It takes a 2D array of strings and a string as input, and returns a string that contains an HTML
     * table, this method is responsible to create the table for each mapped atom
     * @param {string[][]} matrix - the matrix to be converted to html
     * @param {string} cell_name - The name of the cell you want to map.
     * @returns A string that contains the HTML code for a table.
     */
    MatrixImagesCreator.prototype.create_table_html = function (matrix, cell_name) {
        if (matrix == undefined || matrix.length == 0)
            return "";
        if (cell_name == undefined || cell_name == "")
            return "";
        var html_table = "<table><thead><tr class=\"titolo\"><th>Visualization</th></tr></thead><tbody>";
        html_table += "";
        for (var i = 0; i < matrix.length; i++) {
            html_table += "<tr>";
            for (var j = 0; j < matrix[i].length; j++) {
                if (matrix[i][j] != "undefined") {
                    this.almost_one_image_printed = true;
                    if (this.config_file.useImages) {
                        if (fs.existsSync(this.images_directory_path + matrix[i][j])) {
                            var image = fs.readFileSync(this.images_directory_path + matrix[i][j]);
                            var base64Image = new Buffer.from(image).toString("base64");
                            var dataURI = "data:image/jpeg;base64," + base64Image;
                            html_table +=
                                "<td><img src=\"" +
                                    dataURI +
                                    "\" style='height: 60px; width: 60px; object-fit: fill;'></img></td>";
                        }
                    }
                    else {
                        html_table += "<td><div style='height: 60px; width: 60px; background-color:".concat(matrix[i][j], "; border: 1px solid #307182'></img></td>");
                    }
                }
            }
            html_table += "</tr>";
        }
        html_table += "</tbody></table>";
        if (!this.almost_one_image_printed)
            html_table +=
                "<strong>There aren not atoms with values you mapped as images</strong>";
        return html_table;
    };
    MatrixImagesCreator.prototype.create_base64_image = function (file_name) {
        var image = fs.readFileSync(this.images_directory_path + file_name);
        var base64Image = new Buffer.from(image).toString("base64");
        var dataURI = "data:image/jpeg;base64," + base64Image;
        return dataURI;
    };
    MatrixImagesCreator.prototype.almost_one_printed = function () {
        return this.almost_one_image_printed;
    };
    /**
     * The function takes the answer sets from the ASP solver and creates a matrix from the atoms in the
     * answer set
     * @param {any} answer_sets - the answer sets of the ASP program
     * @returns the number of answer sets to convert to images.
     */
    MatrixImagesCreator.prototype.run_script = function (answer_sets) {
        return __awaiter(this, void 0, void 0, function () {
            var mapping_list, max_num_of_as_to_convert, i, self;
            return __generator(this, function (_a) {
                mapping_list = this.config_file.cell;
                max_num_of_as_to_convert = this.maxNumOfAnswerSetToConvert();
                console.log("Your configuration: ");
                console.log("Mapped atoms: " + mapping_list);
                console.log("Maximum number answer set to convert in image: " +
                    max_num_of_as_to_convert);
                i = 0;
                self = this;
                answer_sets.forEach(function (value) {
                    if (i >= max_num_of_as_to_convert)
                        return;
                    self.create_matrix_from_atoms_list(value.as, mapping_list, i);
                    i++;
                });
                return [2 /*return*/];
            });
        });
    };
    MatrixImagesCreator.prototype.setup_and_run_script = function (config_file, images_directory, answer_set, output_directory) {
        this.config_file = config_file;
        this.images_directory_path = images_directory;
        this.output_dir = output_directory;
        console.log(images_directory);
        if (fs.existsSync(this.images_directory_path)) {
            this.run_script(answer_set);
        }
        else {
            console.log("The image directory does not exists, please check the path");
        }
    };
    return MatrixImagesCreator;
}());
exports.MatrixImagesCreator = MatrixImagesCreator;
if (require.main === module) {
    var script = new MatrixImagesCreator();
    var config_file = JSON.parse(fs.readFileSync('./src/config_matrix_images.json'));
    var answer_set_json = JSON.parse(fs.readFileSync('./src/answers_sets_matrix_images.json'));
    var img_dir = './src/matrix_images/';
    var output = './src/output_files/';
    script.setup_and_run_script(config_file, img_dir, answer_set_json, output);
}
/*
td img{
            background-image: url(${this.create_base64_image('floor.png')});
            background-size: contain;
        }
        backup code
*/
