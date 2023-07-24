import React, {useState} from "react";


function Search({array, setArray}){
const [hint, setHint] = useState("");

function filterArray(value) {
    return array.filter(dataObject=>{
    const lowerCaseValue = hint.toLowerCase();
    const lowerCaseDescription = dataObject.description.toLowerCase();
    const lowerCaseCategory = dataObject.category.toLowerCase();
    const amountString = String(dataObject.amount);
    return(
    dataObject.date.includes(lowerCaseValue)||
    lowerCaseDescription.includes(lowerCaseValue)||
    lowerCaseCategory.includes(lowerCaseValue)||
    amountString.includes(lowerCaseValue)    
    );
});
}

function handleSearch(e){
    const inputValue = e.target.value;
    setHint(inputValue);
    const filteredArray = filterArray();
    setArray(filteredArray);
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