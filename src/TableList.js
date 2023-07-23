import React, {useEffect} from "react";
import Button from "./Button";


function TableList({array, setArray}){

useEffect(()=>{
  fetch("http://localhost:3000/transactions")
  .then(r=>r.json())
  .then(jsondata=>{
  console.log(jsondata);
  const newJson = jsondata.map((item) => {
    const { id, ...newItem } = item; 
    return newItem; 
  });
    setArray(newJson)
  })
}, [setArray])

const handleDelete = (dataObject) => {
    const updatedArray = array.filter((item) => item !== dataObject);
    setArray(updatedArray);
    deleteObject(dataObject)
  };

const deleteObject=(dataObject)=>{
  const deletedData={
    method: "DELETE",
    headers:{
      "Content-Type":"application/json",
    Accept: "application/json"
  }};
  fetch(`http://localhost:3000/transactions/${dataObject.id}`,deletedData)
  .then(r=>r.json())
  .then(r=>console.log("Deleted from Database")
  )
}
  
const rowdata=array.map((dataObject,index)=>{
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
        <>
        <table className="table">
            <thead>
                <tr>
                <th scope="col">Date</th>
                <th scope="col">Description</th>
                <th scope="col">Category</th>
                <th scope="col">Amount</th>
                </tr>
            </thead>
            <tbody>{rowdata}</tbody>
        </table>
        </>
    )
}
export default TableList