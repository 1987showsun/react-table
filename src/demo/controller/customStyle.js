/*
 *   Copyright (c) 2020 
 *   All rights reserved.
 */

import React, { useState, useEffect }   from 'react';
import { FontAwesomeIcon }              from '@fortawesome/react-fontawesome';
import { faTrashAlt, faPlusCircle, faCaretDown }     from '@fortawesome/free-solid-svg-icons';

// JSONS
import CSS from './public/css.json';

export default ({setup={}, handleCustom}) => {

    const [ stateController, setController ] = useState({...setup});
    const [ stateStyle     , setStyle      ] = useState([]);

    const handleAdd = () => {
        let style = [...stateStyle];
        style = [ ...style, { id: (stateStyle.length+1), type:'nomral', key: CSS[0]['value'], val: '' } ];
        setStyle([...style]);
    }

    const handleChange = (idx,e) => {
        const { name, value } = e.target;
        const style = stateStyle.map((item,i) => {
            if( i==idx ){
                return { ...item, [name]: value };
            }
             return item;
        });
        setStyle([...style]);
    }

    const removeItem = (idx) => {
        const style = stateStyle.filter((item,i) => i!=idx );
        setStyle([...style]);
    }

    useEffect(() => {
        setController(setup);
    }, [setup['pagination'], setup['theme'] ]);

    useEffect(() => {
        let regroup = {};
        stateStyle.forEach( item => {
            regroup = { ...regroup, [item['type']]: { ...regroup[item['type']], [item['key']]: item['val']} };
        });
        
        let delay = setTimeout(() => {
            if( handleCustom!=undefined ){
                handleCustom({ ...stateController, customStyle: regroup });
            }
        },700);
        return()=>{
            clearTimeout(delay);
        }
    }, [stateStyle, stateController])

    return (
        <>
            <div className="label">Style：</div>
            <div className="controller-container">
                {
                    stateStyle.map((item,i) => {
                        return (
                            <div key={item['id']} className="style-item">
                                <div>{i+1}</div>
                                <div>
                                    <div className="input-box">
                                        <select name="type" value={item['type']} onChange={handleChange.bind(this,i)}>
                                            <option value="nomral">nomral</option>
                                            <option value="thead">Table Head</option>
                                            <option value="titem">Table Item</option>
                                        </select>
                                    </div>
                                </div>
                                <div>
                                    <div className="input-box">
                                        <select name="key" value={item['key']} onChange={handleChange.bind(this,i)}>
                                            {
                                                CSS.map((cssItem,i) => {
                                                    return(
                                                        <option key={i} value={cssItem['value']}>{cssItem['name']}</option>
                                                    );
                                                })
                                            }
                                        </select>
                                    </div>
                                </div>
                                <div>
                                    <div className="input-box">
                                        <input type="text" name="val" value={item['val']} onChange={handleChange.bind(this,i)} />
                                    </div>
                                </div>
                                <div>
                                    <button onClick={removeItem.bind(this, i)}><i><FontAwesomeIcon icon={faTrashAlt}/></i>REMOVE</button>
                                </div>
                            </div>
                        )
                    })
                }
                <div className="style-item">
                    <button onClick={handleAdd.bind(this)}><i><FontAwesomeIcon icon={faPlusCircle}/></i> ADD STYLE</button>
                </div>
            </div>
        </>
    );
}