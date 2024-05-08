import { useEffect, useState } from "react";
import Button01 from "./Button01";
import SudokuBox from "./SudokuBox";
import Button02 from "./Button02";

export default function SudokuAll() {
    const [Nbox, setNbox] = useState([]);
    const [Sudoku, setSudoku] = useState([]);
    
    const SudokuGenerate = () => {
        let arr = [1,2,3,4,5,6,7,8,9];
        let sudokuMix = arrMixer(arr);
        let valid = false;
        let sudoku1 = [
            [10,10,10,10,10,10,10,10,10],
            [10,10,10,10,10,10,10,10,10],
            [10,10,10,10,10,10,10,10,10],
            [10,10,10,10,10,10,10,10,10],
            [10,10,10,10,10,10,10,10,10],
            [10,10,10,10,10,10,10,10,10],
            [10,10,10,10,10,10,10,10,10],
            [10,10,10,10,10,10,10,10,10],
            [10,10,10,10,10,10,10,10,10]
            
        ]
        sudoku1.map((y, iy) => {return (y.map((x, ix)=>{
            let fail = 0;
            valid = false;
            while(valid == false){
                if(ValidNumber(sudoku1, ix, iy, sudokuMix[ix])){
                    sudoku1[iy][ix] = sudokuMix[ix];
                    valid = true;
                }else{
                    sudokuMix = arrRemixer(sudokuMix, ix);
                    fail++;
                }
                if(fail > 9){valid = true;}
            }


        }))});
        setNbox([...sudoku1]);
        let sudoku2 = sudoku1.map((x)=>{
            return x.slice();
        });
        let count = 0; let index = 0;
        arr = [0,1,2,3,4,5,6,7,8];
        sudoku2.map((y, yi) => {
            count = 0;
            sudokuMix = arrMixer(arr);
            while(count < 5){
                index = sudokuMix[count];
                y[index] = "";
                count++;
            }
        });
        setSudoku([...sudoku2]);
    }
    useEffect(()=>{
        SudokuGenerate();
    },[]);

    const ResolveSudoku = () => {
        setSudoku([...Nbox]);
    }

    const ValidNumber = (sudoku, x, y, value) => {
        let cubeI = indexCube(x,y);
        let cube = ValidCube(sudoku, cubeI, value);
        let column = ValidColumn(sudoku, x, value);
        let row = ValidRow(sudoku, y, value);
        if(cube == true && column == true && row == true){
            return(true);
        }else{
            return(false);
        }
    }
    const indexCube = (x, y) => {
        let cube = "z"; let cubeIndex = [];
        if(x < 3 && y < 3){
            cube = "a";
        }else if(x > 2 && x < 6 && y < 3){
            cube = "b";
        }else if(x > 5 && y < 3){
            cube = "c";
        }else if(x < 3 && y > 2 && y < 6){
            cube = "d";
        }else if(x > 2 && x < 6 && y > 2 && y < 6){
            cube = "e";
        }else if(x > 5 && y > 2 && y < 6){
            cube = "f";
        }else if(x < 3 && y > 5){
            cube = "g";
        }else if(x > 2 && x < 6 && y > 5){
            cube = "h";
        }else if(x > 5 && y > 5){
            cube = "i";
        }
        // now we know at which cube of the sudoku the number belongs

        switch(cube){
            case("a"):
            cubeIndex = [0,0]; break;
            case("b"):
            cubeIndex = [3,0]; break;
            case("c"):
            cubeIndex = [6,0]; break;
            case("d"):
            cubeIndex = [0,3]; break;
            case("e"):
            cubeIndex = [3,3]; break;
            case("f"):
            cubeIndex = [6,3]; break;
            case("g"):
            cubeIndex = [0,6]; break;
            case("h"):
            cubeIndex = [3,6]; break;
            case("i"):
            cubeIndex = [6,6]; break;
        }
        // now we have the index which the cube begins, to map the cube correctly

        return(cubeIndex);
    }
    const ValidCube = (sudoku , cubeIndex, value) => {
        let counter = 0;
        for(let j=cubeIndex[1]; j<cubeIndex[1]+3; j++){
            for(let i=cubeIndex[0]; i<cubeIndex[0]+3; i++){
                if(value == sudoku[j][i]){
                    counter++;
                }
            }
        }

        if(counter > 0){
            return false;
        }else{
            return true;
        }
    }
    const ValidRow = (sudoku, col, value) => {
        let conflict = [];
        let y = col;
        let counter = 0;
        for(let i=0; i<sudoku[y].length ; i++){
            if(value == sudoku[y][i]){
                counter++;
            }
        }
        if(counter > 0){
            return(false);
        }else{
            return(true);
        }
    }
    const ValidColumn = (sudoku, row, value) => {
        let conflict = [];
        let x = row;
        let counter = 0;
        for(let i=0; i<sudoku.length ; i++){
            if(value == sudoku[i][x]){
                counter++;
            }
        }
        if(counter > 0){
            return(false);
        }else{
            return(true);
        }
    }
    const arrMixer = (arr) => {
        let arr1 = [...arr];
        let last_index = arr1.length-1;
        while(last_index > 0){
            let rand_index = Math.floor(Math.random()*arr1.length);
            let temp = arr1[last_index];
            arr1[last_index] = arr1[rand_index];
            arr1[rand_index] = temp;
            last_index --;
        }
        return(arr1);
    }
    const arrRemixer = (arr, i) =>{
        let arr1 = [...arr.slice(0,i)];
        let temp = arr[i];
        let result = []; let arr2 = [];
        if(i < arr.length - 1){
            arr2 = [...arr.slice(i+1)];
            result = arr1.concat([...arr2, temp]);
        }else{
            arr2 = [...arr.slice(i)];
            result = arr1.concat([...arr2, temp]);
        }
        return result

    }
    return(
        <div id= "SudokuBox">
            {/*<SudokuBox Nbox={Nbox} SudokuMap={SudokuMap}/>*/}
            {Sudoku.map((x, ix) => { return(x.map((y, iy)=>{return(<div className ="Snumber" value={Sudoku[ix][iy]} key={ix + "_" + iy}>{Sudoku[ix][iy]}</div>)}))})}
            <Button01 SudokuGenerate={SudokuGenerate} Nbox={Nbox}/>
            <Button02 ResolveSudoku={ResolveSudoku}/>
        </div>
    );
}