import * as vscode from "vscode";
import { render } from "./renderer";
const fs = require("fs");

export class TableCreator {
  answer_sets = require("./answers_sets.json");
  config_file = require("./config_table.json");
  table = require("table");
  undefined_error_string: string = "this data cannot be undefined";
  style = this.get_config_style();
  base_styling = this.get_base_styling();
  output_dir: string = "";

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

  async run_script(answer_sets: any) {
    let mapping_list: string[] = this.config_file.cell;
    let max_num_of_as_to_convert: number = this.maxNumOfAnswerSetToConvert();

    let i: number = 0;
    let self = this;
    answer_sets.forEach(function (value: { as: string[] }) {
      if (i >= max_num_of_as_to_convert) {
        return;
      }
      self.create_table_from_atoms_list(value.as, mapping_list, i);
      i++;
    });
  }

  create_table_from_atoms_list(
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
      "table",
      index,
      html_to_convert_in_image,
      process.env.CHROME_PATH
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

  get_html_style() {
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
        font-family: Arial;
    }
    strong{
        color: ` +
      this.base_styling.html_text_color +
      `;
        font-size: 20px;
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
        text-align:center;
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
    .fieldStyle{
        background-color: ${this.style.header_color};
        color: #ffffff;
        
        font-size: ${this.style.header_font_size};
        font-family: ${this.style.header_font_family};
        font-weight: bold;
        font-style: italic;
        text-align: center;
    }
    

    .titolo{
        display: flex;
        justify-content: space-around;
        align-items: center;
    }
</style>`
    );
  }

  create_html_table_for_mapped_atom(
    atoms_list: string[],
    mapped_atom: string,
    table_html: string
  ): string {
    let atoms_splitted_array: Array<Array<string>> = new Array();
    if (
      this.retrieve_answer_set_as_tuple_array(
        atoms_list,
        atoms_splitted_array,
        mapped_atom
      )
    ) {
      if (atoms_splitted_array.length > 0) {
        table_html += this.create_table_html(atoms_splitted_array, mapped_atom);
      } else {
        table_html +=
          "<strong>No value found in answer set for: " +
          mapped_atom +
          "</strong><br>";
      }
    } else {
      table_html =
        "<strong>Problem in table creating, make sure data is correct (check the answer set)</strong>";
    }

    return table_html;
  }

  create_table_html(atoms_splitted_array: string[][], mapped_atom: string) {
    if (
      atoms_splitted_array === undefined ||
      atoms_splitted_array.length === 0
    ) {
      return "";
    }
    if (mapped_atom === undefined || mapped_atom === "") {
      return "";
    }

    let html_table: string =
      `<table><thead><tr class="titolo"><th>Answer set</th><th>Mapped value: ` +
      mapped_atom +
      `</th></tr></thead><tbody><tr>`;

    for (var k: number = 0; k < atoms_splitted_array[0].length; k++) {
      if (this.config_file.table_field_mapping[k.toString()] === undefined) {
        html_table += "<td class=fieldStyle>Field " + k + "</td>";
      } else {
        html_table +=
          "<td class=fieldStyle>" +
          this.config_file.table_field_mapping[k] +
          "</td>";
      }
    }
    html_table += "</tr>";
    for (var i: number = 0; i < atoms_splitted_array.length; i++) {
      html_table += "<tr>";
      for (var j = 0; j < atoms_splitted_array[i].length; j++) {
        //html_table+="<td>"+j+ "</td>";
        html_table += "<td>" + atoms_splitted_array[i][j] + "</td>";
      }
      html_table += "</tr>";
    }

    html_table += "</tbody></table>";

    return html_table;
  }

  retrieve_answer_set_as_tuple_array(
    atoms_list: string[],
    atoms_splitted_array: string[][],
    mapped_atom: string
  ): boolean {
    /* Checking if the input is valid. */
    if (atoms_list === undefined) {
      return false;
    }
    if (atoms_splitted_array === undefined) {
      return false;
    }
    if (mapped_atom === undefined) {
      return false;
    }
    for (let k: number = 0; k < atoms_list.length; k++) {
      if (atoms_list[k].includes(mapped_atom + "(")) {
        let atom_value: string = atoms_list[k].substring(
          atoms_list[k].indexOf("(") + 1,
          atoms_list[k].lastIndexOf(")")
        );

        let atom_values_tuple: string[] = atom_value.split(",");

        atoms_splitted_array.push(atom_values_tuple);
      }
    }
    return true;
  }

  maxNumOfAnswerSetToConvert(): number {
    return this.config_file.maxNumOfAnswerSetToConvert;
  }

  setup_and_run_script(
    config_file: JSON,
    answer_set: JSON,
    output_directory: string
  ) {
    this.config_file = config_file;
    this.output_dir = output_directory;
    this.style = this.get_config_style();
    this.base_styling = this.get_base_styling();
    this.run_script(answer_set);
  }
}

if (require.main === module) {
  let script = new TableCreator();

  let config_file: JSON = JSON.parse(
    fs.readFileSync("./src/config_table.json")
  );
  let answer_set_json: JSON = JSON.parse(
    fs.readFileSync("./src/answers_sets.json")
  );
  let output = "./src/output_files/";
  script.setup_and_run_script(config_file, answer_set_json, output);
}
