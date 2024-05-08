
export default function Button01(props) {

    return(
        <button id="GenerateButton" onClick={() => props.SudokuGenerate()}>
            Generate Sudoku
        </button>
    );
}