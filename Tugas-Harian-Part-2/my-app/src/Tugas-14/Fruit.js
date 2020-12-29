import React from "react"
import {FruitProvider} from "./FruitContext"
import FruitList from "./FruitList"
import FruitForm from "./FruitForm"
import "./Fruit.css"

const Fruit = () =>{
  return(
    <div style={{width: "50%", margin: "0 auto"}}>
      <FruitProvider>
        <FruitList/>
        <FruitForm/>
      </FruitProvider>
    </div>
  )
}

export default Fruit
