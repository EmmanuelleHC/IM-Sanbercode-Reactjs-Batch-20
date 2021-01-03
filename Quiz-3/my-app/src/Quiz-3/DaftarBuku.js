import React from "react"
import {DaftarBukuProvider} from "./DaftarBukuContext"
import DaftarBukuList from "./DaftarBukuList"
import DaftarBukuForm from "./DaftarBukuForm"
import "./DaftarBuku.css"

const DaftarBuku = () =>{
  return(
    <>
      <DaftarBukuProvider>
        <DaftarBukuList/>
        <DaftarBukuForm/>
      </DaftarBukuProvider>
    </>
  )
}

export default DaftarBuku
