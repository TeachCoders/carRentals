import React from 'react';
// import {Routes, Route} from 'react-router-dom';
// import Home from './component/client/pages/Home';
// import AboutUs from './component/client/pages/AboutUs';
import MainRoute from './MainRoute';
// import Contact from './Contact';
function App() {
  return (
    <div className="App">

  
   <MainRoute /> 

      {/* <Routes>
        <Route path="/">
            <Route path="/" element={<Home />} />
            <Route path='about-us' element={<AboutUs />} />
        </Route>
    </Routes> */}
    </div>
  );
}
export default App;
