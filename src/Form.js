import React, { useState } from "react";
import Button from "./Button";

function Form({array, updateArray}){
    const [dataObject, setdataObject ]=useState({
        date:"",
        description:"",
        category:"",
        amount:0
    })

    function handleChange(event){
        setdataObject(
            {
                ...dataObject,
                [event.target.name]: event.target.value
            }
        )
    }

    function handleSubmit(event){
        event.preventDefault()
      const newArray= [...array,
            dataObject]
        updateArray(newArray)
        setdataObject({
            date:"",
            description:"",
            category:"",
            amount:0
        },
        addNewTransaction(dataObject)
        )
    }
    console.log(array)


    const addNewTransaction=(dataObject)=>{
        const url="http://localhost:3000/transactions";
        const postData={
        method: "POST",
        headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
        },
        body: JSON.stringify({
            "date": dataObject.date,
            "description": dataObject.description,
            "category": dataObject.category,
            "amount": dataObject.amount
        })}
       return fetch(url, postData)
       .then(response => response.json())
       .then(response => {
        const jsonArray=[...array, response]
        updateArray(jsonArray)
    })
    }
    
    return(
    <>
        <div className="p-3 text-center">
            <form className="fs-4 fw-medium" onSubmit={handleSubmit}>

                <label >Date</label>
                <input 
                type="date" 
                name="date" 
                value={dataObject.date} 
                onChange={handleChange}
                />

                <input 
                type="text"  
                placeholder="Description" 
                name="description" 
                value={dataObject.description} 
                onChange={handleChange}
                />

                <input 
                type="text"  
                placeholder="Category" 
                name="category" 
                value={dataObject.category} 
                onChange={handleChange}
                />

                <input 
                type="number"  
                placeholder="Amount" 
                name="amount" 
                value={dataObject.amount} 
                onChange={handleChange}
                />
                <br />

                <Button type="submit">
                    Add Transaction
                </Button>
            </form>
        </div>
    </>
    );
}
export default Form