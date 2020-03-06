import { Form, Input, Button, Checkbox } from 'antd';
import {useState,useEffect} from "react";
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
    const [password,setPassword] = useState('');
    const [error,setError] = useState('');

    const onFinish = values => {
        console.log('Success:', values);

    };

    const onFinishFailed = errorInfo => {
        console.log('Failed:', errorInfo);
    };

    const onSubmit = ()=>{

        let x = new AuthRepo();
        axios
            .post(x.login,{email:email,password:password})
            .then(res=>{localStorage.setItem('token',res.data.token);Router.push('/contact')})
            .catch(err=>{console.log(err);setError(err.message)})
    }



    return (
        <Form>
            <p style={{color:'red'}}>{error}</p>
            <p style={{color:'green'}}>{loginResponse}</p>
            <Form.Item
                label="Email"
                name="email"
                onChange={event => setEmail(event.target.value)}
                rules={[{ required: true, message: 'Please input your email!' }]}
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

            <Form.Item {...tailLayout} name="remember" >
                <Checkbox>Remember me</Checkbox>
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