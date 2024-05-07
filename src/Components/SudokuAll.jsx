import { useState } from "react";
import Button01 from "./Button01";
import SudokuBox from "./SudokuBox";

export default function SudokuAll() {
    const [Nbox, setNbox] = useState(
        [
            [1,1,1,1,1,1,1,1,1],
            [2,2,2,2,2,2,2,2,2],
            [3,3,3,3,3,3,3,3,3],
            [4,4,4,4,4,4,4,4,4],
            [5,5,5,5,5,5,5,5,5],
            [6,6,6,6,6,6,6,6,6],
            [7,7,7,7,7,7,7,7,7],
            [8,8,8,8,8,8,8,8,8],
            [9,9,9,9,9,9,9,9,9]
            
        ]
    );
    const SudokuGenerate = (sudoku) => {
        let arr = [1,2,3,4,5,6,7,8,9];
        let sudokuMix = arrMixer(arr);
        let valid = false;
        sudoku.map((y, iy) => {return (y.map((x, ix)=>{
            let fail = 0;
            valid = false;
            while(valid == false){

                if(ValidNumber(sudoku, ix, iy, sudokuMix[ix])){
                    console.log("Valid Number: "+sudokuMix[ix]+", to: "+iy+","+ix)
                    sudoku[iy][ix] = sudokuMix[ix];
                    valid = true;
                }else{
                    console.log("fail number: "+sudokuMix[ix]);
                    sudokuMix = arrRemixer(sudokuMix, ix);
                    console.log(sudokuMix);
                    fail++;
                }
                if(fail > 9){console.log("fail to find the correct number in: " + iy + ix); valid = true;}
            }


        }))});
        console.log(sudoku);
        setNbox([...sudoku]);


    }

    const ValidSudoku = () => {
        console.log("Valid Sudoku!");
    }
    const ValidNumber = (sudoku, x, y, value) => {
        let cubeI = indexCube(x,y);
        let cube = ValidCube(sudoku, cubeI, value);
        let column = ValidColumn(sudoku, x, value);
        let row = ValidRow(sudoku, y, value);
        console.log("Cube: "+cube+", Column: "+column+", Row: "+row);
        if(cube == true && column == true && row == true){
            return(true);
        }else{
            console.log("Numero invalido: " + value);
            return(false);
        }
    }
    const indexCube = (x, y) => {
        console.log("Map Cube!");
        let cube = "z"; let cubeIndex = [];
        if(x < 3 && y < 3){
            cube = "a"; console.log("The cube is: a! ");
        }else if(x > 2 && x < 6 && y < 3){
            cube = "b"; console.log("The cube is: b! ");
        }else if(x > 5 && y < 3){
            cube = "c"; console.log("The cube is: c! ");
        }else if(x < 3 && y > 2 && y < 6){
            cube = "d"; console.log("The cube is: d! ");
        }else if(x > 2 && x < 6 && y > 2 && y < 6){
            cube = "e"; console.log("The cube is: e! ");
        }else if(x > 5 && y > 2 && y < 6){
            cube = "f"; console.log("The cube is: f! ");
        }else if(x < 3 && y > 5){
            cube = "g"; console.log("The cube is: g! ");
        }else if(x > 2 && x < 6 && y > 5){
            cube = "h"; console.log("The cube is: h! ");
        }else if(x > 5 && y > 5){
            cube = "i"; console.log("The cube is: i! ");
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
        let conflict = []; //tengo que hacer un arreglo más arriba, de forma de tirarle este en un push si false.
        let counter = 0;
        for(let j=cubeIndex[1]; j<cubeIndex[1]+3; j++){
            for(let i=cubeIndex[0]; i<cubeIndex[0]+3; i++){
                if(value == sudoku[i][j]){
                    //conflict.push([i,j]);
                    counter++;
                }
            }
        }

        if(counter > 1){
            //debería hacer un .push(conflict) en un arreglo de nivel superior
            return false;
        }else{
            return true;
        }
    }
    const ValidRow = (sudoku, y1, value) => {
        let conflict = [];
        let y = y1;
        let counter = 0;
        for(let i=0; i<sudoku[i] ; i++){
            if(value == sudoku[i][y]){
                //conflict.push(sudoku[i][y]);
                counter++;
            }
        }
        if(counter > 1){
            return(false);
        }else{
            return(true);
        }
    }
    const ValidColumn = (sudoku, x1, value) => {
        let conflict = [];
        let x = x1;
        let counter = 0;
        for(let i=0; i<sudoku[i] ; i++){
            if(value == sudoku[x][i]){
                //conflict.push(sudoku[x][i]);
                counter++;
            }
        }
        if(counter > 1){
            return(false);
        }else{
            return(true);
        }
    }
    const arrMixer = (arr) => {
        console.log("ArrMixer!");
        let arr1 = [...arr];
        let last_index = arr1.length-1;
        while(last_index > 0){
            let rand_index = Math.floor(Math.random()*arr1.length);
            let temp = arr1[last_index];
            arr1[last_index] = arr1[rand_index];
            arr1[rand_index] = temp;
            last_index --;
        }
        console.log(arr1);
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
    const SudokuMap = () =>{
       
       return(
        Nbox.map((x, ix) => { return(x.map((y, iy)=>{return(<div className ="Snumber" value={Nbox[ix][iy]} key={ix + "_" + iy}>{Nbox[ix][iy]}</div>)}))})
       );
        
    }
    return(
        <div id= "SudokuBox">
            {/*<SudokuBox Nbox={Nbox} SudokuMap={SudokuMap}/>*/}
            {Nbox.map((x, ix) => { return(x.map((y, iy)=>{return(<div className ="Snumber" value={Nbox[ix][iy]} key={ix + "_" + iy}>{Nbox[ix][iy]}</div>)}))})}
            <Button01 SudokuGenerate={SudokuGenerate} Nbox={Nbox}/>
        </div>
    );
}