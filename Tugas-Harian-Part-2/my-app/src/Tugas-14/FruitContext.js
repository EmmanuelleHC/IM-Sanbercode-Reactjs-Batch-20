import React, { useState, createContext,useEffect } from "react";
import axios from "axios"
export const FruitContext = createContext();

export const FruitProvider = props => {
    const [fruit,setFruit]=useState([])
    const [currentId,setCurrentId]=useState(null)
    const [input,setInput] = useState({
      name:'',price:'',weight:''
    })
    useEffect( () => {
   
      axios.get(`http://backendexample.sanbercloud.com/api/fruits`)
      .then(res => {
        let data = res.data
        setFruit(data.map(el=> {return {id: el.id, name: el.name,price:el.price,weight:el.weight}}))
      })
  }, [fruit])

  return (
    <FruitContext.Provider value={[fruit, setFruit,currentId,setCurrentId,input,setInput]}>
      {props.children}
    </FruitContext.Provider>
  );
};
