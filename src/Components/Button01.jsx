
export default function Button01(props) {

    return(
        <button onClick={() => props.SudokuGenerate(props.Nbox)}>
            button01
        </button>
    );
}