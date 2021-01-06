import React, { useContext, useState } from "react"
import {UserContext} from "../context/UserContext"
import axios from "axios"
import { Form,Alert, Input, Button, Checkbox,Card } from 'antd';
import "./Login.css"

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

const ChangePassword = () =>{
  const [, setUser] = useContext(UserContext)
  const [input, setInput] = useState({current_password: "", new_password: "" , new_confirm_password: ""})
  const [status, setStatus]  =  useState({
    showModalError: null,
    showModalSuccess: null,
  })
  const onFinish = input =>{
  
    
    var token=(JSON.parse(localStorage.getItem("user"))['token'])
    axios.post("https://backendexample.sanbersy.com/api/change-password", {
      current_password: input.current_password, 
      new_password: input.new_password, 
      new_confirm_password: input.new_confirm_password
    },{headers: {"Authorization" : "Bearer "+ token}}).then(
      (res)=>{
        setStatus({...status, showModalError:false});
        setStatus({...status, showModalSuccess:true});


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
     <div className="site-card-border-less-wrapper">
    {
        status.showModalSuccess &&
         <Alert type='success' message='Success to Change Password' banner />
   }
    {
        status.showModalError &&
         <Alert type='error' message='Failed to Change Password' banner />
   }
   <Card title="Change Password" bordered={false} >
      <Form
      {...layout}
      name="basic"
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
    >
      <Form.Item
        label="Current Password"
        name="current_password"
        rules={[{ required: true, message: 'Please input your current password!' }]}
        onChange={handleChange} value={input.current_password}
      >
       <Input.Password />
      </Form.Item>
      <Form.Item
        label="New Password"
        name="new_password"
        rules={[{ required: true, message: 'Please input your new password!' }]}
        onChange={handleChange} value={input.new_password}
      >
       <Input.Password />
      </Form.Item>
      <Form.Item
        label="Confirm Password"
        name="new_confirm_password"
        rules={[{ required: true, message: 'Please input your new confirm password!' }]}
        onChange={handleChange} value={input.new_confirm_password}
      >
       <Input.Password />
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

export default ChangePassword