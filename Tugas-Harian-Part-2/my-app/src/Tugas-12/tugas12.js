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
  }
  handleSubmit(event){
    event.preventDefault()
    console.log(this.state.inputName)
    this.setState({
      dataHargaBuah: [...this.state.dataHargaBuah, this.state.inputan],
      inputan: {
      	nama:this.inputName,
      	harga:this.inputHarga,
      	berat:this.inputBerat
      }
    })
  }
  render(){
    return(
      <>
        <h1>Tabel Harga Buah</h1>
        <table id="tblContent">
          <thead>
            <tr>
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
                    <tr>
                     
                      <td>{val.nama}</td>
                      <td>{val.harga}</td>
                      <td>{val.berat} kg</td>
                      <td><button>Edit</button>
                      <button>Delete</button></td>
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