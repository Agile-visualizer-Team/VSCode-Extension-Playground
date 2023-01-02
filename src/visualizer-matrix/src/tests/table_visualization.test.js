//import  {TableCreator}  from "../table_visualization";
import { expect } from "chai";
import "mocha";
import sinon from "sinon";
import { TableCreator } from "../table_visualization";
let table_creator = new TableCreator();
const answer_sets = JSON.parse(`[
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
describe("[table] TableCreator", () => {
    beforeEach(() => {
        table_creator = new TableCreator();
    });
    afterEach(() => {
        //Needed in order to restore the stub and the methods that have been mocked
        sinon.restore();
    });
    it("run_scripts has to call create_table_from_atoms_list not more \
        time than the maximum number of as to convert in this case 1", () => {
        // the single test
        const mock_table_creator = sinon.mock(table_creator);
        const methos_mocked = sinon
            .stub(table_creator, 'maxNumOfAnswerSetToConvert')
            .returns(1);
        const create_image_mock = sinon
            .stub(table_creator, "create_image_from_html")
            .returns(true);
        mock_table_creator.expects("create_table_from_atoms_list").exactly(1);
        table_creator.run_script(answer_sets);
        mock_table_creator.verify();
        mock_table_creator.restore();
        methos_mocked.restore();
    });
    it("run_scripts has to call create_table_from_atoms_list not more \
        time than the maximum number of as to convert in this case 2", () => {
        // the single test
        const mock_table_creator = sinon.mock(table_creator);
        let method = sinon
            .stub(table_creator, "maxNumOfAnswerSetToConvert")
            .returns(3);
        mock_table_creator.expects("create_table_from_atoms_list").exactly(3);
        const create_image_mock = sinon
            .stub(table_creator, "create_image_from_html")
            .returns(true);
        table_creator.run_script(answer_sets);
        mock_table_creator.verify();
        mock_table_creator.restore();
        method.restore();
    });
    let testForCalls = [
        {
            config_value: 0,
        },
        {
            config_value: 2,
        },
        {
            config_value: 4,
        },
        {
            config_value: 10,
        },
    ];
    testForCalls.forEach((test) => {
        it("run_script has to call create_table_from_atoms_list the correct amount of times \
        based on the number of config", () => {
            sinon
                .stub(table_creator, "maxNumOfAnswerSetToConvert")
                .returns(test.config_value);
            const mock_matrix_creator = sinon.mock(table_creator);
            const create_image_mock = sinon
                .stub(table_creator, "create_image_from_html")
                .returns(true);
            mock_matrix_creator
                .expects("create_table_from_atoms_list")
                .exactly(test.config_value);
            table_creator.run_script(answer_sets).then(() => {
                mock_matrix_creator.verify();
            });
        });
    });
    it("create_table_from_atoms_list has to call create_html_table_for_mapped_atom not more \
    time than the length of the mapping list", () => {
        // the single test
        let mapping_list = ["cell", "cell2"];
        let as = [];
        const mock_table_creator = sinon.mock(table_creator);
        mock_table_creator.expects("create_html_table_for_mapped_atom").exactly(2);
        const create_image_mock = sinon
            .stub(table_creator, "create_image_from_html")
            .returns(true);
        table_creator.create_table_from_atoms_list(as, mapping_list, 0);
        mock_table_creator.verify();
        mock_table_creator.restore();
    });
});
describe("[table] retrieve_answer_set_as_tuple_array method tests", () => {
    beforeEach(() => {
        table_creator = new TableCreator();
    });
    it("retrieve_answer_set_as_tuple_array has to return the right array if the answer set contains the \
    mapped values", () => {
        // the single test
        let mapped_atom = "cell";
        let as = ["cell(1,2,ciao)", "cell(0,0,hello)"];
        let atoms_splitted_array = [];
        let obtained_value = table_creator.retrieve_answer_set_as_tuple_array(as, atoms_splitted_array, mapped_atom);
        let expected_result = true;
        let expected_0_array = ["1", "2", "ciao"];
        let expected_1_array = ["0", "0", "hello"];
        expect(obtained_value).to.eql(expected_result);
        expect(atoms_splitted_array[0]).to.eql(expected_0_array);
        expect(atoms_splitted_array[1]).to.eql(expected_1_array);
    });
});
describe("[table] create_html_table_for_mapped_atom method tests", () => {
    beforeEach(() => {
        table_creator = new TableCreator();
    });
    afterEach(() => {
        //Needed in order to restore the stub and the methods that have been mocked
        sinon.restore();
    });
    it("create_html_table_for_mapped_atom has to return <strong>Problem in table creating, make sure data is correct (check the answer set)</strong> \
    if the internal method retrieve_answer_set_as_tuple_array returns false", () => {
        // the single test
        let mapped_atom = "cell";
        let as = [];
        let atoms_splitted_array = [];
        let table_html = "";
        sinon
            .stub(table_creator, "retrieve_answer_set_as_tuple_array")
            .returns(false);
        let obtained_value = table_creator.create_html_table_for_mapped_atom(as, mapped_atom, table_html);
        let expected_table_html = "<strong>Problem in table creating, make sure data is correct (check the answer set)</strong>";
        expect(obtained_value).to.eql(expected_table_html);
    });
    it("create_html_table_for_mapped_atom has to return <strong>No value found in answer set for:  mapped_atom </strong><br> \
    if the internal method retrieve_answer_set_as_tuple_array returns true but the array is empty", () => {
        // the single test
        let mapped_atom = "cell";
        let as = [];
        let atoms_splitted_array = [];
        let table_html = "";
        sinon
            .stub(table_creator, "retrieve_answer_set_as_tuple_array")
            .returns(true);
        let obtained_value = table_creator.create_html_table_for_mapped_atom(as, mapped_atom, table_html);
        let expected_table_html = "<strong>No value found in answer set for: " +
            mapped_atom +
            "</strong><br>";
        expect(obtained_value).to.eql(expected_table_html);
    });
    it("create_html_table_for_mapped_atom has call create_table_html if  \
    if the internal method retrieve_answer_set_as_tuple_array returns true and the arrays length is more than 0", () => {
        // the single test
        let mapped_atom = "cell";
        let as = ["cell(1,2,ciao)"];
        let atoms_splitted_array = [];
        let table_html = "";
        const mock_table_creator = sinon.mock(table_creator);
        mock_table_creator.expects("create_table_html").exactly(1);
        table_creator.create_html_table_for_mapped_atom(as, mapped_atom, table_html);
        mock_table_creator.verify();
        mock_table_creator.restore();
    });
});
describe("[table] create_table_html method tests", () => {
    beforeEach(() => {
        table_creator = new TableCreator();
    });
    afterEach(() => {
        //Needed in order to restore the stub and the methods that have been mocked
        sinon.restore();
    });
    it("create_table_html returns an empty string if atoms_splitted_array is empty", () => {
        // the single test
        let mapped_atom = "cell";
        let atoms_splitted_array = [];
        let obtained_table_html = table_creator.create_table_html(atoms_splitted_array, mapped_atom);
        let expected_table_html = "";
        expect(obtained_table_html).to.eql(expected_table_html);
    });
    it("create_table_html returns an empty string if mapped_atom is empty", () => {
        // the single test
        let mapped_atom = "";
        let atoms_splitted_array = [["1", "2", "ciao"]];
        let obtained_table_html = table_creator.create_table_html(atoms_splitted_array, mapped_atom);
        let expected_table_html = "";
        expect(obtained_table_html).to.eql(expected_table_html);
    });
    it("create_table_html returns a table if atoms_splitted_array contains the mapped atoms", () => {
        // the single test
        let mapped_atom = "cell";
        let atoms_splitted_array = [
            ["1", "2", "ciao"],
            ["2", "2", "ciao2"],
        ];
        let obtained_table_html = table_creator.create_table_html(atoms_splitted_array, mapped_atom);
        let expected_table_html = '<table><thead><tr class="titolo"><th>Answer set</th><th>Mapped value: cell</th></tr></thead><tbody><tr><td class=fieldStyle>row to map</td><td class=fieldStyle>column</td><td class=fieldStyle>Value</td></tr><tr><td>1</td><td>2</td><td>ciao</td></tr><tr><td>2</td><td>2</td><td>ciao2</td></tr></tbody></table>';
        expect(obtained_table_html).to.eql(expected_table_html);
    });
});
describe("[table] create_table_html method tests", () => {
    beforeEach(() => {
        table_creator = new TableCreator();
    });
    afterEach(() => {
        //Needed in order to restore the stub and the methods that have been mocked
        sinon.restore();
    });
    it("create_html_to_convert_in_image returns the right string when we pass every table html ", () => {
        // the single test
        let table_html = "table_value";
        let obtained_table_html = table_creator
            .create_html_to_convert_in_image(table_html)
            .replace(/\s/g, "");
        let expected_table_html = table_html;
        expect(obtained_table_html).to.contain(expected_table_html);
    });
    //test dark mode
    it("Dark mode colors must be setted if dark mode is enabled", () => {
        //mock style with dark mode true
        sinon.stub(table_creator, "get_config_style").returns({ dark_mode: true });
        //I need to reassign because when the object is created the method is alredy been called.
        //So, in order to give the correct value, I need to assign again.
        table_creator.style = table_creator.get_config_style();
        table_creator.base_styling = table_creator.get_base_styling();
        let expected_value = "html{background-color: #101010;color: #e1e1e1;"
            .trim()
            .replace(/\s+/g, "");
        let result = table_creator.get_html_style().trim().replace(/\s/g, "");
        expect(result).to.include(expected_value);
    });
    it("Dark mode colors must not be setted if dark mode is disabled", () => {
        //mock style with dark mode false
        sinon.stub(table_creator, "get_config_style").returns({ dark_mode: false });
        //I need to reassign because when the object is created the method is alredy been called.
        //So, in order to give the correct value, I need to assign again.
        table_creator.style = table_creator.get_config_style();
        table_creator.base_styling = table_creator.get_base_styling();
        let expected_value = "html{background-color: #ebebeb;color: #000000;"
            .trim()
            .replace(/\s+/g, "");
        let result = table_creator.get_html_style().trim().replace(/\s/g, "");
        expect(result).to.include(expected_value);
    });
});
