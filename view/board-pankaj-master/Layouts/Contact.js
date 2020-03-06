

import React from 'react';
import {PageHeader,Button } from 'antd';
import Link from 'next/link'



const MainLayout = (props)=>{

    const logout = ()=>{
        localStorage.removeItem('token')

    }

    return(
        <div>
            <PageHeader
                style={{
                    border: '1px solid rgb(235, 237, 240)',
                }}
                title="Board Infinity"
                extra={ <Link href='/'><Button key="1" type="primary" onClick={logout}>
                    Log out
                </Button></Link>}

            />
            <div style={{padding:'25px'}}>
                {props.children}
            </div>
        </div>
    )
}

export default MainLayout;