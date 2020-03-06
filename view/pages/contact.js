import Contact from "../Layouts/Contact";
import axios from 'axios';
import React, {useEffect, useState} from "react";
import AuthRepo from '../repository/authRepo';


const Contacts  = ()=>{
    const [state,setState] = useState({});

    const getApi = ()=>{

    };

    useEffect(()=>{
        let x = new AuthRepo();
        let token  = localStorage.getItem('token');
        axios.get(x.contacts,{headers:{'Authorization':token}})
            .then(res=>{console.log(res.data);setState(res.data);console.log(res.data)})
            .catch(err=>{console.log(err)})
    },[]);

    return(
        <Contact>
            <h1>Contacts Page</h1>
            <div>{JSON.stringify(state.message)}</div>
        </Contact>
    )
};

export default Contacts;