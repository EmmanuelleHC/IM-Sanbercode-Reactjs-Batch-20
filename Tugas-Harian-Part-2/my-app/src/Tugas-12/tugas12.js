
import React, {Component} from 'react'
let dataHargaBuah = [
  {nama: "Semangka", harga: 10000, berat: 1000},
  {nama: "Anggur", harga: 40000, berat: 500},
  {nama: "Strawberry", harga: 30000, berat: 400},
  {nama: "Jeruk", harga: 30000, berat: 1000},
  {nama: "Mangga", harga: 30000, berat: 500}
]
class Lists extends Component{
/*
  constructor(props){
    super(props)
    this.state ={
     dataHargaBuah : [
  {nama: "Semangka", harga: 10000, berat: 1000},
  {nama: "Anggur", harga: 40000, berat: 500},
  {nama: "Strawberry", harga: 30000, berat: 400},
  {nama: "Jeruk", harga: 30000, berat: 1000},
  {nama: "Mangga", harga: 30000, berat: 500}
]   ,
     inputName : ""  ,  
       inputHarga : 0 ,
       inputBerat:0  

    }
    this.handleChange = this.handleChange.bind(this);
 
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  	 handleChange(event){

  	 	const name=event.target.name;
  	 	const value=event.target.value;
    this.setState({[name]: value});
  }*/
   constructor(props){
    super(props)
     this.state ={
     dataHargaBuah : [
      {nama: "Semangka", harga: 10000, berat: 1000},
      {nama: "Anggur", harga: 40000, berat: 500},
      {nama: "Strawberry", harga: 30000, berat: 400},
      {nama: "Jeruk", harga: 30000, berat: 1000},
      {nama: "Mangga", harga: 30000, berat: 500}
     ],
      inputName  :"",  
      inputHarga :"",
      inputBerat :0  ,
      indexOfForm:-1
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleEdit=this.handleEdit.bind(this);
    this.handleDelete=this.handleDelete.bind(this);
  }
  
  handleDelete(event){
    let index=event.target.value;
    let newDaftarBuah=this.state.dataHargaBuah;
    let editedDataBuah=newDaftarBuah[this.state.indexOfForm];
    newDaftarBuah.splice(index,1)
    if(editedDataBuah !== undefined)
    {
        var newIndex=newDaftarBuah.findIndex((el)=>el===editedDataBuah)
        this.setState({dataHargaBuah:newDaftarBuah,indexOfForm:newIndex})
    }else{
        this.setState({dataHargaBuah:newDaftarBuah})
    }
  }
  handleEdit(event){
    let index=event.target.value;
    let dataBuah=this.state.dataHargaBuah[index];
    this.setState({
      inputName:dataBuah.nama,
      inputHarga:dataBuah.harga,
      inputBerat:dataBuah.berat,
      indexOfForm:index
    })
    
  }
  handleChange(event){
    let typeOfInput=event.target.name
    switch(typeOfInput)
    {
      case "name":
      {
        this.setState({inputName:event.target.value});
        break
      }
      case "harga":
      {
        this.setState({inputHarga:event.target.value});
        break
      }
      case "berat":
      {
        this.setState({inputBerat:event.target.value});
        break
      }
      default:
      {
        break;
      }
    }
  }
  handleSubmit(event){
    event.preventDefault()
    let nama=this.state.inputName
    let harga=this.state.inputHarga
    let berat=this.state.inputBerat
    let newDaftarBuah=this.state.dataHargaBuah
    let index=this.state.indexOfForm
    if(index===-1)
    {
      newDaftarBuah=[...newDaftarBuah,{nama,harga,berat}]
    }else{
      newDaftarBuah[index]={nama,harga,berat}
    }
    this.setState({
      dataHargaBuah:newDaftarBuah,
      inputName:"",
      inputHarga:"",
      inputBerat:0
    })
  }
  render(){
    return(
      <>
        <h1>Tabel Harga Buah</h1>
        <table id="tblContent">
          <thead>
            <tr>
                <th>No</th>
                <th>Nama</th>
                <th>Harga</th>
                <th>Buah</th>
                <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
              {
                this.state.dataHargaBuah.map((val, index)=>{
                  return(                    
                    <tr key={index}>
                      <td>{index+1}</td>
                      <td>{val.nama}</td>
                      <td>{val.harga}</td>
                      <td>{val.berat} kg</td>
                      <td><button onClick={this.handleEdit} value={index}>Edit</button>
                      <button onClick={this.handleDelete} value={index}>Delete</button></td>
                    </tr>
                  )
                })
              }
          </tbody>
        </table>
         {/* Form */}
        <h1>Form Input Data Buah</h1>
        <form onSubmit={this.handleSubmit}>
          <label>
            Masukkan nama buah:
          </label>          
          <input type="text"  name="name" value={this.state.inputName} onChange={this.handleChange}/>
           <label>
            Masukkan berat:
          </label>          
          <input type="text" name="berat" value={this.state.inputBerat} onChange={this.handleChange}/>
        	<label>
            Masukkan harga:
          </label>          
          <input type="text" name="harga" value={this.state.inputHarga} onChange={this.handleChange}/>
        

          <button>submit</button>
        </form>
      </>
    )
  }
}
export default Lists