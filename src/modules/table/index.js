/*
 *   Copyright (c) 2020 
 *   All rights reserved.
 */

import React,{ useState, useEffect } from 'react';

// Components
import Pagination                    from './pagination';
import Thead                         from './thead';

// Setup
import themeStyle                    from './public/setup/tableStyle'; 

// stylesheets
import './css/style.scss';

export default ({className='', customStyle={}, border=false, pagination, theme='', thead , children=[], handleSort, handlePagination}) => {

    theme = theme.toLowerCase();
    const [ stateNomralStyle, setNomralStyle ] = useState({});
    const [ stateTheadStyle , setTheadStyle  ] = useState({});
    const [ stateTbodyStyle , setTbodyStyle  ] = useState({});

    const findStyleObject = () => {
        const findThemeStyle = themeStyle.find( findItem => findItem['key']==theme );
        return !findThemeStyle? {}:findThemeStyle['style'];
    } 

    useEffect(()=>{
        const findStyle      = findStyleObject();
        (Object.keys(findStyle) || []).map( key => {
            switch( key ){
                case 'nomral':
                    setNomralStyle({...findStyle[key]});
                    break;

                case 'thead':
                    setTheadStyle({...findStyle[key]});
                    break;

                case 'titem':
                    setTbodyStyle({...findStyle[key]});
                    break;
            }
        });
    },[theme, customStyle['nomral'], customStyle['thead'], customStyle['titem']]);

    useEffect(() => {
        const findStyle      = findStyleObject();
        const exceptionStyle = customStyle['nomral'] || {};

        setNomralStyle({...findStyle['nomral'], ...exceptionStyle});
    }, [customStyle['nomral']]);

    useEffect(() => {
        const findStyle      = findStyleObject();
        const exceptionStyle = customStyle['thead'] ||  {};

        setTheadStyle({...findStyle['thead'], ...exceptionStyle});
    }, [customStyle['thead']]);

    useEffect(() => {
        const findStyle      = findStyleObject();
        const exceptionStyle = customStyle['titem'] || {};

        setTbodyStyle({...findStyle['titem'], ...exceptionStyle});
    }, [customStyle['titem']]);

    return(
        <div className={`table-wrap ${className}`} style={stateNomralStyle}>
            <div className="table-wrap-block">
                <div className={`table ${border? theme:''}`}>
                    { 
                        thead!=undefined? (
                            <div className="table-row table-head" style={stateTheadStyle}>
                                <Thead data={thead} handleSort={handleSort}/>
                            </div>
                        ): (
                            null
                        )
                    }
                    {
                        children.length!=0 &&
                            children.map( item => {
                                if( item!=undefined ){
                                    return (
                                        <div className="table-row" key={item['key'] || Math.random() } style={stateTbodyStyle}>
                                            {item}
                                        </div>
                                    );
                                }else{
                                    null
                                }
                            })
                    }
                </div>
            </div>
            <Pagination 
                setup            ={pagination}
                handlePagination ={handlePagination}
            />
        </div>
    );
}