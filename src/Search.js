import React, {useState} from "react";


function Search({array, setArray,setFilteredArray}){
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
    // setFilteredArray(filteredArray);
    setArray(filteredArray);

}
    return(
            <input 
            value={hint}
            onChange={handleSearch} 
            type="search" 
            className="form-control" 
            id="exampleFormControlInput1" 
            placeholder="Search your recent transactions"
            />
    );
}
export default Search