import React, {useContext, useState} from "react"
import { FruitContext } from "./FruitContext"
import axios from "axios"
const FruitForm = ()=>{
  const [fruit, setFruit] = useContext(FruitContext)
  const [input, setInput] = useState({id: null, name:"",price:"",weight:0})
  const [currentId, setCurrentId] =  useState(null)

 
 const handleChange = (event)=>{
    let typeOfInput = event.target.name
    let value = event.target.value
    
    if (typeOfInput === "name"){
      setInput({...input, name: value})
    }else if (typeOfInput === "price"){
      setInput({...input, price: parseInt(value)})
    }else if (typeOfInput === "weight"){
      setInput({...input, weight: parseInt(value)})
    }
  }

   const handleSubmit = (event)=>{
    event.preventDefault()
    if (currentId === null){
      // untuk create data baru
      axios.post(`http://backendexample.sanbercloud.com/api/fruits`, {name: input.name,price:input.price,weight:input.weight})
      .then(res => {
          let data = res.data
          
          setFruit([...fruit,  {id: data.id, name: data.name,price:data.price,weight:data.weight}])
          setInput({id:null, name: "",price:0,weight:0})
      })
    }else{
      axios.put(`http://backendexample.sanbercloud.com/api/fruits/${currentId}`, {name: input.name,weight:input.weight,price:input.price})
      .then(() => {
          let singleBuah = fruit.find(el=> el.id === currentId)
          singleBuah.name= input.name
          singleBuah.weight= input.weight
          singleBuah.price= input.price
           setFruit([...fruit,  {id: input.id, name: input.name,price:input.price,weight:input.weight}])
          setInput({id:null, name: "",price:0,weight:0})
      })      
    }
    
  }

  
  return(
    <>
       {/* Form */}
           <h1>Form Daftar Harga Buah</h1>
        <div style={{width: "50%", margin: "0 auto", display: "block"}}>
          <div style={{border: "1px solid #aaa", padding: "20px"}}>
            <form onSubmit={handleSubmit}>
              <label style={{float: "left"}}>
                Name:
              </label>
              <input style={{float: "right"}} type="text" required name="name" value={input.name} onChange={handleChange}/>
              <br/>
              <br/>
              <label style={{float: "left"}}>
                Harga:
              </label>
              <input style={{float: "right"}} type="text" required name="price" value={input.price} onChange={handleChange}/>
              <br/>
              <br/>
              <label style={{float: "left"}}>
                Berat (dalam gram):
              </label>
              <input style={{float: "right"}} type="number" required name="weight" value={input.weight} onChange={handleChange}/>
              <br/>
              <br/>
              <div style={{width: "100%", paddingBottom: "20px"}}>
                <button style={{ float: "right"}}>submit</button>
              </div>
            </form>
          </div>
        </div>
    </>
  )
}

export default FruitForm
