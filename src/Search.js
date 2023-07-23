import React, {useEffect, useState} from "react";


function Search({array, setArray}){
const [originalArray, setOriginalArray] = useState([]);

useEffect(() => {
    setOriginalArray([...array]);
  }, [array]);

function filterArray(value) {
    return array.filter(dataObject=>{
    const lowerCaseValue = value.toLowerCase();
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

function handleSearch(event){
    const value=event.target.value;
    const searchArray = filterArray(value);
    console.log(array);
    console.log(searchArray);

    if(searchArray.length>0){
    setArray(searchArray)
    }
    else{
    setArray(originalArray)
    }
}
    return(

            <input 
            onChange={handleSearch} 
            type="text" 
            className="form-control" 
            id="exampleFormControlInput1" 
            placeholder="Search your recent transactions"
            />
    );
}
export default Search