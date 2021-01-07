import React, {useState, useEffect} from "react"
import axios from "axios"
import { Form,Alert, Input, Button, Card } from 'antd';


import "./Movie.css"
const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};
const Movie = () => {
  const [status, setStatus]  =  useState({
    showModalError: null,
    showModalSuccess:null
  })
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
  const [form] = Form.useForm();
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
   const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo);
     setStatus({...status, showModalError:true});
      setStatus({...status, showModalSuccess:false});
  };
  const onFinish = (input) =>{
    

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
            setStatus({...status, showModalError:false});
            setStatus({...status, showModalSuccess:true});
            setSelectedId(0)
            form.setFieldsValue({
            description: "",
              duration:0,
              genre: "",
              image_url: "",
              rating:0,
              review:"",
              title:"",
              year:0
          });
            
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
            setStatus({...status, showModalError:false});
            setStatus({...status, showModalSuccess:true});
        })
      }
      
      setStatusForm("create")
      setSelectedId(0)
       form.setFieldsValue({
           description: "",
        duration:0,
        genre: "",
        image_url: "",
        rating:0,
        review:"",
        title:"",
        year:0
          });
      
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
     
       form.setFieldsValue({
            title: singleMovie.title,
        description: singleMovie.description,
        duration: singleMovie.duration,
        genre: singleMovie.genre,
        rating: singleMovie.rating,
        review: singleMovie.review,
        year: singleMovie.year,
        image_url: singleMovie.image_url
          });
      console.log(singleMovie)
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
     <div className="site-card-border-less-wrapper">
    
    {
        status.showModalError &&
         <Alert type='error' message='Gagal Perbaharui Data' banner />
   }
    {
        status.showModalSuccess &&
         <Alert type='error' message='Berhasil Perbaharui Data' banner />
   }
   <Card title="Movie Form" bordered={false} >
      <Form
      {...layout}
      name="basic"
      form={form} 
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
    >
      <Form.Item
        label="Title"
        name="title"
        rules={[{ required: true, message: 'Please input your title!' }]}
        onChange={handleChange} value={input.title}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Year"
        name="year"
        rules={[{ required: true, message: 'Please input your year!' }]}
        onChange={handleChange} value={input.year}
      >
        <Input />
      </Form.Item>
        <Form.Item
        label="Description"
        name="description"
        rules={[{ required: true, message: 'Please input your description!' }]}
        onChange={handleChange} value={input.description}
      >
        <Input />
      </Form.Item>
        <Form.Item
        label="Duration"
        name="duration"
        rules={[{ required: true, message: 'Please input your duration!' }]}
        onChange={handleChange} value={input.duration}
      >
        <Input />
      </Form.Item>
       <Form.Item
        label="Genre"
        name="genre"
        rules={[{ required: true, message: 'Please input your genre!' }]}
        onChange={handleChange} value={input.genre}
      >
        <Input />
      </Form.Item>
        <Form.Item
        label="Rating"
        name="rating"
        rules={[{ required: true, message: 'Please input your rating!' }]}
        onChange={handleChange} value={input.rating}
      >
        <Input />
      </Form.Item>
        <Form.Item
        label="Review"
        name="review"
        rules={[{ required: true, message: 'Please input your review!' }]}
        onChange={handleChange} value={input.review}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Image Url"
        name="image_url"
        rules={[{ required: true, message: 'Please input your image url!' }]}
        onChange={handleChange} value={input.image_url}
      >
        <Input />
      </Form.Item>

      
      

      <Form.Item {...tailLayout}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
    </Card>
  </div>
    
    </>
  )
}

export default Movie