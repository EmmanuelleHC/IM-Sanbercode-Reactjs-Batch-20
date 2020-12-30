import React, {useContext, useState, useEffect} from "react"
import axios from "axios"
import {DaftarBuahContext} from "./DaftarBuahContext"

const DaftarBuahForm = () =>{
  const [daftarBuah, setDaftarBuah] = useContext(DaftarBuahContext)
  const [input, setInput] = useState({name: "", price: "", weight: 0})

  useEffect(()=>{
    if (daftarBuah.statusForm === "changeToEdit"){
      // cara 1 ambil data dari daftarBuah yg di inisialisasi di awal (bukan api baru)
      // let dataBuah = daftarBuah.lists.find(x=> x.id === daftarBuah.selectedId)
      // setInput({name: dataBuah.name, price: dataBuah.price, weight: dataBuah.weight})
      // setDaftarBuah({...daftarBuah, statusForm: "edit"})
      
      // cara 2 ambil data dari api baru                  
      axios.get(`http://backendexample.sanbercloud.com/api/fruits/${daftarBuah.selectedId}`)
      .then(res => {
        let dataBuah = res.data
        setInput({name: dataBuah.name, price: dataBuah.price, weight: dataBuah.weight})
        setDaftarBuah({...daftarBuah, statusForm: "edit"})
      })
      
    }
  },[daftarBuah, setDaftarBuah])

  const handleChange = (event) =>{
    let typeOfInput = event.target.name

    switch (typeOfInput){
      case "name":
      {
        setInput({...input, name: event.target.value});
        break
      }
      case "price":
      {
        setInput({...input, price: event.target.value});
        break
      }
      case "weight":
      {
        setInput({...input, weight: event.target.value});
          break
      }
    default:
      {break;}
    }
  }
  
  const handleSubmit = (event) =>{
    // menahan submit
    event.preventDefault()

    let name = input.name
    let price = input.price.toString()
    

    if (daftarBuah.statusForm === "create"){        
      axios.post(`http://backendexample.sanbercloud.com/api/fruits`, {name, price, weight: input.weight})
      .then(res => {
          setDaftarBuah(
            {statusForm: "create", selectedId: 0,
            lists: [
              ...daftarBuah.lists, 
              { id: res.data.id, 
                name: input.name, 
                price: input.price,
                weight: input.weight
              }]
            })
      })
    }else if(daftarBuah.statusForm === "edit"){
      axios.put(`http://backendexample.sanbercloud.com/api/fruits/${daftarBuah.selectedId}`, {name, price, weight: input.weight})
      .then(() => {
          let dataBuah = daftarBuah.lists.find(el=> el.id === daftarBuah.selectedId)
          dataBuah.name = input.name
          dataBuah.price = input.price
          dataBuah.weight = input.weight
          setDaftarBuah({statusForm: "create", selectedId: 0, lists: [...daftarBuah.lists]})
      })
    }

    setInput({name: "", price: "", weight: 0})

  }
  return(
    <>
      <h1>Form Daftar Harga Buah</h1>

      <div style={{width: "50%", margin: "0 auto", display: "block"}}>
        <div style={{border: "1px solid #aaa", padding: "20px"}}>
          <form onSubmit={handleSubmit}>
            <label style={{float: "left"}}>
              Nama:
            </label>
            <input style={{float: "right"}} type="text" name="name" value={input.name} onChange={handleChange}/>
            <br/>
            <br/>
            <label style={{float: "left"}}>
              Harga:
            </label>
            <input style={{float: "right"}} type="text" name="price" value={input.price} onChange={handleChange}/>
            <br/>
            <br/>
            <label style={{float: "left"}}>
              Berat (dalam gram):
            </label>
            <input style={{float: "right"}} type="number" name="weight" value={input.weight} onChange={handleChange}/>
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

export default DaftarBuahForm
