import React, {useState, useEffect} from "react";
import Button from "./Button";


function TableList({array, setArray, hint}){
const [datestate, setDate]=useState(true)
const [descriptionstate, setDescription]=useState(true)
const [categorystate, setCategory]=useState(true)
const [amountstate, setAmount]=useState(true)

function handleDate(){
  setDate(!datestate)
  if (datestate === true) {
    array.sort((a, b) => a["date"]-b["date"]?1:-1);
  } else {
    array.sort((a, b) => b.date-a.date?1:-1);
  }
}
function handleDescription(){
  setDescription(!descriptionstate);
  if (descriptionstate === true) {
    array.sort((a, b) => a["description"]>b["description"]?1:-1);
  } else {
    array.sort((a, b) => b.description>a.description?1:-1);
  }
}
function handleCategory(){
  setCategory(!categorystate);
  if (categorystate === true) {
    array.sort((a, b) => a["category"]>b["category"]?1:-1);
  } else {
    array.sort((a, b) => b.category>a.category?1:-1);
  }
}
function handlePrice(){
  setAmount(!amountstate);
  if (amountstate === true) {
    array.sort((a, b) => a.amount - b.amount);
  } else {
    array.sort((a, b) => b.amount - a.amount);
  }
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
              <br/>
              <button 
              onClick={handleDate}
              className="btn btn-primary dropdown-toggle" type="button" >
              {datestate? "Date(Oldest)": "Date(Recent)"}
              </button>
              </th>

              <th scope="col">Description
              <br/>
              <button 
              onClick={handleDescription}
              className="btn btn-primary dropdown-toggle" type="button" >
              {descriptionstate? "Description(Z-A)" : "Description(A-Z)"}
              </button>
              </th>

              <th scope="col">Category
              <br/>
              <button
              onClick={handleCategory} 
              className="btn btn-primary dropdown-toggle" type="button">
              {categorystate? "Category(Z-A)" : "Category(A-Z)"}            
              </button>
              </th>

              <th scope="col">Amount
              <br/>
              <button 
              onClick={handlePrice}
              className="btn btn-primary dropdown-toggle" type="button">
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