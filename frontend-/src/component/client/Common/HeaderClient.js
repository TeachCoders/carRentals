import {React, useEffect, useState} from 'react'
import axios from 'axios'
import { Link, Outlet } from 'react-router-dom'
import '../../../../node_modules/bootstrap/dist/css/bootstrap.min.css'
import '../../../../node_modules/bootstrap/dist/js/bootstrap.bundle.min'
import '../../../../node_modules/bootstrap/dist/js/bootstrap.bundle'
import '../../../../node_modules/fontawesome-4.7/css/font-awesome.min.css'
import '../Common/assets/css/header.css'









function HeaderClient() {


  let [Services, SetAllCategory]=useState([{}])
  let [Transports, setTransports]=useState([{}])
  let [ToursType, setToursType]=useState([{}])
  

  let fetcData = ()=>{


    let categoryApi = 'http://localhost:600/category/';
    let transportApi = 'http://localhost:600/category/transport';
    let tourApi = 'http://localhost:600/category/tour'
  
  
    const getCatetory = axios.get(categoryApi)
    const getTransports = axios.get(transportApi)
    const getTour = axios.get(tourApi)


  
    axios.all([getCatetory, getTransports, getTour]).then(
      
      axios.spread((... allData)=>{
          const catData = allData[0].data
          const transData = allData[1].data.subCatlistid
          const TourData = allData[2].data.subCatlistid;

          SetAllCategory(catData)
          setTransports(transData)
          setToursType(TourData)
      })
      )
  

  }


     useEffect(()=>{
      fetcData()

     },[])


 

  return (
    <>
    <header className='car-header'>
    <nav className="navbar navbar-expand-lg" aria-label="Offcanvas navbar large">
        <div className="container">
          <Link className="navbar-brand" to="/">Car <span>Rental</span></Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar2" aria-controls="offcanvasNavbar2">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="offcanvas offcanvas-end" id="offcanvasNavbar2" aria-labelledby="offcanvasNavbar2Label">
             <div className="offcanvas-header">
             <h5 className="offcanvas-title" id="offcanvasNavbar2Label">Offcanvas</h5>
             <button type="button" className="btn-close btn-close-white" data-bs-dismiss="offcanvas" aria-label="Close"></button>
             </div>
             <div className="offcanvas-body">
             <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
             <li key={Math.random()} className="nav-item">
              <Link className="nav-link active" aria-current="page" to="/">Home</Link>
            </li>
            <li key={Math.random()} className="nav-item dropdown">
              <Link className="nav-link dropdown-toggle" to="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
               Service
              </Link>
              <ul className="dropdown-menu">
                {Services.map((x)=> <li  key={Math.random()} ><Link className="dropdown-item" to={`/${x.ctUrl}`}>{x.cth1}</Link></li>)}
              </ul>
            </li>
           <li key={Math.random()} className="nav-item dropdown">
            <Link className="nav-link dropdown-toggle" to="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
              Transports Category
              </Link>
              <ul className="dropdown-menu">
                {
                  Transports.map((x)=>{
                    return (<li key={Math.random()}><Link  className="dropdown-item" to={`/transport/${x.SbctUrl}`}>{x.SbctNav}</Link></li>)
                    })
                }
              </ul>
            </li>
        <li key={Math.random()} className="nav-item dropdown">
              <Link className="nav-link dropdown-toggle" to="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
               Tourist Tours
              </Link>
              <ul className="dropdown-menu">
                {ToursType.map((x)=> <li key={Math.random()} ><Link className="dropdown-item" to={`/tour/${x.SbctUrl}`}>{x.SbctNav}</Link></li>)}
              </ul>
            </li>
            <li className="nav-item dropdown" key={Math.random()}>
              <Link className="nav-link dropdown-toggle" to="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
              Profile
              </Link>
              <ul className="dropdown-menu">
                {Services.map((x)=> <li key={Math.random()}><Link className="dropdown-item" to={`/${x.ctUrl}`}>{x.cth1}</Link></li>)}
              </ul>
            </li> 
             </ul>
             </div>
          </div>
        </div>
    </nav>
    </header>


 <Outlet/>
 </>
  )
}

export default HeaderClient