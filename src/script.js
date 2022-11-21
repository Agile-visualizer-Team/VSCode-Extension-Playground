"use strict";
exports.__esModule = true;
exports.MatrixCreator = void 0;
var MatrixCreator = /** @class */ (function () {
    function MatrixCreator() {
        this.answer_sets = require('./answers_sets.json');
        this.config_file = require('./config.json');
        this.fs = require('fs');
        this.table = require('table');
        this.node_html_to_image = require('node-html-to-image');
        this.undefined_error_string = 'this data cannot be undefined';
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
    MatrixCreator.prototype.create_html_table_for_mapped_atom = function (atoms_list, mapped_atom, table_html) {
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
                table_html += '<strong>No value found in answer set for: ' + mapped_atom + '</strong><br>';
            }
        }
        else {
            table_html = "<strong>Problem in matrix creating, make sure data is correct</strong>";
        }
        return table_html;
    };
    /**
     * It takes a list of atoms, a list of mapped atoms, and an index, and creates an image from the html
     * table that it creates
     * @param {string[]} atoms_list - list of atoms
     * @param {string[]} mapping_list - the list of atoms that are mapped to the current atom
     * @param {number} index - the index of the matrix in the list of matrices
     */
    MatrixCreator.prototype.create_matrix_from_atoms_list = function (atoms_list, mapping_list, index) {
        var table_html = '';
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
    MatrixCreator.prototype.create_image_from_html = function (index, html_to_convert_in_image) {
        this.node_html_to_image({
            output: './answer_set_matrix_' + index + '.png',
            html: html_to_convert_in_image
        })
            .then(function () {
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
    MatrixCreator.prototype.init_matrix_rows_and_columns = function (matrix, rows_list, columns_list) {
        if (rows_list == undefined)
            throw new Error(this.undefined_error_string + ' rows_list');
        if (columns_list == undefined)
            throw new Error(this.undefined_error_string + ' columns_list');
        if (rows_list.length != 0 && columns_list.length != 0) {
            matrix = new Array(Math.max.apply(null, rows_list) + 1);
            for (var i = 0; i < matrix.length; i++) {
                matrix[i] = new Array(Math.max.apply(null, columns_list) + 1);
                for (var j = 0; j < Math.max.apply(null, columns_list) + 1; j++) {
                    matrix[i][j] = "Not defined";
                }
            }
        }
        return matrix;
    };
    /**
     * It takes the HTML of the table a the entire HTML (with the style we choose) of the page which
     * will be converted into an image
     * @param {string} table_html - The HTML of the table you want to convert to an image.
     * @param {number} index - The index of the table in the HTML file.
     * @returns the html that will be converted into an image.
     */
    MatrixCreator.prototype.create_html_to_convert_in_image = function (table_html) {
        if (table_html === undefined)
            return '';
        var html = "<html>\n    <head>\n    <style>\n      td {\n        padding: 12px 15px;\n      }\n      thead{\n        background-color: #b41b22;\n        color: #ffffff;\n        width: 100%;\n        text-align: center;\n        display: table-caption;\n      }\n      tbody tr {\n        border-bottom: 1px solid #dddddd;\n      }\n      table {\n        border-collapse: collapse;\n        margin: auto;\n        font-size: 0.9em;\n        font-family: sans-serif;\n        min-width: 400px;\n        box-shadow: 0 0 20px rgba(0, 0, 0, 0.15);\n      }\n      body {\n        margin: 1em;\n        display: flex;\n        justify-content: center;\n        align-items: center;\n        gap: 20px;\n        flex-direction: column;\n        margin: 1em;\n        padding-top: 1em;\n      }\n\n      .titolo{\n        display: flex;\n        justify-content: space-around;\n        align-items: center;\n      }\n    </style>\n      \n    </head>\n    <body>" + table_html + "</body>\n  </html>\n  ";
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
    MatrixCreator.prototype.fill_matrix_with_values = function (atoms_splitted_matrix, matrix) {
        if (atoms_splitted_matrix === undefined)
            return false;
        if (atoms_splitted_matrix.length === 0)
            return false;
        if (matrix === undefined)
            return false;
        atoms_splitted_matrix.forEach(function (atom) {
            if (atom.length == 3) {
                var row = Number(atom[0]);
                var column = Number(atom[1]);
                matrix[row][column] = atom[2];
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
    MatrixCreator.prototype.retrieve_matrix_cell_as_tuple = function (atoms_list, rows_list, columns_list, atoms_splitted_matrix, cell_name) {
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
            if (atoms_list[k].includes(cell_name + '(')) {
                var atom_value = atoms_list[k].substring(atoms_list[k].indexOf("(") + 1, atoms_list[k].lastIndexOf(")"));
                //console.log(atom);
                var atom_values_tuple = atom_value.split(',');
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
    MatrixCreator.prototype.create_table_html = function (matrix, cell_name) {
        if (matrix == undefined || matrix.length == 0)
            return '';
        if (cell_name == undefined || cell_name == '')
            return '';
        var html_table = "<table><thead><tr class=\"titolo\"><th>Answer set</th><th>Mapped value: " + cell_name + "</th></tr></thead><tbody><tr><td></td>";
        for (var k = 0; k < matrix[0].length; k++) {
            html_table += "<td>" + k + "</td>";
        }
        html_table += '</tr>';
        for (var i = 0; i < matrix.length; i++) {
            html_table += "<tr>";
            html_table += "<td>" + i + "</td>";
            for (var j = 0; j < matrix[i].length; j++) {
                //html_table+="<td>"+j+ "</td>";
                html_table += "<td>" + matrix[i][j] + "</td>";
            }
            html_table += "</tr>";
        }
        html_table += '</tbody></table>';
        return html_table;
    };
    /**
     * It takes the list of atoms from each answer set and creates a matrix from it
     */
    MatrixCreator.prototype.run_script = function () {
        var mapping_list = this.config_file.cell;
        var i = 0;
        var self = this;
        this.answer_sets.forEach(function (value) {
            self.create_matrix_from_atoms_list(value.as, mapping_list, i);
            i++;
        });
    };
    return MatrixCreator;
}());
exports.MatrixCreator = MatrixCreator;
var script = new MatrixCreator();
script.run_script();
