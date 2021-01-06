import React, { useContext, useState } from "react"
import {UserContext} from "../context/UserContext"
import axios from "axios"

const ChangePassword = () =>{
  const [, setUser] = useContext(UserContext)
  const [input, setInput] = useState({current_password: "", new_password: "" , new_confirm_password: ""})

  const handleSubmit = (event) =>{
    event.preventDefault()
    
    var token=(JSON.parse(localStorage.getItem("user"))['token'])
    axios.post("https://backendexample.sanbersy.com/api/change-password", {
      current_password: input.current_password, 
      new_password: input.new_password, 
      new_confirm_password: input.new_confirm_password
    },{headers: {"Authorization" : "Bearer "+ token}}).then(
      (res)=>{
       console.log(res)
      }
    ).catch((err)=>{
      alert(err)
    })
  }

  const handleChange = (event) =>{
    let value = event.target.value
    let name = event.target.name
    switch (name){
      case "current_password":{
        setInput({...input, current_password: value})
        break;
      }
      case "new_password":{
        setInput({...input, new_password: value})
        break;
      }
      case "new_confirm_password":{
        setInput({...input, new_confirm_password: value})
        break;
      }
      default:{break;}
    }
  }

  return(
    <>
      <div style={{margin: "0 auto", width: "25%", padding: "50px"}}>
        <form onSubmit={handleSubmit}>
          <label>Current Password: </label>
          <input type="password" name="current_password" onChange={handleChange} value={input.current_password}/>
          <br/>
          <label>New Password: </label>
          <input type="password" name="new_password" onChange={handleChange} value={input.new_password}/>
          <br/>
          <label>Confirm Password: </label>
          <input type="password" name="new_confirm_password" onChange={handleChange} value={input.new_confirm_password}/>
          <br/>
          <button>Reset</button>
        </form>
      </div>
    </>
  )
}

export default ChangePassword