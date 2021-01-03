import { Form, Input, Button, Checkbox } from 'antd';
import React, { useContext, useState } from "react"
import {UserContext} from "../context/UserContext"
const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

const Login = () => {
 
  const [, setUser] = useContext(UserContext)
  const [input, setInput] = useState({username: "" , password: ""})

  
  const onFinish = input => {
    if (input.username === "admin" && input.password === "admin"){
      setUser({username: input.username})
      localStorage.setItem("user", JSON.stringify({username: "admin", password: "admin"}))
    }else{
      alert("username dan password gagal")
    }
  };

  const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo);
  };
  const handleChange = (event) =>{
    let value = event.target.value
    let name = event.target.name
    switch (name){
      case "username":{
        setInput({...input, username: value})
        break;
      }
      case "password":{
        setInput({...input, password: value})
        break;
      }
      default:{break;}
    }
  }
return (
    <Form
      {...layout}
      name="basic"
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
    >
      <Form.Item
        label="Username"
        name="username"
        rules={[{ required: true, message: 'Please input your username!' }]}
        onChange={handleChange} value={input.username}
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

      <Form.Item {...tailLayout} name="remember" valuePropName="checked">
        <Checkbox>Remember me</Checkbox>
      </Form.Item>

      <Form.Item {...tailLayout}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default Login