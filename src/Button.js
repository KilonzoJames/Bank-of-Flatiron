import React from "react";

function Button({children, onClick}){
    return(
    <button 
    onClick={onClick}  
    className="btn btn-outline-primary"
    >
    {children}
    </button>
    );
}
export default Button