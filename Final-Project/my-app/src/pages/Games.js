import React, {useState, useEffect} from "react"
import axios from "axios"

import "./Games.css"

import { Form,Alert, Input, Button, Card } from 'antd';
const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};
const Game = () => {
  const [status, setStatus]  =  useState({
    showModalError: null,
    showModalSuccess:null
  })
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
  const [form] = Form.useForm();

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
  const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo);
     setStatus({...status, showModalError:true});
      setStatus({...status, showModalSuccess:false});
  };
  const onFinish = (input) =>{
   
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
          release: input.release,
          image_url: input.image_url
        },{headers: {"Authorization" : "Bearer "+ token}})
        .then(res => {
            setGames([...games, {id: res.data.id, ...input}])
            setStatus({...status, showModalError:false});
            setStatus({...status, showModalSuccess:true});
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
            
        })
      }else if(statusForm === "edit"){
        var token=(JSON.parse(localStorage.getItem("user"))['token'])
        console.log('aneh')
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
            singleGame.release = input.release
            singleGame.image_url = input.image_url
            setGames([...games])
            console.log('masuk')            
            setStatus({...status, showModalError:false});
            setStatus({...status, showModalSuccess:true});
        })
      }
      
      setStatusForm("create")
      setSelectedId(0)
      form.setFieldsValue({
         genre: "",
        image_url: "",
        singlePlayer:true,
        multiplayer:false,
        name:"",
        platform:"",
        release:""
      });
      
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
      form.setFieldsValue({
        genre: singleGame.genre,
        singlePlayer: singleGame.singlePlayer,
        multiplayer: singleGame.multiplayer,
        name: singleGame.name,
        platform:singleGame.platform,
        release: singleGame.release,
        image_url: singleGame.image_url
      });
      setInput({
        genre: singleGame.genre,
        singlePlayer: singleGame.singlePlayer,
        multiplayer: singleGame.multiplayer,
        name: singleGame.name,
        platform:singleGame.platform,
        release: singleGame.release,
        image_url: singleGame.image_url
      })
      console.log(input)
      setSelectedId(itemId)
      setStatusForm("edit")
    }

    return(
      <>
        <button   onClick={() => handleEdit(itemId)}>Edit</button>
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
        <div className="site-card-border-less-wrapper">
    
    {
        status.showModalError &&
         <Alert type='error' message='Gagal Perbaharui Data' banner />
   }
    {
        status.showModalSuccess &&
         <Alert type='success' message='Berhasil Perbaharui Data' banner />
   }
   <Card title="Game Form" bordered={false} >
      <Form
      {...layout}
      name="basic"
      form={form} 
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
    >
      <Form.Item
        label="Name"
        name="name"
        rules={[{ required: true, message: 'Please input your name!' }]}
        onChange={handleChange} value={input.name}
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
        label="Platform"
        name="platform"
        rules={[{ required: true, message: 'Please input your platform!' }]}
        onChange={handleChange} value={input.platform}
      >
        <Input />
      </Form.Item>
        <Form.Item
        label="Single Player"
        name="singlePlayer"
        rules={[{ required: true, message: 'Please input your single player!' }]}
        onChange={handleChange} value={input.singlePlayer}
      >
        <Input />
      </Form.Item>
       <Form.Item
        label="Multi Player"
        name="multiplayer"
        rules={[{ required: true, message: 'Please input your multiplayer!' }]}
        onChange={handleChange} value={input.multiplayer}
      >
        <Input />
      </Form.Item>

        <Form.Item
        label="Release"
        name="release"
        rules={[{ required: true, message: 'Please input your release!' }]}
        onChange={handleChange} value={input.release}
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

export default Game