import { React, useState, useEffect } from 'react'
import { useNavigate} from 'react-router-dom'
//ui component
import SideNav from '../../common/SideNav'
import AdminHeader from '../../common/AdminHeader'
import AdminFooter from '../../common/AdminFooter'
//end ui component
import axios from 'axios'


function SelectCategory() {
  let navigate = useNavigate()


  let [catData, setCatData]=useState([{}])
  let [selected_id_api, setselected_id_apiue]=useState()
  useEffect(()=>{
    let fatchdta = async()=>  axios.get('/category/').then((x)=> setCatData(x.data))
    fatchdta()

  },[])


  let getSelrctVal =(e)=>{
    console.log(e.text)
    setselected_id_apiue(e.target.value)
  }

let Submit = (e)=>{
  e.preventDefault()
  let findPageName = async()=>{
        axios.get(`/category/${selected_id_api}`)
        .then((x)=>{
          console.log(x.data)
          navigate(`${selected_id_api}`)
        })
  }
  findPageName()
     

 
}
  console.log(catData)
  return (

    <>
    
   
    <AdminHeader />

      <div className='container-fluid'>
        <div className='row'>
          <div className='col-lg-2 sidebaare'><SideNav /></div>
          <div className='col-lg-10'>
            <div className="dashboard-content-area">
              <h1>Select Category</h1>
              <div className='row'>

                <form onSubmit={(e)=>{Submit(e)}}>
                <div className="mb-3 mt-3 row g-9 align-items-center">
                    <div className="col col-lg-2"><label className="form-label">Parent Category</label></div>
                    <div className="col"> 
                                    <select class="form-select" onChange={getSelrctVal} aria-label="Default select example">
                                        <option value=''>Select Your Category</option>
                                        {
                                          catData.map((x)=>{
                                           return <><option value={x.ctUrl}>{x.cth1}</option></> 
                                          })
                                        }
                                   
                             
                                        </select>

                             
                    
                    </div>
                </div>


         
                  <div className="mb-5 mt-3 align-items-center text-center">
                    <button type="submit" className="btn btn-primary">Submit</button>
                  </div>
                </form>
              </div>
            </div>

          </div>
        </div>
      </div>

      <AdminFooter />

    </>
  )
}

export default SelectCategory