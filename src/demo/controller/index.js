/*
 *   Copyright (c) 2020 
 *   All rights reserved.
 */

import React, {useState, useEffect} from 'react';

// Components
import CustomStyle                  from './customStyle';

export default ({ setup, handleController, handleCustom}) => {

    const [ stateController, setController ] = useState({...setup});

    useEffect(() => {
        setController(setup);
    }, [setup['pagination'], setup['theme'] ]);

    useEffect(() => {
        if( handleController!=undefined ){
            handleController(stateController);
        }
    }, [stateController['pagination'], stateController['theme'], stateController['customStyle'] ]);

    const handleChange = (subkey, e) => {
        const { name, value } = e.target;
        let   mergeController = {...stateController};
        if( name=='pagination' ){
            const pagination = stateController['pagination'];
            let   result     = [];
            if( subkey=='display' ){
                result = pagination['display'].includes(value)? pagination['display'].filter( item => item!=value) : [...pagination['display'], value];
                mergeController = { ...stateController, pagination: { ...pagination, [subkey]: result }}
            }else{
                mergeController = { ...stateController, pagination: { ...pagination, [subkey]: value }}
            } 
        }else{
            mergeController = { ...mergeController, [name]: value };
        }

        setController(mergeController);
    }

    const { theme, pagination } = stateController;

    return(
        <div className="controller-wrap">
            <ul>
                <li>
                    <div className="label">Theme：</div>
                    <div className="controller-container">
                        <label className="radio" htmlFor="theme-light">
                            <input id="theme-light" type="radio" name="theme" value="light" onChange={handleChange.bind(this,'')} checked={theme=='light'}/>
                            <i></i>
                            <span>Light</span>
                        </label>
                        <label className="radio" htmlFor="theme-dark">
                            <input id="theme-dark" type="radio" name="theme" value="dark" onChange={handleChange.bind(this,'')} checked={theme=='dark'}/>
                            <i></i>
                            <span>Dark</span>
                        </label>
                    </div>
                </li>
                <li>
                    <div className="label">Pagination：</div>
                    <div className="controller-container">
                        <ul>
                            <li>
                                <div className="label">Range</div>
                                <div className="controller-container">
                                    <div className="controller-input-box">
                                        <input type="tel" name="pagination" value={pagination['range']} onChange={handleChange.bind(this,'range')} />
                                    </div>
                                </div>
                            </li>
                            <li>
                                <div className="label">Display</div>
                                <div className="controller-container">
                                    <label className="checkbox" htmlFor="pagination1">
                                        <input id="pagination1" type="checkbox" name="pagination" value="current" onChange={handleChange.bind(this,'display')} checked={pagination['display'].includes('current')}/>
                                        <i></i>
                                        <span>Current</span>
                                    </label>
                                    <label className="checkbox" htmlFor="pagination2">
                                        <input id="pagination2" type="checkbox" name="pagination" value="arrows" onChange={handleChange.bind(this,'display')} checked={pagination['display'].includes('arrows')}/>
                                        <i></i>
                                        <span>Arrows</span>
                                    </label>
                                    <label className="checkbox" htmlFor="pagination6">
                                        <input id="pagination6" type="checkbox" name="pagination" value="first" onChange={handleChange.bind(this,'display')} checked={pagination['display'].includes('first')}/>
                                        <i></i>
                                        <span>First</span>
                                    </label>
                                    <label className="checkbox" htmlFor="pagination3">
                                        <input id="pagination3" type="checkbox" name="pagination" value="last" onChange={handleChange.bind(this,'display')} checked={pagination['display'].includes('last')}/>
                                        <i></i>
                                        <span>Last</span>
                                    </label>
                                    <label className="checkbox" htmlFor="pagination4">
                                        <input id="pagination4" type="checkbox" name="pagination" value="items" onChange={handleChange.bind(this,'display')} checked={pagination['display'].includes('items')}/>
                                        <i></i>
                                        <span>Items</span>
                                    </label>
                                    <label className="checkbox" htmlFor="pagination5">
                                        <input id="pagination5" type="checkbox" name="pagination" value="jumper" onChange={handleChange.bind(this,'display')} checked={pagination['display'].includes('jumper')}/>
                                        <i></i>
                                        <span>Jumper</span>
                                    </label>
                                </div>
                            </li>
                        </ul>
                    </div>
                </li>
                <li>
                    <CustomStyle 
                        setup        ={setup}
                        handleCustom ={handleCustom}
                    />
                </li>
            </ul>
        </div>
    );
}