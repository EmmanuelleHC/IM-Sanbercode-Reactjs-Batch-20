import React from 'react';


class Tugas9 extends React.Component {
  render() {
    return (
      <>
       <form id="formbeli">
        <h1>Form Pembelian Buah</h1>
        <table>
          <thead></thead>
          <tbody>
           <tr>
              <td>
                 <p>Nama Pelanggan:</p>
              </td>
              <td><input
                 type="text"
                 /></td>
           </tr>
           <tr>
              <td>
                 <p>
                    Daftar Item:
                 </p>
              </td>
              
           </tr>
           <tr>
              <td></td>
              <td>
                
                 <input type="checkbox" id="semangka" name="semangka" value="Semangka"></input>
                 <label >Semangka</label>
              </td>
              
              
            
           </tr>
           <tr>
              <td></td>
              <td>
              
              <input type="checkbox" id="jeruk" name="jeruk" value="Jeruk"></input>
                 <label> Jeruk</label>
              </td>
              
           </tr>
           <tr>
              <td></td>
              <td>
                 
                 <input type="checkbox" id="nanas" name="nanas" value="Nanas"></input>
                  <label >Nanas</label>
              </td>
             
           </tr>
           <tr>
              <td></td>
              <td>
               
                 <input type="checkbox" id="salak" name="salak" value="Salak"></input>
                <label>Salak</label>
              </td>
             
           </tr>
           <tr>
              <td></td>
              <td>
                 <input type="checkbox" id="anggur" name="anggur" value="Anggur"></input>
                <label >Anggur</label>
              </td>
             
           </tr>
           <tr>
              <td><button>Kirim</button></td>
           </tr>
           </tbody>
        </table>
        
        
      </form>
      </>
    )
  }
}

export default Tugas9