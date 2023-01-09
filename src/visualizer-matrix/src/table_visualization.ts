import * as yargs from "yargs";
const readline = require("readline");
const path = require("path");
const fs = require("fs");

export class TableCreator {
  answer_sets = require("./answers_sets.json");
  config_file = require("./config_table.json");
  table = require("table");
  node_html_to_image = require("node-html-to-image");
  undefined_error_string: string = "this data cannot be undefined";
  style = this.get_config_style();
  base_styling = this.get_base_styling();
  output_dir: string = "";

  /**
   * The function returns the value of the style property of the config_file object
   * @returns The style property of the config_file object.
   */
  get_config_style() {
    return this.config_file.style;
  }

  /**
   * It returns an object with the same keys as the object that is passed to it, but with the values
   * of the keys being the values of the keys in the object that is passed to it.
   * @returns An object with the properties html_background_color, html_text_color,
   * table_background_color, table_shadow_color, table_text_color, and table_bottom_border.
   */
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

  /**
   * It takes the answer sets and the configuration file and creates the tables
   * @param {any} answer_sets - the list of answer sets returned by the solver
   * @returns the number of answer sets to convert in image.
   */
  async run_script(answer_sets: any) {
    let mapping_list: string[] = this.config_file.cell;
    let max_num_of_as_to_convert: number = this.maxNumOfAnswerSetToConvert();

    console.log("Your configuration: ");
    console.log("Mapped atoms: " + mapping_list);
    console.log(
      "Maximum number answer set to convert in image: " +
        max_num_of_as_to_convert
    );

    let i: number = 0;
    let self = this;
    answer_sets.forEach(function (value: { as: string[] }) {
      if (i >= max_num_of_as_to_convert) return;
      self.create_table_from_atoms_list(value.as, mapping_list, i);
      i++;
    });
  }
  /**
   * It takes a list of atoms, a list of mappings, and an index, and creates an image from the html
   * table that is created from the atoms and mappings
   * @param {string[]} atoms_list - the list of atoms that will be used to create the table
   * @param {string[]} mapping_list - this is the list of atoms that you want to map.
   * @param {number} index - the index of the current table
   */
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
  /**
   * It takes an index and an html string, and then it creates an image from the html string and
   * saves it to the file system
   * @param {number} index - the index of the answer set
   * @param {string} html_to_convert_in_image - This is the HTML that you want to convert into an
   * image.
   * @returns false.
   */
  create_image_from_html(index: number, html_to_convert_in_image: string) {
    try {
      if (!fs.existsSync(this.output_dir)) {
        fs.mkdirSync(this.output_dir, { recursive: true });
      }
      this.node_html_to_image({
        output: path.join(
          this.output_dir,
          "table_" + index + "_" + Date.now() + ".png"
        ),
        html: html_to_convert_in_image,
        puppeteerArgs: { executablePath: process.env.CHROME_PATH},
      }).then(() => {
        return true;
      });
    } catch (e) {
      return false;
    }

    return false;
  }

  /**
   * It takes a string of HTML and returns a string of HTML that includes the HTML that was passed
   * in, plus some additional HTML that is needed to make the HTML look good when it is converted to
   * an image
   * @param {string} table_html - The HTML of the table you want to convert to an image.
   * @returns The html string is being returned.
   */
  create_html_to_convert_in_image(table_html: string): string {
    if (table_html === undefined) return "";
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
    fs.writeFileSync("./preview_table.html", html);
    return html;
  }
  /**
   * It returns a string containing the HTML code for the style of the page
   * @returns The HTML style for the table.
   */
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

  /**
   * It takes an array of strings, a string, and a string, and returns a string
   * @param {string[]} atoms_list - string[] - the list of atoms from the answer set
   * @param {string} mapped_atom - the atom that is being mapped to the table
   * @param {string} table_html - the html string that will be returned
   * @returns a string that contains the html code for the table.
   */
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

  /**
   * It takes an array of arrays of strings and a string, and returns a string
   * @param {string[][]} atoms_splitted_array - the array of arrays containing the atoms of the answer
   * set
   * @param {string} mapped_atom - the atom that is mapped to the table
   * @returns a string that contains the HTML code of the table.
   */
  create_table_html(atoms_splitted_array: string[][], mapped_atom: string) {
    if (atoms_splitted_array == undefined || atoms_splitted_array.length == 0)
      return "";
    if (mapped_atom == undefined || mapped_atom == "") return "";

    let html_table: string =
      `<table><thead><tr class="titolo"><th>Answer set</th><th>Mapped value: ` +
      mapped_atom +
      `</th></tr></thead><tbody><tr>`;

    for (var k: number = 0; k < atoms_splitted_array[0].length; k++) {
      if (this.config_file.table_field_mapping[k.toString()] == undefined)
        html_table += "<td class=fieldStyle>Field " + k + "</td>";
      else
        html_table +=
          "<td class=fieldStyle>" +
          this.config_file.table_field_mapping[k] +
          "</td>";
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

  /**
   * This function retrieves the answer set of a given atom and returns it as a tuple array
   * @param {string[]} atoms_list - This is the list of atoms that are returned by the answer set
   * solver.
   * @param {string[][]} atoms_splitted_array - This is the array that will contain the answer set.
   * @param {string} mapped_atom - The atom that you want to retrieve.
   * @returns a boolean value.
   */
  retrieve_answer_set_as_tuple_array(
    atoms_list: string[],
    atoms_splitted_array: string[][],
    mapped_atom: string
  ): boolean {
    /* Checking if the input is valid. */
    if (atoms_list == undefined) return false;
    if (atoms_splitted_array == undefined) return false;
    if (mapped_atom == undefined) return false;
    for (let k: number = 0; k < atoms_list.length; k++) {
      if (atoms_list[k].includes(mapped_atom + "(")) {
        let atom_value: string = atoms_list[k].substring(
          atoms_list[k].indexOf("(") + 1,
          atoms_list[k].lastIndexOf(")")
        );

        //console.log(atom);
        let atom_values_tuple: string[] = atom_value.split(",");

        atoms_splitted_array.push(atom_values_tuple);
      }
    }
    return true;
  }

  /**
   * It returns the maximum number of answer sets to convert.
   * @returns The maximum number of answer sets to convert.
   */
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
    this.run_script(answer_set);
  }
}

/* Creating a new instance of the TableCreator class and then calling the read_commands_and_run()
method on it. */

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
