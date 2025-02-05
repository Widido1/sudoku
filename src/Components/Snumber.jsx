
export default function Snumber(props){

    if(props.value === ""){
        return(
            <div className="Snumber">
                <input type="number" min="1" max="9" step="1"/>
            </div>
            
        );
    }else{

        return(
            <div className="Snumber">{props.value}</div>
        );
    }
}