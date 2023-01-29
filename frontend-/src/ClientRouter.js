import React from 'react'
import {Routes, Route} from 'react-router-dom';
// import Error404 from './component/client/Common/Error404';

import Home from './component/client/pages/Home';
import AboutUs from './component/client/pages/AboutUs';

function ClientRouter() {
  return (

    <>

    <Routes>
        <Route exact path="/">
                <Route excat path="/" element={<Home />} />
                <Route path='about-us' element={<AboutUs />} />
        </Route>
    </Routes>

    
    </>
  )
}

export default ClientRouter