import React, { useState } from "react";
import Header from "./Header";
import Search from "./Search";
import Form from "./Form";
import TableList from "./TableList";
import "./App.css";


function App() {
  const [array, setArray]=useState([]);

  const updateArray = (newArray) => {
    setArray(newArray);
  };
    // Callback function to update the state from the Form component


  return (
    <div className="App">
     <Header/>
     <Search 
     array={array} 
     setArray={setArray}
     />
     <Form 
     array={array} 
     updateArray={updateArray}
     />
     <TableList 
     array={array} 
     setArray={setArray}
     />
    </div>
  );
}

export default App;
