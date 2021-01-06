import React, {useState, useEffect} from "react"
import axios from "axios"
import "./Games.css"

import { Button } from 'antd';

const Game = () => {
  
  const [games, setGames] =  useState(null)
  const [input, setInput]  =  useState({
   
    genre: "",
    image_url: "",
    singlePlayer:true,
    multiplayer:false,
    name:"",
    platform:"",
    release:""


  })
  const [selectedId, setSelectedId]  =  useState(0)
  const [statusForm, setStatusForm]  =  useState("create")
  const [search, setSearch] = useState("")

  useEffect( () => {
    if (games === null){
      axios.get(`https://backendexample.sanbersy.com/api/data-game`)
      .then(res => {
          setGames(res.data.map(el=>{ return {
            id: el.id, 
            genre: el.genre,
            singlePlayer: el.singlePlayer,
            multiplayer: el.multiplayer,
            name: el.name,
            platform: el.platform,
            release: el.release,
            image_url: el.image_url
          }
        }))
      })
    }
  }, [games])
  
  const handleChange = (event) =>{
    let typeOfInput = event.target.name

    switch (typeOfInput){
      case "genre":
      {
        setInput({...input, genre: event.target.value});
        break
      }
      case "singlePlayer":
      {
        setInput({...input, singlePlayer: event.target.value});
        break
      }
      case "multiplayer":
      {
        setInput({...input, multiplayer: event.target.value});
          break
      }
      case "name":
      {
        setInput({...input, name: event.target.value});
          break
      }
      case "platform":
        {
          setInput({...input, platform: event.target.value});
            break
        }
      case "release":
        {
          setInput({...input, release: event.target.value});
            break
        }
      case "image_url":
        {
          setInput({...input, image_url: event.target.value});
            break
        }
     
    default:
      {break;}
    }
  }

  const handleSubmit = (event) =>{
    // menahan submit
    event.preventDefault()

    let name = input.name
    console.log(input)

    if (name.replace(/\s/g,'') !== ""){      
      if (statusForm === "create"){ 
       var token=(JSON.parse(localStorage.getItem("user"))['token'])
           
        axios.post(`https://backendexample.sanbersy.com/api/data-game`, {
          genre: input.genre,
          singlePlayer: input.singlePlayer,
          multiplayer: input.multiplayer,
          name: input.name,
          platform: input.rating,
          release: input.release,
          image_url: input.image_url
        },{headers: {"Authorization" : "Bearer "+ token}})
        .then(res => {
            setGames([...games, {id: res.data.id, ...input}])
        })
      }else if(statusForm === "edit"){
        var token=(JSON.parse(localStorage.getItem("user"))['token'])
    
        axios.put(`https://backendexample.sanbersy.com/api/data-game/${selectedId}`, {
          genre: input.genre,
          singlePlayer: input.singlePlayer,
          multiplayer: input.multiplayer,
          name: input.name,
          platform: input.platform,
          release: input.release,
          image_url: input.image_url
        },{headers: {"Authorization" : "Bearer "+ token}})
        .then(res => {
            let singleGame = games.find(el=> el.id === selectedId)
            singleGame.genre = input.genre
            singleGame.singlePlayer = input.singlePlayer
            singleGame.multiplayer = input.multiplayer
            singleGame.name = input.name
            singleGame.rating = input.rating
            singleGame.release = input.release
            singleGame.image_url = input.image_url
            setGames([...games])
        })
      }
      
      setStatusForm("create")
      setSelectedId(0)
      setInput({
        genre: "",
        image_url: "",
        singlePlayer:true,
        multiplayer:false,
        name:"",
        platform:"",
        release:""



      })
    }

  }

  const Action = ({itemId}) =>{
    const handleDelete = () => {  
      let newGame = games.filter(el => el.id !== itemId)
      var token=(JSON.parse(localStorage.getItem("user"))['token'])
   
      axios.delete(`https://backendexample.sanbersy.com/api/data-game/${itemId}`,{headers: {"Authorization" : "Bearer "+ token}})
      .then(res => {
        console.log(res)
      })
            
      setGames([...newGame])
      
    }
    
    const handleEdit = () =>{
      let singleGame = games.find(x=> x.id === itemId)
      setInput({
        genre: singleGame.genre,
        singlePlayer: singleGame.singlePlayer,
        multiplayer: singleGame.multiplayer,
        name: singleGame.name,
        platform:singleGame.platform,
        rating: singleGame.rating,
        release: singleGame.release,
        image_url: singleGame.image_url
      })
      setSelectedId(itemId)
      setStatusForm("edit")
    }

    return(
      <>
        <button onClick={handleEdit}>Edit</button>
        &nbsp;
        <button onClick={handleDelete}>Delete</button>
      </>
    )
  }

  function truncateString(str, num) {
    if (str === null){
      return ""
    }else{
      if (str.length <= num) {
        return str
      }
      return str.slice(0, num) + '...'
    }
  }
  

  const submitSearch = (e) =>{
    e.preventDefault()
    axios.get(`https://backendexample.sanbersy.com/api/data-game`)
    .then(res => {
      let resGames = res.data.map(el=>{ return {
          id: el.id, 
          genre: el.genre, 
          singlePlayer: el.singlePlayer,
          multiplayer: el.multiplayer,
          name: el.name,
          rating: el.rating,
          release: el.release,
          image_url: el.image_url
        }
      })

      let filteredGames = resGames.filter(x=> x.name.toLowerCase().indexOf(search.toLowerCase()) !== -1)
      setGames([...filteredGames])
    })
 
  }

  const handleChangeSearch = (e)=>{
    setSearch(e.target.value)
  }

  return(
    <>
      <div>
        <form onSubmit={submitSearch}>
          <input type="text" value={search} onChange={handleChangeSearch} />
          <button>search</button>
        </form>
      </div>

      <h1>Daftar Game</h1>
      <table>
        <thead>
          <tr>
            <th>No</th>
            <th>Name</th>
            <th>Genre</th>
            <th>Single Player</th>
            <th>Multi Player</th>
            <th>Platform</th>
            <th>Release</th>
            <th>Image Url</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
            {
              games !== null && games.map((item, index)=>{
                return(                    
                  <tr key={index}>
                    <td>{index+1}</td>
                    <td>{item.name}</td>
                    <td>{item.genre}</td>
                    <td>{item.singlePlayer}</td>
                    <td>{item.multiplayer}</td>
                    <td>{item.platform}</td>
                    <td>{item.release}</td>
                    <td>{item.image_url}</td>
                    <td>
                      <Action itemId={item.id} />

                    </td>
                  </tr>
                )
              })
            }
        </tbody>
      </table>
      {/* Form */}
      <h1>Game Form</h1>
      <form style={{textAlign: "left"}} onSubmit={handleSubmit}>
        <div>
          <label style={{display: "inline-block", width: "150px"}}>
            Name:
          </label>
          <input style={{display: "inline-block", width: "60%"}} type="text" name="name" value={input.name} onChange={handleChange}/>
          <br/>
          <br/>
        </div>
        <div style={{marginTop: "20px"}}>
          <label style={{display: "inline-block", width: "150px"}}>
            Genre:
          </label>
          <input style={{display: "inline-block", width: "60%"}} type="text" name="genre" value={input.genre} onChange={handleChange}/>
         <br/>
          <br/>
        </div>
        <div style={{marginTop: "20px"}}>
          <label style={{display: "inline-block", width: "150px"}}>
            Platform:
          </label>
          <input style={{display: "inline-block", width: "60%"}} type="text" name="platform" value={input.platform} onChange={handleChange}/>
         <br/>
          <br/>
        </div>
        <div style={{marginTop: "20px"}}>
          <label style={{display: "inline-block", width: "150px"}}>
            Single Player:
          </label>
          <input style={{display: "inline-block", width: "60%"}} type="text" name="singlePlayer" value={input.singlePlayer} onChange={handleChange}/>
         <br/>
          <br/>
        </div>
         <div style={{marginTop: "20px"}}>
          <label style={{display: "inline-block", width: "150px"}}>
            Multi Player:
          </label>
          <input style={{display: "inline-block", width: "60%"}} type="text" name="multiplayer" value={input.multiplayer} onChange={handleChange}/>
         <br/>
          <br/>
        </div>
         <div style={{marginTop: "20px"}}>
          <label style={{display: "inline-block", width: "150px"}}>
            Release:
          </label>
          <input style={{display: "inline-block", width: "60%"}} type="text" name="release" value={input.release} onChange={handleChange}/>
         <br/>
          <br/>
        </div>
         
        <div style={{marginTop: "20px"}}>
          <label style={{display: "inline-block", width: "150px"}}>
            Image Url:
          </label>
          <textarea style={{display: "inline-block"}} cols="50" rows="3" type="text" name="image_url" value={input.image_url} onChange={handleChange}/>
           <button>submit</button>
          <br/>
          <br/>
        </div>
        <div style={{marginTop: "20px"}}>
          
        </div>
       
      </form>
    </>
  )
}

export default Game