import React from 'react';

let dataHargaBuah = [
  {nama: "Semangka", harga: 10000, berat: 1000},
  {nama: "Anggur", harga: 40000, berat: 500},
  {nama: "Strawberry", harga: 30000, berat: 400},
  {nama: "Jeruk", harga: 30000, berat: 1000},
  {nama: "Mangga", harga: 30000, berat: 500}
]

class Tugas10 extends React.Component {
    render() {
    return (
      <>
            <h2><b>Tabel Harga Buah</b></h2>
                    <table id="tblContent">
                    <tr>
                <th>Nama</th>
                <th>Harga</th>
                <th>Buah</th>
            </tr>
            
        {dataHargaBuah.map(el=> {
          return (
          
          <tr>
            <td>{el.nama}</td>
            <td>{el.harga}</td>
            <td>{el.berat} kg</td>
            </tr>
           
          )
        })}
        </table>
      </>
    )
  }
}
export default Tugas10