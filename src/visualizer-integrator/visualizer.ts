import * as vscode from "vscode";
const fs = require("fs");
const path = require("path");
import { run_solver } from "../wrapper-dlv/dlv_wrapper";
import { TableCreator } from "../visualizer-matrix/src/table_visualization";
import { MatrixImagesCreator } from "../visualizer-matrix/src/matrix_images_visualization";
import { MatrixCreator } from "../visualizer-matrix/src/matrix_visualization";
import { MatrixImagesCreatorGIF } from "../visualizer-matrix/src/matrix_images_gif_visualization";
import { renderGraph } from "../visualizer-graph/src/script";

export function callNode(
  template_file_path: string,
  asp_file_path: string,
  dlv_path: string,
  as_number: number,
  out_dir: string,
  image_directory: string
) {
  // vscode.window.showInformationMessage("Running solver");
  let solver_result: any = run_solver(dlv_path, asp_file_path, "", as_number);
  let template_file = JSON.parse(fs.readFileSync(template_file_path, "utf8"));

  const visualization_type: string = template_file.template;
  // vscode.window.showInformationMessage(
  //   `Requested visualization: ${template_file.template}`
  // );

  switch (visualization_type) {
    case "graph":
      renderGraph(template_file, solver_result, out_dir);
      break;

    case "matrix":
      new MatrixCreator().setup_and_run_script(
        template_file,
        JSON.parse(solver_result),
        out_dir
      );
      break;

    case "table":
      new TableCreator().setup_and_run_script(
        template_file,
        JSON.parse(solver_result),
        out_dir
      );
      break;

    case "matrix_images":
      new MatrixImagesCreator().setup_and_run_script(
        template_file,
        image_directory,
        JSON.parse(solver_result),
        out_dir
      );
      break;

    case "gif":
      new MatrixImagesCreatorGIF().setup_and_run_script(
        template_file,
        image_directory,
        JSON.parse(solver_result),
        out_dir
      );
      break;

    default:
      console.error(`Template unknown: ${template_file.template}`);
      break;
  }
}

if (require.main === module) {
  //Calling matrix; callNode('/home/simone/Desktop/agile_stuff/matrix/config_matrix.json', '/home/simone/Desktop/agile_stuff/matrix/matrix.asp', '/home/simone/Desktop/agile_stuff/dlv', 1, '/home/simone/Desktop/agile_stuff/graph_output', undefined)
  //Calling matrix-images: callNode('/home/simone/Desktop/agile_stuff/matrix/config_matrix_images.json', '/home/simone/Desktop/agile_stuff/matrix/matrix_images.asp', '/home/simone/Desktop/agile_stuff/dlv', 1, '/home/simone/Desktop/agile_stuff/graph_output', '/home/simone/Desktop/agile_stuff/matrix/matrix_images/')
  //Calling table // callNode(
  //   "/home/simone/Desktop/agile_stuff/matrix/config_table.json",
  //   "/home/simone/Desktop/agile_stuff/matrix/matrix.asp",
  //   "/home/simone/Desktop/agile_stuff/dlv",
  //   1,
  //   "/home/simone/Desktop/agile_stuff/graph_output",
  //   undefined
  // );
  //Calling graph
  // callNode(
  //   path.resolve(
  //     "D:\\",
  //     "AlexFazio64",
  //     "Dev",
  //     "js",
  //     "VSCode-Extension-Playground",
  //     "src",
  //     "sample-files",
  //     "images.json"
  //   ),
  //   path.resolve(
  //     "D:\\",
  //     "AlexFazio64",
  //     "Dev",
  //     "js",
  //     "VSCode-Extension-Playground",
  //     "src",
  //     "sample-files",
  //     "images.asp"
  //   ),
  //   path.resolve(
  //     "D:\\",
  //     "AlexFazio64",
  //     "Dev",
  //     "js",
  //     "VSCode-Extension-Playground",
  //     "src",
  //     "sample-files",
  //     "dlv2_win.exe"
  //   ),
  //   1,
  //   path.resolve(
  //     "D:\\",
  //     "AlexFazio64",
  //     "Dev",
  //     "js",
  //     "VSCode-Extension-Playground",
  //     "src",
  //     "sample-files",
  //     "output"
  //   ),
  //   path.resolve(
  //     "D:\\",
  //     "AlexFazio64",
  //     "Dev",
  //     "js",
  //     "VSCode-Extension-Playground",
  //     "src",
  //     "sample-files",
  //     "images"
  //   )
  // );
}
