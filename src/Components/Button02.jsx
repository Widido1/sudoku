
export default function Button02(props) {

    return(
        <button onClick={() => props.ResolveSudoku()}>
            Resolve!
        </button>
    );
}