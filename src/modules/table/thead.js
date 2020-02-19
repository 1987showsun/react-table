/*
 *   Copyright (c) 2020 
 *   All rights reserved.
 */

import React, {useState}                from 'react';
import { FontAwesomeIcon }              from '@fortawesome/react-fontawesome';
import { faSort, faSortUp, faSortDown } from '@fortawesome/free-solid-svg-icons';

export default ({data, handleSort}) => {

    data = data.map( item => {
        if( item['sort'] ){
            return {...item, sortStatus: 0}
        }
        return item;
    });
    const [ stateThead, setTHead ] = useState([...data]);
    const sortIconStatus = [
        {
            status     : -1,
            component  : <FontAwesomeIcon icon={faSortUp} />
        },
        {
            status     : 0,
            component  : <FontAwesomeIcon icon={faSort} />
        },
        {
            status     : 1,
            component  : <FontAwesomeIcon icon={faSortDown} />
        }
    ]

    const sortAction = ( sortKey ) => {
        const newStateThead = stateThead.map( item => {
            if( item['sort'] ){
                if( item['key']==sortKey ){
                    const sortStatus = item['sortStatus']<1? item['sortStatus']+1 : -1;
                    return { ...item, sortStatus };
                }
                return {...item, sortStatus: 0};
            }
            return item;
        });
        setTHead([...newStateThead]);
        if( handleSort!=undefined ){
            const selectedSort = newStateThead.find( findItem => findItem['key']==sortKey );
            handleSort({ key: selectedSort['key'], sortStatus: selectedSort['sortStatus'] });
        }
    }

    return(
        <>
            {
                stateThead.map( item => {
                    const { key, title, sortStatus } = item;
                    if( sortStatus==undefined ){
                        return(
                            <div key={key}>{title}</div>
                        );
                    }else{
                        return(
                            <div className="sort-start" key={key} onClick={sortAction.bind(this,key)}>
                                {title}
                                <i className="sort-wrap">{sortIconStatus.find( findItem => findItem['status']==sortStatus)['component']}</i>
                            </div>
                        );
                    }
                })
            }
        </>
    );
}