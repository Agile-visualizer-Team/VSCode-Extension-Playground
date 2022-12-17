import { run_solver } from "../wrapper-dlv/dlv_wrapper";
// import { GraphScript } from "../visualizer-graph/src/script"; //currently doesn't export an API
// import { MatrixCreator } from "../visualizer-matrix/src/matrix_visualization"; //currently doesn't export an API
// import { TableCreator } from "../visualizer-matrix/src/table_visualization"; //currently doesn't export an API

export function callNode(
  template_file_path: string,
  asp_file_path: string,
  dlv_path: string,
  as_number: number,
  out_dir: string
) {
  let solver_result = run_solver(dlv_path, asp_file_path, undefined, as_number);

  console.log(solver_result)

  const visualization_type: string = "graph"; // read from template file...

  switch (visualization_type) {
    case "graph":
      // Call graph visualizer using module import
      break;

    case "tree":
      // Call tree visualizer using module import
      break;

    case "matrix":
      // Call matrix visualizer using module import
      break;

    default:
  }
}

if (require.main === module) {
  callNode(undefined, '/home/simone/Desktop/3col_1.asp', '/home/simone/Desktop/dlv', 1, undefined)
}


