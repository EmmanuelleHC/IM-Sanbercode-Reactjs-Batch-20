import React, {useState, useEffect} from "react"
import axios from "axios"
import { Table } from 'antd';

import "./Movie.css"

const Movie = () => {
  
  const [movies, setMovies] =  useState(null)
  const [input, setInput]  =  useState({
   
    description: "",
    duration:0,
    genre: "",
    image_url: "",
    rating:0,
    review:"",
    title:"",
    year:0
  })
  const [selectedId, setSelectedId]  =  useState(0)
  const [statusForm, setStatusForm]  =  useState("create")
  const [search, setSearch] = useState("")

  useEffect( () => {
    if (movies === null){
      axios.get(`https://backendexample.sanbersy.com/api/data-movie`)
      .then(res => {
          setMovies(res.data.map(el=>{ return {
            id: el.id, 
            description: el.description,
            duration: el.duration,
            genre: el.genre,
            image_url: el.image_url,
            rating: el.rating,
            review: el.review,
            title: el.title,
            year: el.year
          }
        }))
      })
    }
  }, [movies])
  
  const handleChange = (event) =>{
    let typeOfInput = event.target.name

    switch (typeOfInput){
      case "description":
      {
        setInput({...input, description: event.target.value});
        break
      }
      case "duration":
      {
        setInput({...input, duration: event.target.value});
        break
      }
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
      case "rating":
        {
          setInput({...input, rating: event.target.value});
            break
        }
      case "review":
        {
          setInput({...input, review: event.target.value});
            break
        }
      case "title":
        {
          setInput({...input, title: event.target.value});
            break
        }
      case "year":
        {
          setInput({...input, year: event.target.value});
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

    let title = input.title
    console.log(input)

    if (title.replace(/\s/g,'') !== ""){      
      if (statusForm === "create"){  
        var token=(JSON.parse(localStorage.getItem("user"))['token'])
         
        axios.post(`https://backendexample.sanbersy.com/api/data-movie`, {
          title: input.title,
          description: input.description,
          duration: parseInt(input.duration),
          genre: input.genre,
          rating: parseInt(input.rating),
          review: input.review,
          year: parseInt(input.year),
          image_url: input.image_url

        },{headers: {"Authorization" : "Bearer "+ token}})
        .then(res => {
            setMovies([...movies, {id: res.data.id, ...input}])
        })
      }else if(statusForm === "edit"){
        var token=(JSON.parse(localStorage.getItem("user"))['token'])
       
        axios.put(`https://backendexample.sanbersy.com/api/data-movie/${selectedId}`, {
          title: input.title,
          description: input.description,
          duration: parseInt(input.duration),
          genre: input.genre,
          rating: parseInt(input.rating),
          review: input.review,
          year: parseInt(input.year),
          image_url: input.image_url
        },{headers: {"Authorization" : "Bearer "+ token}})
        .then(res => {
            let singleMovie = movies.find(el=> el.id === selectedId)
            singleMovie.title = input.title
            singleMovie.description = input.description
            singleMovie.duration = input.duration
            singleMovie.genre = input.genre
            singleMovie.rating = input.rating
            singleMovie.review = input.review
            singleMovie.year = input.year
            singleMovie.image_url = input.image_url
            setMovies([...movies])
        })
      }
      
      setStatusForm("create")
      setSelectedId(0)
      setInput({
        description: "",
        duration:0,
        genre: "",
        image_url: "",
        rating:0,
        review:"",
        title:"",
        year:0
      })
    }

  }

  const Action = ({itemId}) =>{
    const handleDelete = () => {  
      let newMovie = movies.filter(el => el.id !== itemId)
      var token=(JSON.parse(localStorage.getItem("user"))['token'])
       
      axios.delete(`https://backendexample.sanbersy.com/api/data-movie/${itemId}`,{headers: {"Authorization" : "Bearer "+ token}})
      .then(res => {
        console.log(res)
      })
            
      setMovies([...newMovie])
      
    }
    
    const handleEdit = () =>{
      let singleMovie = movies.find(x=> x.id === itemId)
      setInput({
        title: singleMovie.title,
        description: singleMovie.description,
        duration: singleMovie.duration,
        genre: singleMovie.genre,
        rating: singleMovie.rating,
        review: singleMovie.review,
        year: singleMovie.year,
        image_url: singleMovie.image_url
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
    axios.get(`https://backendexample.sanbersy.com/api/data-movie`)
    .then(res => {
      let resMovies = res.data.map(el=>{ return {
          id: el.id, 
          title: el.title, 
          description: el.description,
          duration: el.duration,
          genre: el.genre,
          rating: el.rating,
          review: el.review,
          year: el.year,
          image_url: el.image_url
        }
      })

      let filteredMovies = resMovies.filter(x=> x.title.toLowerCase().indexOf(search.toLowerCase()) !== -1)
      setMovies([...filteredMovies])
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

      <h1>Daftar Movie</h1>
      <table>
        <thead>
          <tr>
            <th>No</th>
            <th>Title</th>
            <th>Year</th>
            <th>Description</th>
            <th>Duration</th>
            <th>Genre</th>
            <th>Rating</th>
            <th>Review</th>
            <th>Image Url</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
            {
              movies !== null && movies.map((item, index)=>{
                return(                    
                  <tr key={index}>
                    <td>{index+1}</td>
                    <td>{item.title}</td>
                    <td>{item.year}</td>
                    <td title={item.description}>{truncateString(item.description, 20)}</td>
                    <td>{item.duration}</td>
                    <td>{item.genre}</td>
                    <td>{item.rating}</td>
                    <td>{item.review}</td>
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
      <h1>Movie Form</h1>
      <form style={{textAlign: "left"}} onSubmit={handleSubmit}>
        <div>
          <label style={{display: "inline-block", width: "150px"}}>
            Title:
          </label>
          <input style={{display: "inline-block", width: "60%"}} type="text" name="title" value={input.title} onChange={handleChange}/>
          <br/>
          <br/>
        </div>
        <div style={{marginTop: "20px"}}>
          <label style={{display: "inline-block", width: "150px"}}>
            Year:
          </label>
          <input style={{display: "inline-block"}} type="number" max={2020} min={1980}  name="year" value={input.year} onChange={handleChange}/>
          <br/>
          <br/>
        </div>
        <div>
          <label style={{display: "inline-block", width: "150px"}}>
            Description:
          </label>
          <textarea style={{display: "inline-block"}} cols="50" rows="3" type="text" name="description" value={input.description} onChange={handleChange}/>
          <br/>
          <br/>
        </div>
        <div>
          <label style={{display: "inline-block", width: "150px"}}>
            Duration:
          </label>
           <input style={{display: "inline-block", width: "60%"}} type="number" name="duration" value={input.duration} onChange={handleChange}/>
         
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
        <div>
          <label style={{display: "inline-block", width: "150px"}}>
            Rating:
          </label>
           <input style={{display: "inline-block", width: "60%"}} type="number" name="rating" value={input.rating} onChange={handleChange}/>
         
         <br/>
          <br/>
        </div>
        <div>
          <label style={{display: "inline-block", width: "150px"}}>
            Review:
          </label>
          <textarea style={{display: "inline-block"}} cols="50" rows="3" type="text" name="review" value={input.review} onChange={handleChange}/>
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
        <br/>
        <br/>
        
      </form>
    </>
  )
}

export default Movie