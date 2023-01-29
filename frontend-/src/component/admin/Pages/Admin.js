import React from 'react'
//ui component
import SideNav from '../common/SideNav'
import AdminHeader from '../common/AdminHeader'
import AdminFooter from '../common/AdminFooter'
//ui component
import { Link} from 'react-router-dom'
function Admin() {
 
  return (
 
    <>
    <AdminHeader />


  <div className='container-fluid'>
    <div className='row'>
      <div className='col-lg-2 sidebaare'><SideNav /></div>
      <div className='col-lg-10'>
      <div className="admin-content-area">
      <h1>All Document</h1>
      <div className='row'>
          <div className='col-lg-3 col-6'>
          <div className="small-box bg-info p-2">
            <div className="inner text-white">
              <h3>2</h3>
              <p>Category</p>
            </div>
            <div className="icon">
              <i className="ion ion-bag"></i>
              </div>
            <Link to="/admin/pages/" className="text-white">
              More info <i className="fas fa-arrow-circle-right"></i>
            </Link>
          </div>
          </div>


          <div className='col-lg-3 col-6'>
          <div className="small-box bg-success p-2">
            <div className="inner text-white">
              <h3>5</h3>
              <p>Transport</p>
            </div>
            <div className="icon">
              <i className="ion ion-bag"></i>
              </div>
              <Link to="/admin/pages/" className="text-white">
              More info <i className="fas fa-arrow-circle-right"></i>
            </Link>
          </div>
          </div>


          <div className='col-lg-3 col-6'>
          <div className="small-box bg-warning p-2">
            <div className="inner text-white">
              <h3>10</h3>
              <p>Package</p>
            </div>
            <div className="icon">
              <i className="ion ion-bag"></i>
              </div>
              <Link to="/admin/pages/" className="text-white">
              More info <i className="fas fa-arrow-circle-right"></i>
            </Link>
          </div>
          </div>

          <div className='col-lg-3 col-6'>
          <div className="small-box bg-danger p-2">
            <div className="inner text-white">
              <h3>5</h3>
              <p>Article</p>
            </div>
            <div className="icon">
              <i className="ion ion-bag"></i>
              </div>
              <Link to="/admin/pages/" className="text-white">
              More info <i className="fas fa-arrow-circle-right"></i>
            </Link>
          </div>
          </div>

      </div>
        </div>

      </div>
    </div>
  </div>



  <AdminFooter />
    </>
  )
}

export default Admin