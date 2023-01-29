import { React, useEffect, useState } from 'react'
import { Link, Outlet, useNavigate } from 'react-router-dom'
import '../../../../node_modules/bootstrap/dist/css/bootstrap.min.css'
import '../../../../node_modules/bootstrap/dist/js/bootstrap.bundle.min'
import '../../../../node_modules/fontawesome-4.7/css/font-awesome.min.css'

import '../assets/css/admin.css'
import '../assets/css/table.css'


function AdminHeader() {

   /* authentication code start from  her*/
   let navigate = useNavigate()
   let [userData, setUser] = useState({})

   const DashboardValid = async () => {
      let token = localStorage.getItem('userDatatoken'); // get token 
      const res = await fetch("/auth/validuser", {
         method: "GET",
         headers: {
            "Content-Type": "application/json",
            "Authorization": token
         }
      })

      const data = await res.json(); // get user data after ferified token
      //console.log(data)// current user details
      //console.log(data.ValidUserOne.userName) 
      setUser(data.ValidUserOne) // set user value in use State


      if (data.status === 401 || !data) {
         //console.log('error page redircect')
         navigate('/notfound')// page redircet

      }
      else {
         console.log('user verified')
      }

   }

   const logout = async () => {

      let token = localStorage.getItem('userDatatoken'); // get token 
      const res = await fetch("/auth/logout", {
         method: "GET",
         headers: {
            "Content-Type": "application/json",
            "Authorization": token,
            Accept: "application/json"
         },credentials:"include"
      })

      const data = await res.json(); // get user data after ferified token
      //console.log(data)// current user details
      //console.log(data.ValidUserOne.userName) 
      setUser(data.ValidUserOne) // set user value in use State


      if (data.status !== 201) {
         console.log("error")
      }
      else {
         console.log('user log out')
         let token = localStorage.removeItem('userDatatoken'); // get token 
         navigate('/')
      }

   

   }



   useEffect(() => {
      DashboardValid()

   }, [])
   /* end authentication code start from  her*/

   return (

      <>

         <header className="navbar navbar-expand-lg admin-header">
            <div className="container-fluid">
               <Link className="navbar-brand text-white ml-4" to="/admin/"><b>Car Services</b></Link>
               <div className="collapse navbar-collapse justify-content-end" id="navbarSupportedContent">
                  <div className="mr-5">
                     <ul className="navbar-nav mr-auto mr-0">
                        <li className="nav-item">
                           {userData.userName ?
                              <>
                                 <Link  onClick={() => {
                                 logout()
                             }}  className="text-white" to="/auth/logout">LogOut</Link>
                                 <Link className="text-white" to="#"><span style={{
                                    width: '30px',
                                    borderRadius: '50px',
                                    background: 'white',
                                    display: 'inline-table',
                                    color: 'black',
                                    textAlign: 'center',
                                    lineHeight: '30px',
                                    fontWeight: 'bold',
                                    height: '30px',
                                    marginLeft: "15px"
                                 }}>{userData.userName.charAt(0)}</span></Link>


                              </>
                              :
                              <Link className="nav-link text-white" to="/admin">Login</Link>


                           }
                        </li>
                     </ul>
                  </div>
               </div>
            </div>
         </header>
         <Outlet />
      </>
   )
}

export default AdminHeader
