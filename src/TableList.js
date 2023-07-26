import React, {useState, useEffect} from "react";
import Button from "./Button";


function TableList({array, setArray, hint}){
const [datestate, setDate]=useState(true)
const [descriptionstate, setDescription]=useState(true)
const [categorystate, setCategory]=useState(true)
const [amountstate, setAmount]=useState(true)

function handleDate(){
  setDate(!datestate)
  array.sort((a,b)=>a["date"]-b["date"]?1:-1 )
}
function handleDescription(){
  setDescription(!descriptionstate);
  const cc=array.sort((a,b)=>a["description"]<b["description"]?-1:1)
  console.log(cc);
}
function handleCategory(){
  setCategory(!categorystate);
  array.sort((a,b)=>a["category"]>b["category"]?1:-1)
}
function handlePrice(){
  setAmount(!amountstate);
  // array.sort((a,b)=>a["amount"]-b["amount"]?1:-1 )
}




useEffect(()=>{
  const url="http://localhost:3000/transactions";
  fetch(url)
  .then(r=>r.json())
  .then(jsondata=>{
  console.log(jsondata);
  // const newJson = jsondata.map((item) => {
  //   const { id, ...newItem } = item; 
  //   return newItem; 
  // });
    setArray(jsondata)
  })
}, [setArray])

const handleDelete = (dataObject) => {
    const updatedArray = array.filter((arrayItem) => arrayItem !== dataObject);
    deleteObject(dataObject)
    setArray(updatedArray);
  };
const deleteObject=(dataObject)=>{
  const indexToDelete = dataObject.id;
  console.log(indexToDelete);
  const url=`http://localhost:3000/transactions/${indexToDelete}`
  const deletedData={
    method: "DELETE",
    };
  fetch(url,deletedData).then(response=>console.log(response))}
    // if(response.ok){
    //   const idx=array.indexOf(dataObject);
    //   array.splice(idx,1)
    //   setArray(array)
    // }

const filteredArray=array.filter(dataObject=>{
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
      
const rowdata=((dataObject)=>{
  return(
    <>
        <tr key={dataObject.id}>
        <td>{dataObject.date}</td>
        <td>{dataObject.description}</td>
        <td>{dataObject.category}</td>
        <td>{dataObject.amount}</td>
        <td>
        <Button onClick={()=>handleDelete(dataObject)}>Delete</Button>
        </td>
        </tr>
    </>
  )
})
    return(
        <table className="table">
            <thead>
              <tr>
              <th scope="col">Date
              <button 
              onClick={handleDate}
              class="btn btn-primary dropdown-toggle" type="button" >
              {datestate? "Date(Oldest)": "Date(Recent)"}
              </button>
              </th>

              <th scope="col">Description
              <button 
              onClick={handleDescription}
              class="btn btn-primary dropdown-toggle" type="button" >
              {descriptionstate? "Description(Z-A)" : "Description(A-Z)"}
              </button>
              </th>

              <th scope="col">Category
              <button
              onClick={handleCategory} 
              class="btn btn-primary dropdown-toggle" type="button">
              {categorystate? "Category(Z-A)" : "Category(A-Z)"}            
              </button>
              </th>

              <th scope="col">Amount
              <button 
              onClick={handlePrice}
              class="btn btn-primary dropdown-toggle" type="button">
              {amountstate? "Highest Price" : "Lowest Price"}
              </button>
              </th>
              </tr>
            </thead>
            <tbody>{filteredArray.map(rowdata)}</tbody>
        </table>
    )
}
export default TableList