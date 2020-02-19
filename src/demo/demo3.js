/*
 *   Copyright (c) 2020 
 *   All rights reserved.
 */

import React, { useState, useEffect }      from 'react';
import { BrowserRouter, Link }             from 'react-router-dom';
import queryString                         from 'query-string';
import axios                               from 'axios';

//Modules
import Table                               from '../modules/table';

// Components
import Controller                          from './controller';

// Demo Data
import thead1                              from '../public/demoData/thead-demo1.json';

export default () => {

    const [ stateSort    , setSort     ] = useState({key:'sort', sortStatus:0});
    const [ stateCurrent , setCurrent  ] = useState(1);
    const [ stateTotal   , setTotal    ] = useState(0);
    const [ stateLimit   , setLimit    ] = useState(0);
    const [ stateList    , setList     ] = useState([]);
    const [ stateTableSet, setTableSet ] = useState({
        theme       : 'light',
        pagination  : {
            total               : stateTotal,
            limit               : stateLimit,
            range               : 2,
            display             : ['current','arrows','first','last','items','jumper']
        },
        customStyle : {}
    });

    const handleSortData = (sortVal) => {

        const sortStatus = sortVal['sortStatus'];
        const key = sortVal['sortStatus']==0? 'sort':sortVal['key'];

        if( sortStatus!=0 ){
            return stateList.sort((a,b) => {
                const type = typeof a[key]=='string' || typeof b[key]=='string'? true : false;
                if( type ){
                    const A = a[key].toUpperCase();
                    const B = b[key].toUpperCase();
                    if( sortStatus==-1 ){
                        return A.localeCompare(B);
                    }else if( sortStatus==1 ){
                        return B.localeCompare(A);
                    }
                }else{
                    if( sortStatus==-1 ){
                        return a[key]-b[key];
                    }else if( sortStatus==1 ){
                        return b[key]-a[key];
                    }
                }
            });
        }else{
             return stateList.sort((a,b) => {
                return Number(a[key])-Number(b[key]);
            });
        }
    }

    useEffect(()=>{

        const saerch    =  queryString.stringify({results: 5, page: stateCurrent});
        const url       = `https://randomuser.me/api${saerch!=''? `?${saerch}`:''}`;

        axios.get(url).then( res => {
            const { results, info } = res['data'];
            let   list = results.map( (item,i) => {
                const { gender, name, email, registered, phone, cell, login } = item;
                return{
                    sort       : i,
                    name       : `${name['last']} ${name['first']} ${name['last']}`,
                    email      : email,
                    gender     : gender,
                    phone      : phone,
                    cell       : cell,
                    age        : registered['age'],
                    id         : login['uuid']
                }
            })
            setTotal(99);
            setLimit(5);
            setList(list);
            setTableSet({ 
                ...stateTableSet,
                pagination : {
                    ...stateTableSet['pagination'],
                    total  : 90,
                    limit  : 5
                }
            });
        })
    },[stateCurrent]);

    return(
        <BrowserRouter>
            <Controller 
                setup            ={stateTableSet}
                handleController ={(val) => setTableSet({...stateTableSet, ...val})}
                handleCustom     ={(val) => setTableSet({...stateTableSet, ...val})}
            />
            <Table
                { ...stateTableSet }
                thead              ={thead1}
                handleSort         ={(val)=>setSort(val)}
                handlePagination   ={(val)=>setCurrent(val)}
            >
                {
                    handleSortData(stateSort).map((item,i) => {
                        const { gender, name, email, age, phone, cell, id } = item;
                        return(
                            <React.Fragment key={id}>
                                <div className=""><Link to="">{name}</Link></div>
                                <div className="">{gender}</div>
                                <div className="">{age}</div>
                                <div className="">{email}</div>
                                <div className="">{phone}</div>
                                <div className="">{cell}</div>
                            </ React.Fragment>
                        );
                    })
                }
            </Table>
        </BrowserRouter>
    );
}