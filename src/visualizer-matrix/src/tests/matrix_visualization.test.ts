import { expect } from "chai";
import "mocha";
import sinon from "sinon";
import { MatrixCreator } from "../matrix_visualization";

let matrix_creator: MatrixCreator = new MatrixCreator();

const answer_sets:JSON = JSON.parse(`[
    {
        "as" : [  "cell(0,1,peppe)",  "cell2(0,0,cell21) ", "cell2(0,1,cell22)" ],
        "cost" : "1@2"
    },
    {
        "as" : [ "cell(0,0,ciao) ", "cell(0,1,ciao)", "cell(0,2,ciao)",  "cell(1,0,ciao1) ", "cell(1,1,ciao12)", "cell(1,2,ciao)"  ],
        "cost" : "1@2"
    },
    {
        "as" : [ "cell3(0,0,ciao) ", "cell3(0,1,peppe)",  "cell3(0,0,cell21) ", "cell3(0,1,cell22)" ],
        "cost" : "1@2"
    }
]`);
describe('[matrix] create_table_html method tests', () => { // the tests container

    beforeEach(() => {
        // runs before each test in this block
        matrix_creator = new MatrixCreator();
    });

    it('create_table_html must create a right html table when we pass a list of right formed atoms', () => { // the single test

        //given a matrix  
        let matrix: string[][] = [['pos00', 'pos01'], ['pos10', 'pos11']];
        //given a mapped atom 'cell'
        let mapped_atom: string = 'cell';
        let expected_value: string = `<table><thead><tr class="titolo"><th>Answer set</th><th>Mapped value: cell</th></tr></thead><tbody><tr><td></td><td>0</td><td>1</td></tr><tr><td>0</td><td>pos00</td><td>pos01</td></tr><tr><td>1</td><td>pos10</td><td>pos11</td></tr></tbody></table>`;
        //when we call the function create_table_html
        let result = matrix_creator.create_table_html(matrix, mapped_atom);
        //then we expect the result to be equal to the expected value
        expect(result).to.eql(expected_value);

    });
    it('create_table_html must create an empty html table when we pass a list of length 0', () => { // the single test

        //given a matrix of 0 elements 
        let matrix: string[][] = [[]];
        //given a mapped atom 'cell'
        let mapped_atom: string = 'cell';
        let expected_value: string = `<table><thead><tr class="titolo"><th>Answer set</th><th>Mapped value: cell</th></tr></thead><tbody><tr><td></td></tr><tr><td>0</td></tr></tbody></table>`;
        //when we call the function create_table_html
        let result = matrix_creator.create_table_html(matrix, mapped_atom);
        //then we expect the result to be equal to the expected value
        expect(result).to.eql(expected_value);

    });

    it('create_table_html must not create an html table when we pass a matrix with undefined internal rows', () => { // the single test

        //given a matrix of 0 elements 
        let matrix: string[][] = [];
        //given a mapped atom 'cell'
        let mapped_atom: string = 'cell';
        let expected_value: string = '';
        //when we call the function create_table_html
        let result = matrix_creator.create_table_html(matrix, mapped_atom);
        //then we expect the result to be equal to the expected value
        expect(result).to.eql(expected_value);

    });

    it('create_table_html must not create an html table when we pass an empty mapped atom', () => { // the single test

        //given a matrix of 0 rows 
        let matrix: string[][] = [[]];
        //given a mapped atom 'cell'
        let mapped_atom: string = '';
        let expected_value: string = '';
        //when we call the function create_table_html
        let result = matrix_creator.create_table_html(matrix, mapped_atom);
        //then we expect the result to be equal to the expected value
        expect(result).to.eql(expected_value);

    });

});

describe('[matrix] retrieve_matrix_cell_as_tuple method tests', () => { // the tests container

    it('retrieve_matrix_cell_as_tuple must return true if atoms_list has the atoms the user wants to map', () => { // the single test

        //given an empty atom list   
        let atom_list: string[] = ['cell(0,0,ciao)', 'cell(0,1,ciao)'];
        //given an empty rows list   
        let rows_list: number[] = [];
        //given an empty columns list   
        let columns_list: number[] = [];
        //given a mapped atom 'cell'
        let mapped_atom: string = 'cell';

        //given an a splitted atoms matrix with no rows  
        let atoms_splitted_matrix: string[][] = [];

        let expected_value: boolean = true;
        //when we call the function retrieve_matrix_cell_as_tuple
        let result = matrix_creator.retrieve_matrix_cell_as_tuple(atom_list, rows_list, columns_list, atoms_splitted_matrix, mapped_atom);
        //then we expect the result to be equal to the expected value
        expect(result).to.eql(expected_value);

    });
    it('retrieve_matrix_cell_as_tuple must modify rows and columns lists if atom list has the atoms the user wants to map', () => { // the single test

        //given an empty atom list   
        let atom_list: string[] = ['cell(0,0,ciao)', 'cell(0,1,ciao)'];
        //given an empty rows list   
        let rows_list: number[] = [];
        //given an empty columns list   
        let columns_list: number[] = [];
        //given a mapped atom 'cell'
        let mapped_atom: string = 'cell';

        //given an a splitted atoms matrix with no rows  
        let atoms_splitted_array: string[][] = [];

        let expected_value: boolean = true;
        //when we call the function retrieve_matrix_cell_as_tuple
        let result = matrix_creator.retrieve_matrix_cell_as_tuple(atom_list, rows_list, columns_list, atoms_splitted_array, mapped_atom);
        //then we expect the result to be equal to the expected value
        expect(rows_list.length).to.eql(2);
        expect(columns_list.length).to.eql(2);


        expect(columns_list[0]).to.eql(0);
        expect(columns_list[1]).to.eql(1);


        expect(rows_list[0]).to.eql(0);
        expect(rows_list[1]).to.eql(0);




    });

    it('retrieve_matrix_cell_as_tuple must add atoms as list of tree string in atoms_splitted_matrix if all is correct', () => { // the single test

        //given an empty atom list   
        let atom_list: string[] = ['cell(0,0,ciao)', 'cell(0,1,ciao2)'];
        //given an empty rows list   
        let rows_list: number[] = [];
        //given an empty columns list   
        let columns_list: number[] = [];
        //given a mapped atom 'cell'
        let mapped_atom: string = 'cell';

        //given an a splitted atoms matrix with no rows  
        let atoms_splitted_matrix: string[][] = [];

        let expected_value: boolean = true;
        //when we call the function retrieve_matrix_cell_as_tuple
        let result = matrix_creator.retrieve_matrix_cell_as_tuple(atom_list, rows_list, columns_list, atoms_splitted_matrix, mapped_atom);
        //then we expect the result to be equal to the expected value
        expect(atoms_splitted_matrix[0]).to.eql(['0', '0', 'ciao']);
        expect(atoms_splitted_matrix[1]).to.eql(['0', '1', 'ciao2']);

    });

    it('retrieve_matrix_cell_as_tuple must return true if all is correct but the mapped atom is not present', () => { // the single test

        //given an empty atom list   
        let atom_list: string[] = ['cell(0,0,ciao)', 'cell(0,1,ciao2)'];
        //given an empty rows list   
        let rows_list: number[] = [];
        //given an empty columns list   
        let columns_list: number[] = [];
        //given a mapped atom 'cell'
        let mapped_atom: string = 'cell1';

        //given an a splitted atoms matrix with no rows  
        let atoms_splitted_matrix: string[][] = [];

        let expected_value: boolean = true;
        //when we call the function retrieve_matrix_cell_as_tuple
        let result = matrix_creator.retrieve_matrix_cell_as_tuple(atom_list, rows_list, columns_list, atoms_splitted_matrix, mapped_atom);
        //then we expect the result to be equal to the expected value
        expect(result).to.eql(expected_value);

    });
    it('retrieve_matrix_cell_as_tuple must not modify rows, columns arrays and splitted atoms matrix  if all is correct but the mapped atom is not present', () => { // the single test

        //given an empty atom list   
        let atom_list: string[] = ['cell(0,0,ciao)', 'cell(0,1,ciao2)'];
        //given an empty rows list   
        let rows_list: number[] = [];
        //given an empty columns list   
        let columns_list: number[] = [];
        //given a mapped atom 'cell'
        let mapped_atom: string = 'cell1';

        //given an a splitted atoms matrix with no rows  
        let atoms_splitted_matrix: string[][] = [];

        let expected_value: boolean = true;
        //when we call the function retrieve_matrix_cell_as_tuple
        let result = matrix_creator.retrieve_matrix_cell_as_tuple(atom_list, rows_list, columns_list, atoms_splitted_matrix, mapped_atom);
        //then we expect the result to be equal to the expected value
        expect(rows_list.length).to.eql(0);
        expect(columns_list.length).to.eql(0);
        expect(atoms_splitted_matrix.length).to.eql(0);

    });

    it('retrieve_matrix_cell_as_tuple must return false if initial rows list is not empty', () => { // the single test

        //given an empty atom list   
        let atom_list: string[] = ['cell(0,0,ciao)', 'cell(0,1,ciao2)'];
        //given an empty rows list   
        let rows_list: number[] = [0];
        //given an empty columns list   
        let columns_list: number[] = [];
        //given a mapped atom 'cell'
        let mapped_atom: string = 'cell1';

        //given an a splitted atoms matrix with no rows  
        let atoms_splitted_matrix: string[][] = [];

        let expected_value: boolean = false;
        //when we call the function retrieve_matrix_cell_as_tuple
        let result = matrix_creator.retrieve_matrix_cell_as_tuple(atom_list, rows_list, columns_list, atoms_splitted_matrix, mapped_atom);
        //then we expect the result to be equal to the expected value
        expect(result).to.eql(expected_value);


    });
    it('retrieve_matrix_cell_as_tuple must return false if initial columns list is not empty', () => { // the single test

        //given an empty atom list   
        let atom_list: string[] = ['cell(0,0,ciao)', 'cell(0,1,ciao2)'];
        //given an empty rows list   
        let rows_list: number[] = [];
        //given an empty columns list   
        let columns_list: number[] = [1];
        //given a mapped atom 'cell'
        let mapped_atom: string = 'cell';

        //given an a splitted atoms matrix with no rows  
        let atoms_splitted_matrix: string[][] = [];

        let expected_value: boolean = false;
        //when we call the function retrieve_matrix_cell_as_tuple
        let result = matrix_creator.retrieve_matrix_cell_as_tuple(atom_list, rows_list, columns_list, atoms_splitted_matrix, mapped_atom);
        //then we expect the result to be equal to the expected value
        expect(result).to.eql(expected_value);


    });
    it('retrieve_matrix_cell_as_tuple must return false if initial atoms_splitted_matrix list is not empty', () => { // the single test

        //given an empty atom list   
        let atom_list: string[] = ['cell(0,0,ciao)', 'cell(0,1,ciao2)'];
        //given an empty rows list   
        let rows_list: number[] = [];
        //given an empty columns list   
        let columns_list: number[] = [1];
        //given a mapped atom 'cell'
        let mapped_atom: string = 'cell';

        //given an a splitted atoms matrix with no rows  
        let atoms_splitted_matrix: string[][] = [];

        let expected_value: boolean = false;
        //when we call the function retrieve_matrix_cell_as_tuple
        let result = matrix_creator.retrieve_matrix_cell_as_tuple(atom_list, rows_list, columns_list, atoms_splitted_matrix, mapped_atom);
        //then we expect the result to be equal to the expected value
        expect(result).to.eql(expected_value);

    });


});



describe('[matrix] fill_matrix_with_values method tests', () => { // the tests container

    it('fill_matrix_with_values must return false if atoms_splitted_matrix is empty', () => { // the single test

        //given an a splitted atoms matrix with no rows  
        let atoms_splitted_matrix: string[][] = [];
        //given an a matrix to fill 
        let matrix: string[][] = [[]]

        let expected_value: boolean = false;
        //when we call the function fill_matrix_with_values
        let result = matrix_creator.fill_matrix_with_values(atoms_splitted_matrix, matrix);
        //then we expect the result to be equal to the expected value
        expect(result).to.eql(expected_value);

    });


    it('fill_matrix_with_values must return true if all is ok', () => { // the single test

        //given an a splitted atoms matrix with no rows  
        let atoms_splitted_matrix: string[][] = [['0', '0', 'ciao']];
        //given an a matrix with the correct sizes to fill 
        let matrix: string[][] = [['Not defined']]

        let expected_value: boolean = true;
        //when we call the function fill_matrix_with_values
        let result = matrix_creator.fill_matrix_with_values(atoms_splitted_matrix, matrix);
        //then we expect the result to be equal to the expected value
        expect(result).to.eql(expected_value);

    });

    it('fill_matrix_with_values must modify the correct cells of the matrix if all is correct', () => { // the single test

        //given an a splitted atoms matrix with no rows  
        let atoms_splitted_matrix: string[][] = [['0', '0', 'ciao']];
        //given an a matrix with the correct sizes to fill 
        let matrix: string[][] = [['Not defined']]

        let expected_value: string = 'ciao';
        //when we call the function fill_matrix_with_values
        let result = matrix_creator.fill_matrix_with_values(atoms_splitted_matrix, matrix);
        //then we expect the result to be equal to the expected value
        expect(matrix[0][0]).to.eql(expected_value);

    });

    it('fill_matrix_with_values must not modify the cells not present in the splitted atoms matrix of the matrix', () => { // the single test

        //given an a splitted atoms matrix with no rows  
        let atoms_splitted_matrix: string[][] = [['0', '0', 'ciao']];
        //given an a matrix with the correct sizes to fill 
        let matrix: string[][] = [['Not defined', 'Not defined']];

        let expected_value: string = 'ciao';
        //when we call the function fill_matrix_with_values
        let result = matrix_creator.fill_matrix_with_values(atoms_splitted_matrix, matrix);
        //then we expect the result to be equal to the expected value
        expect(matrix[0][0]).to.eql(expected_value);
        expect(matrix[0][1]).to.eql('Not defined');

    });

    it('fill_matrix_with_values must not modify the cells if the splitted atoms items are not well formed', () => { // the single test

        //given an a splitted atoms matrix with no rows  
        let atoms_splitted_matrix: string[][] = [['0', '0']];
        //given an a matrix with the correct sizes to fill 
        let matrix: string[][] = [['Not defined', 'Not defined']];

        let expected_value: string = 'ciao';
        //when we call the function fill_matrix_with_values
        let result = matrix_creator.fill_matrix_with_values(atoms_splitted_matrix, matrix);
        //then we expect the result to be equal to the expected value
        expect(matrix[0][0]).to.eql('Not defined');
        expect(matrix[0][1]).to.eql('Not defined');

    });
});



describe('[matrix] create_html_to_convert_in_image method tests', () => { // the tests container

    it('create_html_to_convert_in_image have to return the right string when is called', () => { // the single test



        let expected_value: string = '<body>string</body>';
        //when we call the function create_html_to_convert_in_image
        let result: string = matrix_creator.create_html_to_convert_in_image('string');
        //then we expect the result to be equal to the expected value
        expect(result.includes(expected_value)).to.eql(true);

    });


});



describe('[matrix] init_matrix_rows_and_columns method tests', () => { // the tests container

    it('init_matrix_rows_and_columns could create a matrix with right number of rows', () => { // the single test
        let columns_list: number[] = [0];
        let rows_list: number[] = [0, 1, 0];

        let result_matrix: string[][] = [];
        let expected_value: number = 2;
        //when we call the function init_matrix_rows_and_columns
        result_matrix = matrix_creator.init_matrix_rows_and_columns(result_matrix, rows_list, columns_list);


        //then we expect the result to be equal to the expected value
        expect(result_matrix.length).to.eql(expected_value);

    });

    it('init_matrix_rows_and_columns could create a matrix with right number of columns', () => { // the single test
        let columns_list: number[] = [3, 3];
        let rows_list: number[] = [0, 1, 0];

        let result_matrix: string[][] = [];
        let expected_value: number = 4;
        //when we call the function init_matrix_rows_and_columns
        result_matrix = matrix_creator.init_matrix_rows_and_columns(result_matrix, rows_list, columns_list);


        //then we expect the result to be equal to the expected value
        expect(result_matrix[0].length).to.eql(expected_value);

    });

    it('init_matrix_rows_and_columns with an empty rows_list must not modify the matrix', () => { // the single test
        let columns_list: number[] = [3, 3];
        let rows_list: number[] = [];

        let result_matrix: string[][] = [];
        let expected_value: number = 0;
        //when we call the function init_matrix_rows_and_columns
        result_matrix = matrix_creator.init_matrix_rows_and_columns(result_matrix, rows_list, columns_list);


        //then we expect the result to be equal to the expected value
        expect(result_matrix.length).to.eql(expected_value);

    });
    it('init_matrix_rows_and_columns with an empty columns_list must not modify the matrix', () => { // the single test
        let columns_list: number[] = [];
        let rows_list: number[] = [0, 0, 1];

        let result_matrix: string[][] = [];
        let expected_value: number = 0;
        //when we call the function init_matrix_rows_and_columns
        result_matrix = matrix_creator.init_matrix_rows_and_columns(result_matrix, rows_list, columns_list);


        //then we expect the result to be equal to the expected value
        expect(result_matrix.length).to.eql(expected_value);

    });

    it('init_matrix_rows_and_columns could create a matrix with all cells setted to "Not defined"', () => { // the single test
        let columns_list: number[] = [0, 0, 1, 2, 0, 3];
        let rows_list: number[] = [2, 0, 1];

        let columns: number = 4;
        let rows: number = 3;


        let result_matrix: string[][] = [];
        let expected_value: string = 'Not defined';
        //when we call the function init_matrix_rows_and_columns
        result_matrix = matrix_creator.init_matrix_rows_and_columns(result_matrix, rows_list, columns_list);
        for (var i: number = 0; i < rows; i++) {
            for (var j: number = 0; j < columns; j++) {
                //then we expect the result to be equal to the expected value
                expect(result_matrix[i][j]).to.eql(expected_value);
            }

        }



    });




});


describe('[matrix] create_html_table_for_mapped_atom method tests', () => { // the tests container

    it('create_html_table_for_mapped_atom has to return a specific string internal method retrieve_matrix_cell_as_tuple returns false', () => { // the single test

        let atoms_list: string[] = [];


        let mapped_atom: string = 'cell';
        let table_html: string = '';
        let expected_value: string = '<strong>Problem in matrix creating, make sure data is correct</strong>';

        let stub_function = sinon.stub(matrix_creator, 'retrieve_matrix_cell_as_tuple').returns(false);
        //when we call the function init_matrix_rows_and_columns
        let result_string = matrix_creator.create_html_table_for_mapped_atom(atoms_list, mapped_atom, table_html);


        //then we expect the result to be equal to the expected value
        expect(result_string).to.eql(expected_value);
        stub_function.restore();

    });

    it('create_html_table_for_mapped_atom has to return a specific string if all is correct', () => { // the single test

        let atoms_list: string[] = ['cell(0,0,ciao)'];


        let mapped_atom: string = 'cell';
        let table_html: string = '';
        let expected_value: string = `<table><thead><tr class="titolo"><th>Answer set</th><th>Mapped value: cell</th></tr></thead><tbody><tr><td></td><td>0</td></tr><tr><td>0</td><td>ciao</td></tr></tbody></table>`;
        //when we call the function init_matrix_rows_and_columns
        let result_string = matrix_creator.create_html_table_for_mapped_atom(atoms_list, mapped_atom, table_html);


        //then we expect the result to be equal to the expected value
        expect(result_string).to.eql(expected_value);

    });

    it('create_html_table_for_mapped_atom has to return a specific string if there aren t atoms equals to the mapped one', () => { // the single test

        let atoms_list: string[] = ['cell(0,0,ciao)'];


        let mapped_atom: string = 'cell1';
        let table_html: string = '';
        let expected_value: string = '<strong>No value found in answer set for: ' + mapped_atom + '</strong><br>';
        //when we call the function init_matrix_rows_and_columns
        let result_string = matrix_creator.create_html_table_for_mapped_atom(atoms_list, mapped_atom, table_html);


        //then we expect the result to be equal to the expected value
        expect(result_string).to.eql(expected_value);

    });
});



describe('[matrix] create_matrix_from_atoms_list method tests', () => { // the tests container

    it('create_matrix_from_atoms_list has to call create_html_table_for_mapped_atom not more \
    time than the length of the mapping list', () => { // the single test

    let mapping_list: string[] = ['cell', 'cell2'];
    let as: string[]=[]

    const mock_matrix_creator = sinon.mock(matrix_creator);
    mock_matrix_creator.expects('create_html_table_for_mapped_atom').exactly(2);
    sinon.stub(matrix_creator, 'create_image_from_html').returns(true);

    matrix_creator.create_matrix_from_atoms_list(as, mapping_list, 0);
    mock_matrix_creator.verify();
    
    mock_matrix_creator.restore();
    });

    
});


describe('[matrix] maxNumOfAnswerSetToConvert method tests', () => { // the tests container

    it('maxNumOfAnswerSetToConvert has return the right value', () => { // the single test
    sinon.stub(matrix_creator.config_file, 'maxNumOfAnswerSetToConvert').value(2);
    let result:number = matrix_creator.maxNumOfAnswerSetToConvert()
    
    expect(result).to.eql(2);

    sinon.restore()
    
    });

    
});

describe('[matrix] run_script method tests', () => { // the tests container

    it('run_scripts has to call create_matrix_from_atoms_list not more \
        time than the maximum number of as to convert', () => { // the single test

        sinon.stub(matrix_creator, 'maxNumOfAnswerSetToConvert').returns(2);
        const mock_matrix_creator = sinon.mock(matrix_creator);
        mock_matrix_creator.expects('create_matrix_from_atoms_list').exactly(2);
        matrix_creator.run_script(answer_sets);
        mock_matrix_creator.verify();
    });

    let testCalled = [
        {
            config_value: 2,
        },
        {
            config_value: 4,
        },
        {
            config_value: 5,
        },
        {
            config_value: 100,
        },
    ];
    //test for all the possible values of maxNumOfAnswerSetToConvert
    testCalled.forEach((test) => {
        it('run_script has to call create_matrix_from_atoms_list the correct amount of times', () => {
            sinon.stub(matrix_creator, 'maxNumOfAnswerSetToConvert').returns(test.config_value);
            const mock_matrix_creator = sinon.mock(matrix_creator);
            mock_matrix_creator.expects('create_matrix_from_atoms_list').exactly(test.config_value);
            matrix_creator.run_script(answer_sets).then(() => {
                mock_matrix_creator.verify();
            });
        });
    })

    //test dark mode
    it('Dark mode colors must be setted if dark mode is enabled', () => {
        //mock style with dark mode true
        sinon.stub(matrix_creator, 'get_config_style').returns({ dark_mode: true });
        //I need to reassign because when the object is created the method is alredy been called.
        //So, in order to give the correct value, I need to assign again.
        matrix_creator.style = matrix_creator.get_config_style();
        matrix_creator.base_styling = matrix_creator.get_base_styling();        
        let expected_value = 'html{background-color: #101010;color: #e1e1e1;'.trim().replace(/\s+/g, '');
        let result = matrix_creator.get_html_style().trim().replace(/\s/g, '');
        expect(result).to.include(expected_value);
    });

    it('Dark mode colors must not be setted if dark mode is disabled', () => {
        //mock style with dark mode false
        sinon.stub(matrix_creator, 'get_config_style').returns({ dark_mode: false });
        //I need to reassign because when the object is created the method is alredy been called.
        //So, in order to give the correct value, I need to assign again.
        matrix_creator.style = matrix_creator.get_config_style();
        matrix_creator.base_styling = matrix_creator.get_base_styling(); 
        let expected_value = 'html{background-color: #ebebeb;color: #000000;'.trim().replace(/\s+/g, '');
        let result = matrix_creator.get_html_style().trim().replace(/\s/g, '');
        expect(result).to.include(expected_value);
    });

    afterEach(() => {
        //Needed in order to restore the stub and the methods that have been mocked
        sinon.restore();
    });

});