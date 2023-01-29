import {React, useEffect, useState} from 'react'
//ui component
import SideNav from '../../common/SideNav'
import AdminHeader from '../../common/AdminHeader'
import AdminFooter from '../../common/AdminFooter'
//end ui component

import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios'



function TourListEdit() {

 let id = useParams().id
  let navigate = useNavigate()
  let [userData, setUserData] = useState({})
  let [daytrip, setDayTrip]= useState([])
  useEffect(() => {
    let fatchData = () => {
       axios.get(`http://localhost:600/tour/${id}`).then((x) =>{ 
 
       setUserData(x.data)
       setDayTrip(x.data.dayTours)
      })
    }
    fatchData()
 }, [id])


  //for use data vaue chane ( click hone ke baad input hone ke liye)


  let inputUser = (e) => setUserData({ ...userData, [e.target.name]: e.target.value }) // all input name and value read  and set 'useData' by "SetUserData" use Effect

  let [imageFile, postSliderImage] = useState([]) // image file read (postSliderImage kaa method input field ke saath laga hua hai jisme file name set ho raha hai )
  let [thumbFile,   postThumbImage] = useState([]) // image file read (postSliderImage kaa method input field ke saath laga hua hai jisme file name set ho raha hai )
  
   
  let[CkTourDtls, setCkTourDtls]=useState()   
  let[CkTouHlView, setCkTourHlView]=useState()
  let[CkTourHlPoint, setCkTourHlPoint]=useState()

  let  upDateData = async (e) => {
    // e.preventDefault()
    //     let formdata = new FormData()
    //     formdata.append('tourTitle', userData.tourTitle)
    //     formdata.append('tourUrl', userData.tourUrl)
    //     formdata.append('tourNav', userData.tourNav)
    //     formdata.append('tourMetadesc', userData.tourMetadesc)
    //     formdata.append('tourMetakey', userData.tourMetakey)
    //     formdata.append('tourH1', userData.tourH1)
    //     formdata.append('tourDuration', userData.tourDuration)
    //     formdata.append('tourRoute', userData.tourRoute)
        
        
    //     if(CkTourHlPoint){
    //       formdata.append('tourHlPoint', CkTourHlPoint.tourHlPoint)
    //     }
    //     if(CkTouHlView){
    //       formdata.append('tourHlView', CkTouHlView.tourHlView)
    //     }
    //     if(CkTourDtls){
    //       formdata.append('tourDtls', CkTourDtls.tourDtls)
    //     }
    //     if(imageFile[0]){  
    //       Array.from(imageFile).forEach((x)=>{
    //         formdata.append('tourSliderInputField', x)           
    //       })
    //     }

    //     if(thumbFile[0]){  
    //       Array.from(thumbFile).forEach((x)=>{
    //         formdata.append('tourThumbInputField', x)           
    //       })
    //     }
    //     await axios.put(`http://localhost:600/tour/editApi/${id}`,formdata).then((x) => navigate('/admin/tour-list'))

      
  }
  return (
   <>

   <AdminHeader />


   <div className='container-fluid'>
        <div className='row'>
          <div className='col-lg-2 sidebaare'><SideNav /></div>
          <div className='col-lg-10'>
            <div className="dashboard-content-area">
              <h1> Edit Tour List<span className='blue'>{userData.tourTitle}</span></h1>
              <div className='row'>

                <form onSubmit={(e) => { upDateData(e) }}>
                <div className="mb-3 mt-3 row g-9 align-items-center">
                    <div className="col col-lg-2"><label className="form-label">Tour Tumbnail</label></div>
                    <div className="col"><input type="file" name='tourThumbInputField' onChange={(e) => [ postThumbImage(e.target.files) ]} className="form-control p-2" multiple/> </div>
                  </div>
                  <div className="mb-3 mt-3 row g-9 align-items-center">
                    <div className="col col-lg-2"><label className="form-label">Page Display Nav Name</label></div>
                    <div className="col"><input autocomplete="off" type="text" name="tourNav" className="form-control" placeholder="Page name as you want display in menu" value={userData.tourNav} onChange={inputUser} /></div>
                  </div>
                  <div className="mb-3 mt-3 row g-9 align-items-center">
                    <div className="col col-lg-2"><label className="form-label">Tour URL</label></div>
                    <div className="col"><input autocomplete="off" type="text" name="tourUrl" className="form-control" placeholder="Page Url" value={userData.tourUrl} onChange={inputUser} /></div>
                  </div>
                  <div className="mb-3 mt-3 row g-9 align-items-center">
                    <div className="col col-lg-2"><label className="form-label">Page Title</label></div>
                    <div className="col"><input autocomplete="off" type="text" name="tourTitle" className="form-control" placeholder="Page Meta Description" value={userData.tourTitle} onChange={inputUser} /></div>
                  </div>
                  <div className="mb-3 mt-3 row g-9 align-items-center">
                    <div className="col col-lg-2"><label className="form-label">Page Meta Description</label></div>
                    <div className="col"><input autocomplete="off" type="text" name="tourMetadesc" className="form-control" placeholder="Page Meta Description" value={userData.tourMetadesc} onChange={inputUser} /></div>
                  </div>
                  <div className="mb-3 mt-3 row g-9 align-items-center">
                    <div className="col col-lg-2"><label className="form-label">Page Meta Keyword</label></div>
                    <div className="col"><input autocomplete="off" type="text" name="tourMetakey" className="form-control" placeholder="Page Meta Keyword" value={userData.tourMetakey} onChange={inputUser} /></div>
                  </div>
                  <div className="mb-3 mt-3 row g-9 align-items-center">
                    <div className="col col-lg-2"><label className="form-label">h1</label></div>
                    <div className="col"><input type="text" name="tourH1" className="form-control" placeholder="Page Heading" value={userData.tourH1} onChange={inputUser} /></div>
                  </div>

                  <div className="mb-3 mt-3 row g-9 align-items-center">
                    <div className="col col-lg-2"><label className="form-label">Tour Duration</label></div>
                    <div className="col"><input type="number" name="tourDuration" className="form-control" placeholder="Tour Duration" value={userData.tourDuration} onChange={inputUser} /></div>
                  </div>


                  <div className="mb-3 mt-3 row g-9 align-items-center">
                    <div className="col col-lg-2"><label className="form-label">Tour Route</label></div>
                    <div className="col"><input type="text" name="tourRoute" className="form-control" placeholder="Page Heading" value={userData.tourRoute} onChange={inputUser} /></div>
                  </div>


                  <div className="mb-3 mt-3 row g-9 align-items-center">
                    <div className="col col-lg-2"><label className="form-label">Photo</label></div>
                    <div className="col"><input type="file" name='tourSliderInputField' onChange={(e) => { postSliderImage(e.target.files) }} className="form-control p-2"  multiple/> </div>
                  </div>

                  

                 

                  <div className="mb-3 mt-3 row g-9 align-items-center">
                    <div className="col col-lg-2"><label className="form-label">Tour Highlight overView</label></div>
                    <div className="col">
                      <CKEditor editor={ClassicEditor} data={userData.tourHlView} onChange={(event, editor) => {
                        const data = editor.getData();
                        setCkTourHlView({tourHlView: data })
                      }}
                      />
                    </div>
                      </div>

                      <div className="mb-3 mt-3 row g-9 align-items-center">
                    <div className="col col-lg-2"><label className="form-label">Tour Highlight Point</label></div>
                    <div className="col">
                      <CKEditor editor={ClassicEditor} data={userData.tourHlPoint} onChange={(event, editor) => {
                        const data = editor.getData();
                        setCkTourHlPoint({tourHlPoint: data })
                      }}
                      />
                    </div>
                      </div>


                  <div className="mb-3 mt-3 row g-9 align-items-center">
                    <div className="col col-lg-2"><label className="form-label">Tour overView</label></div>
                    <div className="col">
                      <CKEditor editor={ClassicEditor} data={userData.tourDtls} onChange={(event, editor) => {
                        const data = editor.getData();
                        setCkTourDtls({tourDtls: data })
                      }}
                      />
                    </div>
                  </div>
                  <div className="mb-3 mt-3 row g-9 align-items-center">
                    <div className="col col-lg-2"><label className="form-label">Tour Days</label></div>
                    <div className="col">
                    {                  
                  daytrip.map((x, index)=>{
                      return(
                        <>         
                                  <div className='pb-2'>
                                      <div className='pb-1'><strong>Day {index+1}</strong></div>
                                      <div className='pb-1'><input type="text" name="ds" className="form-control" placeholder="Page Heading" value={x.dayCont} onChange={inputUser} /></div>                                      
                                      {/* <textarea type="text" name="touddrRoute" className="form-control" placeholder="Page Heading" value={x.dayDtls} onChange={inputUser} /> */}
                                      <CKEditor editor={ClassicEditor} data={x.dayDtls} onChange={(event, editor) => {
                                          const data = editor.getData();
                                          setCkTourDtls({tourDtls: data })
                                        }}
                                        />
                                  </div>
                        </>
                      )
                    })             
                  }
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

export default TourListEdit