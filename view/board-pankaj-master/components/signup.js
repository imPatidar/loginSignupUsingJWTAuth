import { Form, Input, Button, Checkbox } from 'antd';
import {useState,useEffect} from "react";
import { message} from 'antd';
import Router from 'next/router'


import AuthRepo from '../repository/authRepo';

import axios from 'axios';

const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
};
const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
};

const Signup = () => {

    const [loginResponse,setloginResponse] = useState('');
    const [email,setEmail] = useState('');
    const [firstName,setFirstName] = useState('');
    const [lastName,setLastName] = useState('');
    const [password,setPassword] = useState('');
    const [error,setError] = useState('');

    const onFinish = values => {
        console.log('Success:', values);

    };

    const onFinishFailed = errorInfo => {
        console.log('Failed:', errorInfo);
    };

    const onSubmit = ()=>{
        let user = {firstName:firstName,lastName:lastName,email:email,password:password};
        console.log(user);
        let x = new AuthRepo();
        axios
            .post(x.signup,user)
            .then(res=>{message.info('User Created! Please login now');Router.push('/')})
            .catch(err=>{if(err.statusCode==409);setError("Auth Failed! User Already exists")})
    }



    return (
        <Form>
            <p style={{color:'red'}}>{error}</p>
            <p style={{color:'green'}}>{loginResponse}</p>
            <Form.Item
                label="First Name"
                name="firstName"
                onChange={event => setFirstName(event.target.value)}
                rules={[{ required: true, message: 'Please input your first name!' }]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                label="Last Name"
                name="lastName"
                onChange={event => setLastName(event.target.value)}
                rules={[{ required: true, message: 'Please input your first last name!' }]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                label="Email"
                name="email"
                onChange={event => setEmail(event.target.value)}
                rules={[{ required: true, message: 'Please input your first email!' }]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                label="Password"
                name="password"
                onChange={event => setPassword(event.target.value)}
                rules={[{ required: true, message: 'Please input your password!' }]}
            >
                <Input.Password />
            </Form.Item>

            <Form.Item {...tailLayout}>
                <Button type="primary" htmlType="submit" onClick={onSubmit}>
                    Submit
                </Button>
            </Form.Item>
        </Form>
    );
};

export default Signup;