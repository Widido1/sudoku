import { useState } from "react";
import Button01 from "./Button01";
import SudokuBox from "./SudokuBox";

export default function SudokuAll() {
    const [Nbox, setNbox] = useState(
        [
            [0,0,0,0,0,0,0,0,0],
            [1,1,1,1,1,1,1,1,1],
            [2,2,2,2,2,2,2,2,2],
            [3,3,3,3,3,3,3,3,3],
            [4,4,4,4,4,4,4,4,4],
            [5,5,5,5,5,5,5,5,5],
            [6,6,6,6,6,6,6,6,6],
            [7,7,7,7,7,7,7,7,7],
            [8,8,8,8,8,8,8,8,8]
            
        ]
    );
    const SudokuGenerate = () => {
        console.log("Sudoku Generate!");
    }

    const ValidSudoku = () => {
        console.log("Valid Sudoku!");
    }
    const mapCube = () => {
        console.log("Map Cube!");
    }
    const arrMixer = () => {
        console.log("ArrMixer!");
        let arr = [1,2,3,4,5,6,7,8,9];
        let last_index = arr.length-1;
        while(last_index > 0){
            let rand_index = Math.floor(Math.random()*arr.length);
            let temp = arr[last_index];
            arr[last_index] = arr[rand_index];
            arr[rand_index] = temp;
            last_index --;
        }
        console.log(arr);
        return(arr);
    }

    return(
        <div>
            <SudokuBox Nbox={Nbox}/>
            <Button01/>
        </div>
    );
}