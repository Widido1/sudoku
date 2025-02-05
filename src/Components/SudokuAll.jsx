import { useEffect, useState } from "react";
import Button01 from "./Button01";
import Button02 from "./Button02";
import Snumber from "./Snumber";

export default function SudokuAll() {
    const [Nbox, setNbox] = useState([]);
    const [Sudoku, setSudoku] = useState([]);
    
    const SudokuGenerate = () => {
        //esta funcion genera el sudoku, utiliza varias funciones que se especifican abajo
        let arr = [1,2,3,4,5,6,7,8,9]; //establece un arreglo inicial del 1 al 9
        let sudokuMix = arrMixer(arr); //utiliza arrMixer() para mezclar el arreglo, esto contribuye a crear siempre un sudoku distinto.
        let valid = false; //creamos la variable valid en falso, esta se usa como variable global para saber si el sudoku es o no valido
        let sudoku1 = [ //se crea un sudoku inicial con valores de prueba
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
        sudoku1.map((y, iy) => {return (y.map((x, ix) => {
            //esta es la funcion que recorre el sudoku entero
            let fail = 0;
            valid = false; //mientras el sudoku no sea valido va a seguir probando numeros
            while(valid === false){
                //usa ValidNumber() para saber si el numero es valido, sino, usa ArrRemixer() y cuenta el fallo
                if(ValidNumber(sudoku1, ix, iy, sudokuMix[ix])){
                    sudoku1[iy][ix] = sudokuMix[ix];
                    valid = true;
                }else{
                    sudokuMix = arrRemixer(sudokuMix, ix);
                    fail++;
                }
                if(fail > 9){valid = true;} //si los prueba a todos sale del while, esto es solo para testeo
            }
            return fail //ignore, only to erase the warning
        }))});
        setNbox([...sudoku1]); // entrega el sudoku armado a Nbox (caja de numeros)
        let sudoku2 = sudoku1.map((x)=>{
            //mapea el Nbox para armar el prototipo del sudoku
            return x.slice();
        });
        let count = 0; let index = 0;
        arr = [0,1,2,3,4,5,6,7,8]; //resetea el arreglo de numeros
        sudoku2.map((y, yi) => {
            //borra 5 valores al azar en cada fila, formando el sudoku incompleto que el usuario puede resolver.
            count = 0;
            sudokuMix = arrMixer(arr); //mezcla arr
            while(count < 5){
                //reemplaza los primeros 5 valores de arr en el prototipo de sudoku por "", de esta forma se borran 5 valores al azar en cada fila.
                index = sudokuMix[count];
                y[index] = "";
                count++;
            }
            return count //ignore, only to erase the warning
        });
        setSudoku([...sudoku2]); //convierte sudoku2 en el nuevo sudoku que se le muestra al usuario
    }
    useEffect(()=>{
        //genera el sudoku al cargar la pagina
        SudokuGenerate();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[]);

    const ResolveSudoku = () => {
        //cambia el sudoku incompleto, por el sudoku resuelto que fabricamos al principio.
        setSudoku([...Nbox]);
    }

    //==========================Validator functions============================================

    const ValidNumber = (sudoku, x, y, value) => {
        //usa indexCube() para averiguar en que cuandrante del sudoku se quiere ingresar el valor para recorrerlo y validarlo correctamente
        //utiliza ValidCube(), ValidColumn() y ValidRow() para saber si el numero es valido para ese casillero
        let cubeI = indexCube(x,y);
        let cube = ValidCube(sudoku, cubeI, value);
        let column = ValidColumn(sudoku, x, value);
        let row = ValidRow(sudoku, y, value);
        if(cube === true && column === true && row === true){
            return(true);
        }else{
            return(false);
        }
    }
    const indexCube = (x, y) => {
        //averigua en que cubo se encuentra el casillero que se esta verificando
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
            //determina el indice inicial de cada cuadrante
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
            default:
                break;
        }
        // now we have the index which the cube begins, to map the cube correctly

        return(cubeIndex);//devuelve el casillero inicial del cuadrante
    }

    const ValidCube = (sudoku , cubeIndex, value) => {
        //usa el casillero inicial del cuadrante brindado por la funcion cubeIndex, para recorrer correctamente el cuadrante y verificar que el valor sea valido
        let counter = 0;
        for(let j=cubeIndex[1]; j<cubeIndex[1]+3; j++){
            for(let i=cubeIndex[0]; i<cubeIndex[0]+3; i++){
                if(value === sudoku[j][i]){
                    //solamente si el valor es distinto a los valores de todos los cuadrantes, es valido
                    counter++;
                }
            }
        }

        if(counter > 0){
            //si hubo una coincidencia, es que el numero ya existia en el cuadrante por lo tanto no es valido
            return false;
        }else{
            return true;
        }
    }
    const ValidRow = (sudoku, col, value) => {
        //Misma logica que ValidCube, pero recorriendo la fila.
        let y = col;
        let counter = 0;
        for(let i=0; i<sudoku[y].length ; i++){
            if(value === sudoku[y][i]){
                counter++;
            }
        }
        if(counter > 0){
            //solo si no encontró el valor en la fila, es 0 y por lo tanto, el valor valido.
            return(false);
        }else{
            return(true);
        }
    }

    const ValidColumn = (sudoku, row, value) => {
        //Misma logica pero recorriendo la columna
        let x = row;
        let counter = 0;
        for(let i=0; i<sudoku.length ; i++){
            if(value === sudoku[i][x]){
                counter++;
            }
        }
        if(counter > 0){
            //solo si no encontro el numero en la columna, es 0 y por lo tanto, el valor valido.
            return(false);
        }else{
            return(true);
        }
    }

    //=========================== Array Mixers ===========================================

    const arrMixer = (arr) => {
        //Mezcla el arreglo
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
        //extrae el valor x[i] del arreglo y lo empuja al final.
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
        <div id="SudokuWrap">
            <div id= "SudokuBox">
                {Sudoku.map((x, ix) => { return(x.map((y, iy)=>{return(<Snumber value={Sudoku[ix][iy]} key={`${ix}-${iy}`}/>)}))})}


            </div>
            <div id="ButtonBox">
                <Button01 SudokuGenerate={SudokuGenerate} Nbox={Nbox}/>
                <Button02 ResolveSudoku={ResolveSudoku}/>
            </div>

        </div>

    );
}