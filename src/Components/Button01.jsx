
export default function Button01(props) {

    return(
        <button onClick={() => props.SudokuGenerate()}>
            Generate Sudoku
        </button>
    );
}