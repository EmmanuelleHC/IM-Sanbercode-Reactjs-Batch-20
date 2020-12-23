import "./DaftarBuah.css"
import React, {useState, useEffect} from "react"
import axios from "axios"
const HooksWithAxios = () =>{
  const [daftarBuah, setDaftarBuah] =  useState(null)
  const [inputName, setInputName] =  useState("")
  const [InputWeight, setInputWeight] =  useState(0)
  const [InputPrice, setInputPrice] =  useState(0)
  const [currentId, setCurrentId] =  useState(null)

  useEffect( () => {
    if (daftarBuah === null){
      axios.get(`http://backendexample.sanbercloud.com/api/fruits`)
      .then(res => {
        let data = res.data
        setDaftarBuah(data.map(el=> {return {id: el.id, name: el.name,price:el.price,weight:el.weight}}))
      })
    }
  }, [daftarBuah])
 const handleSubmit = (event) =>{
    event.preventDefault()

    if (currentId === null){
      // untuk create data baru
      axios.post(`http://backendexample.sanbercloud.com/api/fruits`, {name: inputName,price:InputPrice,weight:InputWeight})
      .then(res => {
          let data = res.data
          setDaftarBuah([...daftarBuah, {id: data.id, name: data.name,price:data.price,weight:data.weight}])
      })
    }else{
      axios.put(`http://backendexample.sanbercloud.com/api/fruits/${currentId}`, {name: inputName,weight:InputWeight,price:InputPrice})
      .then(() => {
          let singleBuah = daftarBuah.find(el=> el.id === currentId)
          singleBuah.name= inputName
          singleBuah.weight= InputWeight
          singleBuah.price= InputPrice
          setDaftarBuah([...daftarBuah])
      })      
    }
    setInputName("")
    setInputPrice("")
    setInputWeight(0)
    setCurrentId(null)
  }

  const handleChange = (event) =>{
    
    let typeOfInput=event.target.name
    switch(typeOfInput)
    {
      case "name":
      {
        let inputValue = event.target.value
        setInputName(inputValue)
        break
      }
      case "price":
      {
        let inputValue = event.target.value
        setInputPrice(inputValue)
        break
      }
      case "weight":
      {
        let inputValue = event.target.value
        setInputWeight(inputValue)
        break
      }
      default:
      {
        break;
      }
    }
  }

  const handleEdit = (event) =>{
    let idBuah = event.target.value
    axios.get(`http://backendexample.sanbercloud.com/api/fruits/${idBuah}`)
    .then(res => {
      let data = res.data
      setInputName(data.name)
      setInputPrice(data.price)
      setInputWeight(data.weight)
      setCurrentId(data.id)
    })
  }

  const handleDelete = (event) =>{
    let idBuah = parseInt(event.target.value)
    axios.delete(`http://backendexample.sanbercloud.com/api/fruits/${idBuah}`)
    .then(() => {
      let newDaftarBuah = daftarBuah.filter(el=> {return el.id !== idBuah})
      setDaftarBuah(newDaftarBuah)
    })
  }


    return(
      <>
      { daftarBuah !== null &&
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
                  daftarBuah.map((item, index)=>{
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
         
          {/* Form */}
           <h1>Form Daftar Harga Buah</h1>
        <div style={{width: "50%", margin: "0 auto", display: "block"}}>
          <div style={{border: "1px solid #aaa", padding: "20px"}}>
            <form onSubmit={handleSubmit}>
              <label style={{float: "left"}}>
                Nama:
              </label>
              <input style={{float: "right"}} type="text" required name="name" value={inputName} onChange={handleChange}/>
              <br/>
              <br/>
              <label style={{float: "left"}}>
                Harga:
              </label>
              <input style={{float: "right"}} type="text" required name="price" value={InputPrice} onChange={handleChange}/>
              <br/>
              <br/>
              <label style={{float: "left"}}>
                Berat (dalam gram):
              </label>
              <input style={{float: "right"}} type="number" required name="weight" value={InputWeight} onChange={handleChange}/>
              <br/>
              <br/>
              <div style={{width: "100%", paddingBottom: "20px"}}>
                <button style={{ float: "right"}}>submit</button>
              </div>
            </form>
          </div>
        </div>
        </div>)
      }

     
      </>
    
  )
}


export default HooksWithAxios
