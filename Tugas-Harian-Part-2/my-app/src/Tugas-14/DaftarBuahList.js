import React, {useContext, useEffect} from "react"
import axios from "axios"
import {DaftarBuahContext} from "./DaftarBuahContext"

const DaftarBuahList = () =>{

  const [daftarBuah, setDaftarBuah] = useContext(DaftarBuahContext)

  useEffect( () => {
    if (daftarBuah.lists === null){
      axios.get(`http://backendexample.sanbercloud.com/api/fruits`)
      .then(res => {
        setDaftarBuah({
          ...daftarBuah, 
          lists: res.data.map(el=>{ 
            return {id: el.id,
              name: el.name, 
              price: el.price, 
              weight: el.weight 
            }
          })
        })
      })
    }
  }, [setDaftarBuah, daftarBuah])

  const handleEdit = (event) =>{
    let idDataBuah = parseInt(event.target.value)
    setDaftarBuah({...daftarBuah, selectedId: idDataBuah, statusForm: "changeToEdit"})
  }

  const handleDelete = (event) => {
    let idDataBuah = parseInt(event.target.value)

    let newLists = daftarBuah.lists.filter(el => el.id !== idDataBuah)

    axios.delete(`http://backendexample.sanbercloud.com/api/fruits/${idDataBuah}`)
    .then(res => {
      console.log(res)
    })
          
    setDaftarBuah({...daftarBuah, lists: [...newLists]})
    
  }

  return(
    <>
      <h1>Daftar Harga Buah</h1>
      <table>
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
              daftarBuah.lists !== null && daftarBuah.lists.map((item, index)=>{
                return(                    
                  <tr key={index}>
                    <td>{index+1}</td>
                    <td>{item.name}</td>
                    <td>{item.price}</td>
                    <td>{item.weight/1000} Kg</td>
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
    </>
  )
}

export default DaftarBuahList
