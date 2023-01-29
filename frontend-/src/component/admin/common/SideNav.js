import {React, useEffect, useState}  from 'react'
import { Link} from 'react-router-dom'
import axios from 'axios'
function SideNav() {
   
let [data, setData] =useState()
   useEffect(()=>{
      let  getdata = async  ()=>{
          await axios.get('http://localhost:600/category/')
         .then((x)=>{
            setData(x.data)
         })
      }
      getdata ()
   },[])

  return (
   <>
      <aside>
                  <nav className="sidebar py-2 mb-4">

                     <ul className="nav flex-column"> 
                     <li><Link to='/admin/dashboard/category'><small>(Main Category)</small>Category <i className="fa fa-external-link" aria-hidden="true"></i></Link></li>   
                     <li><Link to='/admin/dashboard/category/add'>+ Add Category</Link></li>  
                     </ul>
                  
                   
              {
                 data ? <>

                    <ul className="nav flex-column">


                       {data.map((x, index) => {

                          return (
                             <>
                                {index === 0 ? <li><Link to='/admin/dashboard/product/'>Sub Category <i className="fa fa-external-link" aria-hidden="true"></i></Link></li> : ''}
                                <li><Link to={`/admin/dashboard/product/add/${x.ctUrl}`}>+ Add Sub Cat. in {x.ctType} </Link></li>
                             </>
                          )
                       })
                       }
                    </ul>
                 </> : "Data Loading"
              } 
                   
                                                                 
                 
         
                     <ul className="nav flex-column"> 
                     <li><Link to='/admin/dashboard/transport-list/'>Transport List <i className="fa fa-external-link" aria-hidden="true"></i></Link></li> 
                     <li><Link to='/admin/dashboard/transport-list/add/transport'>+ Add Transport List</Link></li>                                               
                     </ul>               
         
                     <ul className="nav flex-column"> 
                     <li><Link to='/admin/dashboard/tour-list/'>Tour List <i className="fa fa-external-link" aria-hidden="true"></i></Link></li> 
                     <li><Link to='/admin/dashboard/tour-list/add/tour/'>+ Add Tour List</Link></li>                                               
                     </ul>
              
                  </nav>




               
               </aside>
   
   </>
  )
}

export default SideNav