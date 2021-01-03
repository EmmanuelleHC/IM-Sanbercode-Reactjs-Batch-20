import React, {useState, useEffect} from "react"
import axios from "axios"
import "./Games.css"

const Games = () => {
  
  const [games, setGames] =  useState(null)
  const [input, setInput]  =  useState({
    genre: "",
    image_url: "",
    singlePlayer: true,
    multiplayer:false,
    name:"",
    platform: "",
    release: ""
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
            image_url: el.image_url,
            singlePlayer: el.singlePlayer,
            multiplayer: el.multiplayer,
            name: el.name,
            platform: el.platform,
            release: el.release
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
      case "image_url":
      {
        setInput({...input, image_url: event.target.value});
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
    default:
      {break;}
    }
  }

  const handleSubmit = (event) =>{
    // menahan submit
    event.preventDefault()

    let genre = input.genre
    console.log(input)

    if (genre.replace(/\s/g,'') !== ""){      
      if (statusForm === "create"){ 
        axios.post(`https://backendexample.sanbersy.com/api/data-game`, {
          genre: input.genre,
          image_url: input.image_url,
          singlePlayer: input.singlePlayer,    
          multiplayer: input.multiplayer,
          name: input.name,
          platform: input.platform,
          release: input.release
        })
        .then(res => {
            setGames([...games, {id: res.data.id, ...input}])
        })
      }else if(statusForm === "edit"){
        axios.put(`https://backendexample.sanbersy.com/api/data-game/${selectedId}`, {
          genre: input.genre,
          image_url: input.image_url,
          singlePlayer: input.singlePlayer,    
          multiplayer: input.multiplayer,
          name: input.name,
          platform: input.platform,
          release: input.release
        })
        .then(res => {
            let singleGame = games.find(el=> el.id === selectedId)
            singleGame.genre = input.genre
            singleGame.singlePlayer = input.singlePlayer
            singleGame.multiplayer = input.multiplayer
            singleGame.name = input.name
            singleGame.platform = input.platform
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
        singlePlayer: true,
        multiplayer:false,
        name:"",
        platform: "",
        release: ""
      })
    }

  }

  const Action = ({itemId}) =>{
    const handleDelete = () => {  
      let newGames = games.filter(el => el.id !== itemId)
  
      axios.delete(`https://backendexample.sanbersy.com/api/data-game/${itemId}`)
      .then(res => {
        console.log(res)
      })
            
      setGames([...newGames])
      
    }
    
    const handleEdit = () =>{
      let singleGame = games.find(x=> x.id === itemId)
      setInput({
        title: singleGame.title,
        description: singleGame.description,
        review: singleGame.review,
        release_year: singleGame.release_year,
        totalPage: singleGame.totalPage,
        price: singleGame.price,
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
            image_url: el.image_url,
            singlePlayer: el.singlePlayer,
            multiplayer: el.multiplayer,
            name: el.name,
            platform: el.platform,
            release: el.release
        }
      })

      let filteredGames = resGames.filter(x=> x.genre.toLowerCase().indexOf(search.toLowerCase()) !== -1)
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

      <h1>Daftar Games</h1>
      <table>
        <thead>
          <tr>
            <th>No</th>
            <th>Genre</th>
            <th>Image Url</th>
            <th>Single Player</th>
            <th>Multi Player</th>
            <th>Name</th>
            <th>Platform</th>
            <th>Release</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
            {
              games !== null && games.map((item, index)=>{
                return(                    
                  <tr key={index}>
                    <td>{index+1}</td>
                    <td>{item.genre}</td>
                    <td>{item.image_url}</td>
                    <td>{item.singlePlayer}</td>
                    <td>{item.multiplayer}</td>
                    <td>{item.name}</td>
                    <td>{item.platform}</td>
                    <td>{item.release}</td>
                    <td>{item.action}</td>
                    <td>
                      <Action itemId={item.id} />

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

export default Games