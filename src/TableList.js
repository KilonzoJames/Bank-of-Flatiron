import React, {useEffect} from "react";
import Button from "./Button";


function TableList({array, setArray}){
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
    const updatedArray = array.filter((item) => item !== dataObject);
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
            <tbody>{array.map(rowdata)}</tbody>
        </table>
        </>
    )
}
export default TableList