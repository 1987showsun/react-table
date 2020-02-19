/*
 *   Copyright (c) 2020 
 *   All rights reserved.
 */

import React                               from 'react';
import ReactDOM                            from 'react-dom';

// Demo 
import Demo3                               from './demo/demo3';

// stylesheets
import './public/stylesheets/style.scss';

const Index = () => {
  return(
    <>
      <div className="unit-block">
        <div className="unit-block-title">
          <h3>Controller</h3>
        </div>
        <Demo3 />
      </div>
      <footer>
        <small>Copyright © 2020 Sun li.</small>
      </footer>
    </>
  );
}

ReactDOM.render(<Index/>, document.getElementById('root'));