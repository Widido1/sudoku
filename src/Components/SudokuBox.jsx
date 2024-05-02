import React, {useState, useEffect} from "react";

export default function SudokuBox(props){

    return(
        <div id= "SudokuBox">
            {props.Nbox.map((x, ix) => { return(x.map((y, iy)=>{return(<div className ="Snumber" value={y} key={ix + "_" + iy}>{y}</div>)}))})}
            {/*
            <SudokuSquare id="1a"/><SudokuSquare id="1b"/><SudokuSquare id="1c"/> <SudokuSquare id="1d"/><SudokuSquare id="1e"/><SudokuSquare id="1f"/> <SudokuSquare id="1g"/><SudokuSquare id="1h"/><SudokuSquare id="1i"/>
            <SudokuSquare id="2a"/><SudokuSquare id="2b"/><SudokuSquare id="2c"/> <SudokuSquare id="2d"/><SudokuSquare id="2e"/><SudokuSquare id="2f"/> <SudokuSquare id="2g"/><SudokuSquare id="2h"/><SudokuSquare id="2i"/>
            <SudokuSquare id="3a"/><SudokuSquare id="3b"/><SudokuSquare id="3c"/> <SudokuSquare id="3d"/><SudokuSquare id="3e"/><SudokuSquare id="3f"/> <SudokuSquare id="3g"/><SudokuSquare id="3h"/><SudokuSquare id="3i"/>
            <SudokuSquare id="4a"/><SudokuSquare id="4b"/><SudokuSquare id="4c"/> <SudokuSquare id="4d"/><SudokuSquare id="4e"/><SudokuSquare id="4f"/> <SudokuSquare id="4g"/><SudokuSquare id="4h"/><SudokuSquare id="4i"/>
            <SudokuSquare id="5a"/><SudokuSquare id="5b"/><SudokuSquare id="5c"/> <SudokuSquare id="5d"/><SudokuSquare id="5e"/><SudokuSquare id="5f"/> <SudokuSquare id="5g"/><SudokuSquare id="5h"/><SudokuSquare id="5i"/>
            <SudokuSquare id="6a"/><SudokuSquare id="6b"/><SudokuSquare id="6c"/> <SudokuSquare id="6d"/><SudokuSquare id="6e"/><SudokuSquare id="6f"/> <SudokuSquare id="6g"/><SudokuSquare id="6h"/><SudokuSquare id="6i"/>
            <SudokuSquare id="7a"/><SudokuSquare id="7b"/><SudokuSquare id="7c"/> <SudokuSquare id="7d"/><SudokuSquare id="7e"/><SudokuSquare id="7f"/> <SudokuSquare id="7g"/><SudokuSquare id="7h"/><SudokuSquare id="7i"/>
            <SudokuSquare id="8a"/><SudokuSquare id="8b"/><SudokuSquare id="8c"/> <SudokuSquare id="8d"/><SudokuSquare id="8e"/><SudokuSquare id="8f"/> <SudokuSquare id="8g"/><SudokuSquare id="8h"/><SudokuSquare id="8i"/>
            <SudokuSquare id="9a"/><SudokuSquare id="9b"/><SudokuSquare id="9c"/> <SudokuSquare id="9d"/><SudokuSquare id="9e"/><SudokuSquare id="9f"/> <SudokuSquare id="9g"/><SudokuSquare id="9h"/><SudokuSquare id="9i"/>
            */}



        </div>
    );
}