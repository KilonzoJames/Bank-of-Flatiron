import React from "react";


function Search({hint, setHint}){

function handleSearch(e){
    const inputValue = e.target.value;
    setHint(inputValue);
}
    return(
            <input 
            type="search" 
            value={hint}
            onChange={handleSearch} 
            className="form-control" 
            id="exampleFormControlInput1" 
            placeholder="Search your recent transactions"
            />
    );
}
export default Search