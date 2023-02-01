import { execSync } from "child_process";
import { writeFile } from "fs";

export class DLVWrapper {
  run_dlv(dlv_path: string, asp_file: string, as_num: number) {
    return "" + execSync(`"${dlv_path}" -n ${as_num} "${asp_file}"`);
  }

  parse_dlv_as(dlv_output: string) {
    let splitted_output = dlv_output.split("\n");
    let result_object: { [id: string]: any } = {
      as: [],
      cost: "",
    };
    splitted_output.forEach((line) => {
      let answer_set_match = line.match(/\{.*\}/);
      let answer_set_cost_match = line.match(/COST .*/);
      //if answer_set_match is null (no matched string) the ?. syntax returns undefined instead of throwing an error
      // It's usefull because we don't have to esplicitly check if there is a match in that line or not
      answer_set_match?.forEach((answer_set) => {
        result_object["as"] = answer_set.replace(/\{|\}/g, "").split(/,\s/g);
      });
      answer_set_cost_match?.forEach((answer_set_cost) => {
        result_object["cost"] = answer_set_cost.substring(5);
      });
    });
    return result_object;
  }

  write_parsed_as_to_file(output_file: string, parsed_output: object) {
    writeFile(
      output_file,
      JSON.stringify(parsed_output),
      "utf8",
      function (err) {
        if (err) {
          console.log("An error occured while writing JSON Object to File.");
        } else {
          console.log("JSON file has been saved.");
        }
      }
    );
  }

  execute(argv: any) {
    let res = this.run_dlv(argv.dlv_path, argv.asp_file, argv.as_number);
    let split_multiple_as = res.split(/(?<=COST \d+@\d+)/);
    let final_array: any = [];
    if (split_multiple_as.length === 1) {
      final_array = split_multiple_as[0].split(/\n{1}/);
    } else {
      final_array = [split_multiple_as[0]].concat(
        split_multiple_as[1].split("\n")
      );
      final_array.splice(2, 1);
    }
    let forDeletion = ["", "OPTIMUM", "DLV 2.1.1", "DLV 2.1.1\r", "\r"];
    let final_output: any = [];
    final_array = final_array.filter(
      (item: string) => !forDeletion.includes(item)
    );
    final_array.forEach((element: string) => {
      let parsed_as = this.parse_dlv_as(element);
      final_output.push(parsed_as);
    });
    if (argv.output) {
      this.write_parsed_as_to_file(argv.output, final_output);
    } else {
      return JSON.stringify(final_output);
    }
  }
}

export function run_solver(
  _dlv_path: string,
  _asp_file: string,
  _output: string,
  _as_number: number
) {
  let argv = {
    dlv_path: _dlv_path,
    asp_file: _asp_file,
    output: _output,
    as_number: _as_number,
  };
  return new DLVWrapper().execute(argv);
}
