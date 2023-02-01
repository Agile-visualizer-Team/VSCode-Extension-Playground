import { render } from "./renderer";
import * as vscode from "vscode";
const fs = require("fs");

export class MatrixCreator {
  answer_sets = require("./answers_sets.json");

  config_file = require("./config_matrix.json");
  style = this.get_config_style();
  base_styling = this.get_base_styling();

  table = require("table");
  undefined_error_string: string = "this data cannot be undefined";
  output_dir: string = "";

  create_html_table_for_mapped_atom(
    atoms_list: string[],
    mapped_atom: string,
    table_html: string
  ): string {
    let rows_list: Array<number> = new Array();
    let columns_list: Array<number> = new Array();
    let atoms_splitted_array: Array<Array<string>> = new Array();
    if (
      this.retrieve_matrix_cell_as_tuple(
        atoms_list,
        rows_list,
        columns_list,
        atoms_splitted_array,
        mapped_atom
      )
    ) {
      if (rows_list.length !== 0 && columns_list.length !== 0) {
        let matrix: Array<Array<string>> = new Array();
        matrix = this.init_matrix_rows_and_columns(
          matrix,
          rows_list,
          columns_list
        );
        this.fill_matrix_with_values(atoms_splitted_array, matrix);
        table_html += this.create_table_html(matrix, mapped_atom);
      } else {
        table_html +=
          "<strong>No value found in answer set for: " +
          mapped_atom +
          "</strong><br>";
      }
    } else {
      table_html =
        "<strong>Problem in matrix creating, make sure data is correct</strong>";
    }

    return table_html;
  }

  maxNumOfAnswerSetToConvert(): number {
    return this.config_file.maxNumOfAnswerSetToConvert;
  }

  create_matrix_from_atoms_list(
    atoms_list: string[],
    mapping_list: string[],
    index: number
  ) {
    let table_html: string = "";
    let self = this;
    mapping_list.forEach(function (mapped_atom) {
      table_html = self.create_html_table_for_mapped_atom(
        atoms_list,
        mapped_atom,
        table_html
      );
    });
    let html_to_convert_in_image =
      this.create_html_to_convert_in_image(table_html);

    this.create_image_from_html(index, html_to_convert_in_image);
  }

  create_image_from_html(index: number, html_to_convert_in_image: string) {
    if (!fs.existsSync(this.output_dir)) {
      fs.mkdirSync(this.output_dir, { recursive: true });
    }

    render(
      this.output_dir,
      "matrix",
      index,
      html_to_convert_in_image,
      process.env.CHROME_PATH
    );
  }

  init_matrix_rows_and_columns(
    matrix: string[][],
    rows_list: number[],
    columns_list: number[]
  ) {
    if (rows_list === undefined) {
      throw new Error(this.undefined_error_string + " rows_list");
    }
    if (columns_list === undefined) {
      throw new Error(this.undefined_error_string + " columns_list");
    }

    if (rows_list.length !== 0 && columns_list.length !== 0) {
      matrix = new Array(Math.max.apply(null, rows_list) + 1);
      for (var i = 0; i < matrix.length; i++) {
        matrix[i] = new Array(Math.max.apply(null, columns_list) + 1);
        for (var j = 0; j < Math.max.apply(null, columns_list) + 1; j++) {
          matrix[i][j] = "Not defined";
        }
      }
    }

    return matrix;
  }

  get_config_style() {
    return this.config_file.style;
  }

  get_base_styling() {
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
        : "1px solid #878787",
    };
  }

  get_html_style(): string {
    return (
      `
        <style>
        html{
            background-color: ` +
      this.base_styling.html_background_color +
      `;
            color: ` +
      this.base_styling.html_text_color +
      `;
            font-family: ` +
      this.style.header_font_family +
      `;
        }
        strong{
            color: ` +
      this.base_styling.html_text_color +
      `;
            font-size: ` +
      this.style.header_font_size +
      `px;
        }
        body {
            background-color: ` +
      this.base_styling.html_background_color +
      `;
            color: ` +
      this.base_styling.html_text_color +
      `;
            margin: 1em;
            display: flex;
            justify-content: space-evenly;
            align-items: center;
            gap: 20px;
            padding:1em;
            flex-direction: column;
            margin: 1em;
            padding-top: 1em;
            height: -webkit-fill-available;
            height: auto;
        }
        td {
            padding: 12px 15px;
        }
        thead{
            background-color: ${this.style.header_color};
            color: #ffffff;
            width: 100%;
            font-size: ${this.style.header_font_size};
            font-family: ${this.style.header_font_family};
            font-weight: ${this.style.header_font_weight};
            text-align: center;
            display: table-caption;
        }
        tbody tr {
            border-bottom: ${this.base_styling.table_bottom_border};
            background-color: ${this.base_styling.table_background_color};
        }
        table {
            border-collapse: collapse;
            margin: 1em;
            width: 100%;
            font-size: 0.9em;
            font-family: sans-serif;
            min-width: 400px;
            box-shadow: 0px 10px 15px -5px ${this.base_styling.table_shadow_color};
            color: ${this.base_styling.table_text_color};
        }
        

        .titolo{
            display: flex;
            justify-content: space-around;
            align-items: center;
        }
    </style>`
    );
  }

  create_html_to_convert_in_image(table_html: string): string {
    if (table_html === undefined) {
      return "";
    }
    let html =
      `<html>
            <head>
                ${this.get_html_style()}
            </head>
            <body>` +
      table_html +
      `</body>
        </html>`;
    //Using this for debugging and testing
    return html;
  }

  fill_matrix_with_values(
    atoms_splitted_matrix: string[][],
    matrix: string[][]
  ): boolean {
    if (atoms_splitted_matrix === undefined) {
      return false;
    }
    if (atoms_splitted_matrix.length === 0) {
      return false;
    }
    if (matrix === undefined) {
      return false;
    }

    atoms_splitted_matrix.forEach(function (atom) {
      if (atom.length === 3) {
        let row: number = Number(atom[0]);
        let column: number = Number(atom[1]);
        matrix[row][column] = atom[2];
      }
    });
    return true;
  }

  retrieve_matrix_cell_as_tuple(
    atoms_list: string[],
    rows_list: number[],
    columns_list: number[],
    atoms_splitted_matrix: string[][],
    cell_name: string
  ): boolean {
    /* Checking if the input is valid. */
    if (atoms_list === undefined) {
      return false;
    }
    if (rows_list === undefined || rows_list.length !== 0) {
      return false;
    }
    if (columns_list === undefined || columns_list.length !== 0) {
      return false;
    }
    if (atoms_splitted_matrix === undefined) {
      return false;
    }
    if (atoms_splitted_matrix.length !== 0) {
      return false;
    }

    for (let k: number = 0; k < atoms_list.length; k++) {
      if (atoms_list[k].includes(cell_name + "(")) {
        let atom_value: string = atoms_list[k].substring(
          atoms_list[k].indexOf("(") + 1,
          atoms_list[k].lastIndexOf(")")
        );

        let atom_values_tuple: string[] = atom_value.split(",");

        rows_list.push(Number(atom_values_tuple[0]));
        columns_list.push(Number(atom_values_tuple[1]));
        atoms_splitted_matrix.push(atom_values_tuple);
      }
    }

    return true;
  }

  create_table_html(matrix: string[][], cell_name: string): string {
    if (matrix === undefined || matrix.length === 0) {
      return "";
    }
    if (cell_name === undefined || cell_name === "") {
      return "";
    }

    let html_table: string =
      `<table><thead><tr class="titolo"><th>Answer set</th><th>Mapped value: ` +
      cell_name +
      `</th></tr></thead><tbody><tr><td></td>`;

    for (var k: number = 0; k < matrix[0].length; k++) {
      html_table += "<td>" + k + "</td>";
    }
    html_table += "</tr>";
    for (var i: number = 0; i < matrix.length; i++) {
      html_table += "<tr>";
      html_table += "<td>" + i + "</td>";
      for (var j = 0; j < matrix[i].length; j++) {
        //html_table+="<td>"+j+ "</td>";
        html_table += "<td>" + matrix[i][j] + "</td>";
      }
      html_table += "</tr>";
    }

    html_table += "</tbody></table>";

    return html_table;
  }

  async run_script(answer_sets: any) {
    let mapping_list: string[] = this.config_file.cell;
    let max_num_of_as_to_convert: number = this.maxNumOfAnswerSetToConvert();

    let i: number = 0;
    let self = this;
    answer_sets.forEach(function (value: { as: string[] }) {
      if (i >= max_num_of_as_to_convert) {
        return;
      }
      self.create_matrix_from_atoms_list(value.as, mapping_list, i);
      i++;
    });
  }

  setup_and_run_script(
    config_file: JSON,
    answer_set: JSON,
    output_directory: string
  ) {
    this.output_dir = output_directory;
    this.config_file = config_file;
    this.style = this.get_config_style();
    this.base_styling = this.get_base_styling();
    this.run_script(answer_set);
  }
}

if (require.main === module) {
  let script = new MatrixCreator();

  let config_file: JSON = JSON.parse(
    fs.readFileSync("./src/config_matrix.json")
  );
  let answer_set_json: JSON = JSON.parse(
    fs.readFileSync("./src/answers_sets.json")
  );
  let output = "./src/output_files/";

  script.setup_and_run_script(config_file, answer_set_json, output);
}
