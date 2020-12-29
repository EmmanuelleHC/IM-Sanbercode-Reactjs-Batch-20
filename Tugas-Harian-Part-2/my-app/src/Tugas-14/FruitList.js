import React, {useContext,useState} from "react"
import { FruitContext } from "./FruitContext"
import axios from "axios"
const FruitList = () =>{
  const [fruit] = useContext(FruitContext)


  const [input, setInput] = useState({id: null, name:"",price:"",weight:0})
  const [currentId, setCurrentId] =  useState(null)

 
 const handleChange = (event)=>{
    let typeOfInput = event.target.name
    let value = event.target.value
    
    if (typeOfInput === "name"){
      setInput({...input, name: value})
    }else if (typeOfInput === "price"){
      setInput({...input, price: value})
    }else if (typeOfInput === "weight"){
      setInput({...input, weight: parseInt(value)})
    }
  }

const handleEdit = (event) =>{
    let idBuah = event.target.value
   
    axios.get(`http://backendexample.sanbercloud.com/api/fruits/${idBuah}`)
    .then(res => {
      let data = res.data
      //setInput({...input, name: data.name})
      setInput({...input,name:data.name,price:data.price,weight: parseInt(data.weight)})
      // setInputName(data.name)
      // setInputPrice(data.price)
      // setInputWeight(data.weight)
    //  setInput({...input,name:data.name,price:data.price,weight: parseInt(data.weight)})
      setCurrentId(data.id)
    })
  }

  const handleDelete = (event) =>{
    let idBuah = parseInt(event.target.value)
    axios.delete(`http://backendexample.sanbercloud.com/api/fruits/${idBuah}`)
    .then(() => {
      let newDaftarBuah = fruit.filter(el=> {return el.id !== idBuah})
      setInput(newDaftarBuah)
    })
  }
  return(
      <>
      { fruit !== null &&
        (<div style={{width: "70%", margin: "0 auto", textAlign: "center"}}>
          <h1>Daftar Harga Buah</h1>
          <table className="daftar-buah">
            <thead>
              <tr>
                 <th>No</th>
                <th>Nama</th>
                <th>Harga</th>
                <th>Berat</th>
                <th>Aksi</th>
              </tr>
            </thead>
            <tbody>
                {
                  fruit.map((item, index)=>{
                    return(                    
                      <tr key={index}>
                         <td>{index+1}</td>
                      <td>{item.name}</td>
                      <td>{item.price}</td>
                      <td>{item.weight} gr</td>
                      <td>
                        <button onClick={handleEdit} value={item.id}>Edit</button>
                        &nbsp;
                        <button onClick={handleDelete} value={item.id}>Delete</button>
                      </td>
                      </tr>
                    )
                  })
                }
            </tbody>
          </table>
         
        
        </div>)
      }

     
      </>
    
  )

}

export default FruitList
