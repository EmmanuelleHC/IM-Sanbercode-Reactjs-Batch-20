
import './App.css';

import React from 'react';

function App() {
  return (
    <div className="App">
      <header className="App-header">
       <form>
        <h1>Form Pembelian Buah</h1>
        <table>
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
                 
              </td>
              <label for="semangka">Semangka</label>
           </tr>
           <tr>
              <td></td>
              <td><input type="checkbox" id="jeruk" name="jeruk" value="Jeruk"></input>
                
              </td>
               <label for="jeruk"> Jeruk</label>
           </tr>
           <tr>
              <td></td>
              <td>
                 <input type="checkbox" id="nanas" name="nanas" value="Nanas"></input>
              </td>
              <label for="vehicle1">Nanas</label>
           </tr>
           <tr>
              <td></td>
              <td>
                 <input type="checkbox" id="salak" name="salak" value="Salak"></input>
              </td>
              <label for="vehicle1">Salak</label>
           </tr>
           <tr>
              <td></td>
              <td>
                 <input type="checkbox" id="anggur" name="anggur" value="Anggur"></input>
              </td>
              <label for="vehicle1">Anggur</label>
           </tr>
           <tr>
              <td><button>Kirim</button></td>
           </tr>
        </table>
        
        
      </form>
       
      </header>
    </div>
  );
}

export default App;
