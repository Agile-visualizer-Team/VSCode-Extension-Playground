import { render_gif } from "./renderer";
import * as vscode from "vscode";
const path = require("path");
const fs = require("fs");

export class MatrixImagesCreatorGIF {
  answer_sets = require("./answers_sets_matrix_images.json");
  config_file = require("./config_matrix_images.json");
  style = this.get_config_style();
  base_styling = this.get_base_styling();

  table = require("table");
  undefined_error_string: string = "this data cannot be undefined";
  images_directory_path: string = "";
  almost_one_image_printed: boolean = false;
  output_dir: string = "";
  time_array: Array<string> = [];

  create_html_table_for_mapped_atom(
    atoms_list: string[],
    mapped_atom: string,
    table_html: string,
    time: string
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
        mapped_atom,
        time
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
    for (var i = 0; i < this.time_array.length; i++) {
      let table_html: string = "";
      let self = this;

      mapping_list.forEach(function (mapped_atom) {
        table_html = self.create_html_table_for_mapped_atom(
          atoms_list,
          mapped_atom,
          table_html,
          self.time_array[i]
        );
      });
      let html_to_convert_in_image =
        this.create_html_to_convert_in_image(table_html);
      this.create_image_from_html(
        index,
        Number(this.time_array[i]),
        html_to_convert_in_image
      );
    }
  }

  create_image_from_html(
    as: number,
    index: number,
    html_to_convert_in_image: string
  ) {
    if (!fs.existsSync(path.join(this.output_dir, "gif"))) {
      fs.mkdirSync(path.join(this.output_dir, "gif"), { recursive: true });
    }
    render_gif(
      this.output_dir,
      as,
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
          matrix[i][j] = "undefined";
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
            padding: 0;
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
            background-color: ${this.base_styling.table_background_color};
        }
        tbody{
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            gap:0;
            margin: 1em;
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

    const self = this;
    atoms_splitted_matrix.forEach(function (atom) {
      if (atom.length === 4) {
        let row: number = Number(atom[0]);
        let column: number = Number(atom[1]);
        if (self.config_file.useImages) {
          if (
            self.config_file.images_binding[atom[2].toString()] !== undefined
          ) {
            matrix[row][column] =
              self.config_file.images_binding[atom[2].toString()];
          }
        } else {
          if (self.config_file.colors_binding[atom[2]] !== undefined) {
            matrix[row][column] = self.config_file.colors_binding[atom[2]];
          }
        }
      }
    });
    return true;
  }

  retrieve_matrix_cell_as_tuple(
    atoms_list: string[],
    rows_list: number[],
    columns_list: number[],
    atoms_splitted_matrix: string[][],
    cell_name: string,
    time: string
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
        let atom_values_tuple: string[] = this.tuple_of_values_from_atom(
          atoms_list,
          k
        );
        if (atom_values_tuple[3] === time) {
          rows_list.push(Number(atom_values_tuple[0]));
          columns_list.push(Number(atom_values_tuple[1]));
          atoms_splitted_matrix.push(atom_values_tuple);
        }
      }
    }

    return true;
  }

  tuple_of_values_from_atom(atoms_list: string[], k: number) {
    let atom_value: string = atoms_list[k].substring(
      atoms_list[k].indexOf("(") + 1,
      atoms_list[k].lastIndexOf(")")
    );

    let atom_values_tuple: string[] = atom_value.split(",");

    return atom_values_tuple;
  }

  create_table_html(matrix: string[][], cell_name: string): string {
    if (matrix === undefined || matrix.length === 0) {
      return "";
    }
    if (cell_name === undefined || cell_name === "") {
      return "";
    }
    let is_valid_image_directory: boolean = true;
    let html_table: string = `<table><thead><tr class="titolo"><th>Visualization</th></tr></thead><tbody>`;

    html_table += "";
    for (var i: number = 0; i < matrix.length; i++) {
      html_table += "<tr>";
      for (var j = 0; j < matrix[i].length; j++) {
        if (matrix[i][j] !== "undefined") {
          this.almost_one_image_printed = true;
          if (this.config_file.useImages) {
            if (fs.existsSync(this.images_directory_path)) {
              if (
                fs.existsSync(path.join(this.images_directory_path, matrix[i][j]))
              ) {
                const image = fs.readFileSync(
                  path.join(this.images_directory_path, matrix[i][j])
                );

                const base64Image: any = new (Buffer as any).from(image).toString(
                  "base64"
                );
                const dataURI = "data:image/jpeg;base64," + base64Image;

                html_table +=
                  `<td><img src="` +
                  dataURI +
                  `" style='height: 60px; width: 60px; object-fit: fill;'></img></td>`;
              }
            } else {
              is_valid_image_directory = false;
            }

          } else {
            html_table += `<td><div style='height: 60px; width: 60px; background-color:${matrix[i][j]}; border: 1px solid #307182'></img></td>`;
          }
        }
      }
      html_table += "</tr>";
    }

    html_table += "</tbody></table>";
    if (!this.almost_one_image_printed) {
      html_table +=
        "<strong>There aren not atoms with values you mapped as images</strong>";
    }
    if (!is_valid_image_directory) {
      html_table += `<strong> If you want to use images in visuaization you have to choose a valid image directory <strong>`;
    }
    return html_table;
  }

  create_base64_image(file_name: string): string {
    const image = fs.readFileSync(this.images_directory_path + file_name);
    const base64Image: any = new (Buffer as any).from(image).toString("base64");
    const dataURI = "data:image/jpeg;base64," + base64Image;
    return dataURI;
  }

  almost_one_printed(): boolean {
    return this.almost_one_image_printed;
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
      self.fill_time_array(value.as);
      self.create_matrix_from_atoms_list(value.as, mapping_list, i);
      i++;
    });
  }
  fill_time_array(as: string[]) {
    this.time_array.splice(0);
    for (let k: number = 0; k < as.length; k++) {
      let atom_tuple = this.tuple_of_values_from_atom(as, k);
      this.time_array.indexOf(atom_tuple[3]) === -1
        ? this.time_array.push(atom_tuple[3])
        : "";
    }
  }

  setup_and_run_script(
    config_file: JSON,
    images_directory: string,
    answer_set: JSON,
    output_directory: string
  ) {
    this.config_file = config_file;
    this.images_directory_path = images_directory;
    this.output_dir = output_directory;
    this.style = this.get_config_style();
    this.base_styling = this.get_base_styling();

    if (!fs.existsSync(this.images_directory_path) && this.config_file.useImages) {
      vscode.window.showErrorMessage(
        "The image directory does not exists, please check the path"
      );    } 
      else{
        this.run_script(answer_set);
      }

  }
}

if (require.main === module) {
  let script = new MatrixImagesCreatorGIF();
  let config_file: JSON = JSON.parse(
    fs.readFileSync("./src/config_matrix_images.json")
  );
  let answer_set_json: JSON = JSON.parse(
    fs.readFileSync("./src/answers_sets_matrix_images_gif.json")
  );
  let img_dir = "./src/matrix_images/";
  let output = "./src/output_files/";

  script.setup_and_run_script(config_file, img_dir, answer_set_json, output);
}
