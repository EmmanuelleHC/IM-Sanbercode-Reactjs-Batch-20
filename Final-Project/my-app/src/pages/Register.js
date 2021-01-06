import React, { useContext, useState } from "react"
import { Form,Alert, Input, Button, Checkbox,Card } from 'antd';
import {UserContext} from "../context/UserContext"
import axios from "axios"
import "./Login.css"
const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};
const Register = () =>{
  const [, setUser] = useContext(UserContext)
  const [input, setInput] = useState({name: "", email: "" , password: ""})
  const [status, setStatus]  =  useState({
    showModalError: null,
    showModalSuccess: null,
  })
 
  const onFinish = input =>{
    axios.post("https://backendexample.sanbersy.com/api/register", {
      name: input.name, 
      email: input.email, 
      password: input.password
    }).then(
      (res)=>{
        var user = res.data.user
        var token = res.data.token
        var currentUser = {name: user.name, email: user.email, token }
        setUser(currentUser)
        localStorage.setItem("user", JSON.stringify(currentUser))
        setStatus({...status, showModalSuccess:true});
        setStatus({...status, showModalError:false});

      }
    ).catch((err)=>{
       setStatus({...status, showModalError:true});
       setStatus({...status, showModalSuccess:false});
    })
  }
  const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo);
   
    setStatus({...status, showModalError:true});

    setStatus({...status, showModalSuccess:false});


  };

  const handleChange = (event) =>{
    let value = event.target.value
    let name = event.target.name
    switch (name){
      case "name":{
        setInput({...input, name: value})
        break;
      }
      case "email":{
        setInput({...input, email: value})
        break;
      }
      case "password":{
        setInput({...input, password: value})
        break;
      }
      default:{break;}
    }
  }

  return(
    <>
    <div className="site-card-border-less-wrapper">
    {
        status.showModalError &&
         <Alert type='error' message='Gagal register' banner />
   }
    
     {
        status.showModalSuccess &&
      <Alert type='success' message='Berhasil register' banner />
   }
       <Card title="Register" bordered={false} >

      <Form
      {...layout}
      name="basic"
      initialValues={{ remember: true }}
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
        label="Email"
        name="email"
        rules={[{ required: true, message: 'Please input your email!' }]}
        onChange={handleChange} value={input.email}
      >
        <Input />
      </Form.Item>
       <Form.Item
        label="Password"
        name="password"
        rules={[{ required: true, message: 'Please input your password!' }]}
        onChange={handleChange} value={input.password}
      >
        <Input.Password />
      </Form.Item>
      

      

      <Form.Item {...tailLayout}>
        <Button type="primary" htmlType="submit">
          Register
        </Button>
      </Form.Item>
    </Form>
    </Card>
  </div>
    </>
  )
}

export default Register