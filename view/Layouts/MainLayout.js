

import React from 'react';
import {PageHeader,Button } from 'antd';
import Link from 'next/link'



const MainLayout = (props)=>{


    return(
        <div>
            <PageHeader
                style={{
                    border: '1px solid rgb(235, 237, 240)',
                }}
                title="Board Infinity"
                extra={ <Link href='/signup'><Button key="1" type="primary">
                    Sign Up
                </Button></Link>}

            />
            <div style={{padding:'25px'}}>
                {props.children}
            </div>
        </div>
    )
}

export default MainLayout;