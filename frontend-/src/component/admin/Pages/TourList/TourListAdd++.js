import { React, useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
//ui component
import SideNav from '../../common/SideNav'
import AdminHeader from '../../common/AdminHeader'
import AdminFooter from '../../common/AdminFooter'
//end ui component
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'

function TourListAdd() {

  //defind use state
  let id= useParams()
  let [catData, setCatData]=useState([{}]) // find all category
  let [imageFile, postSliderImage] = useState([]) // image file read (postSliderImage kaa method input field ke saath laga hua hai jisme file name set ho raha hai )
  let [thumbFile,   postThumbImage] = useState([]) // image file read (postSliderImage kaa method input field ke saath laga hua hai jisme file name set ho raha hai )
  

  //use Effect
  useEffect(()=>{
   axios.get(`/category/tour`).then((x)=>{ 
    console.log(x.data.subCatlistid)
    setCatData(x.data.subCatlistid)
   //setCatData([x.data])
  })  
  },[])




  let navigate = useNavigate()

  //for use data vaue chane ( click hone ke baad input hone ke liye)
  let [userData, setUserData] = useState({
    tourpageRefid: [id],
    tourUrl: '',
    tourNav: '',
    tourTitle: '',
    tourMetadesc: '',
    tourMetakey: '', 
    tourH1: '',
    tourSlider: '',
    tourDtls: ''
  })

  let inputUser = (e) => setUserData({ ...userData, [e.target.name]: e.target.value }
    
    
    
    
    ) // all input name and value read  and set 'useData' by "SetUserData" use Effect

  console.log(userData)

  let AddData = async (e) => {
    e.preventDefault()
    console.log(userData)
    let formdata = new FormData() // create form object

    // here all input dat append (insert) in form object
    formdata.append('tourpageRefid', userData.tourpageRefid)    
    formdata.append('tourTitle', userData.tourTitle)
    formdata.append('tourUrl', userData.tourUrl)
    formdata.append('tourNav', userData.tourNav)
    formdata.append('tourMetadesc', userData.tourMetadesc)
    formdata.append('tourMetakey', userData.tourMetakey)
    formdata.append('tourH1', userData.tourH1)
    formdata.append('tourDtls', userData.tourDtls)
    if(imageFile[0]){  
      Array.from(imageFile).forEach((x)=>{
        formdata.append('tourSliderInputField', x)           
      })
    }
    if(thumbFile[0]){  
      Array.from(thumbFile).forEach((x)=>{
        formdata.append('tourThumbInputField', x)           
      })
    }
    
    


    await axios.post('/tour/addApi', formdata).then((x)=>{
      if(x.data.errorMessage){
        alert(x.data.errorMessage)
      }
      else{
        navigate('/admin/tour-list/')
      }      
    })

  }
  return (
    <>

    <AdminHeader />

      <div className='container-fluid'>
        <div className='row'>
          <div className='col-lg-2 sidebaare'><SideNav /></div>
          <div className='col-lg-10'>
            <div className="dashboard-content-area">
              <h1>Add Tour </h1>
              <div className='row'>

                <form  onSubmit={(e) => { AddData(e) }}>                 
                    <div className="mb-3 mt-3 row g-9 align-items-center">
                        <div className="col col-lg-2"><label className="form-label">Category</label></div>
                        <div className="col"> 
                           <select class="form-select" onChange={inputUser} name='tourpageRefid' aria-label="Default select example">
                              <option>Select Your Category</option>
                                {
                                    catData.map((x)=>{
                                    return <><option key={x._id} value={x._id}>{x.SbctNav}</option></> 
                                    })
                                  } 
                              </select> 
                        </div>
                    </div>


                <div className="mb-3 mt-3 row g-9 align-items-center">
                    <div className="col col-lg-2"><label className="form-label">Tumbnail</label></div>
                    <div className="col"><input type="file" name='tourThumbInputField' onChange={(e) => [ postThumbImage(e.target.files) ]} className="form-control p-2" multiple/> </div>
                </div>
                

                <div className="mb-3 mt-3 row g-9 align-items-center">
                    <div className="col col-lg-2"><label className="form-label">Menu Name</label></div>
                    <div className="col"><input type="text" name="tourNav" className="form-control" placeholder="Menu Name" value={userData.tourNav} onChange={inputUser} /></div>
                  </div>
                
                
                  <div className="mb-3 mt-3 row g-9 align-items-center">
                    <div className="col col-lg-2"><label className="form-label">Category URL</label></div>
                    <div className="col"><input type="text" name="tourUrl" className="form-control" placeholder="Page Url" value={userData.tourUrl} onChange={inputUser} /></div>
                  </div>
                  <div className="mb-3 mt-3 row g-9 align-items-center">
                    <div className="col col-lg-2"><label className="form-label">Page Title</label></div>
                    <div className="col"><input type="text" name="tourTitle" className="form-control" placeholder="Page Meta Description" value={userData.tourTitle} onChange={inputUser} /></div>
                  </div>
                  <div className="mb-3 mt-3 row g-9 align-items-center">
                    <div className="col col-lg-2"><label className="form-label">Page Meta Description</label></div>
                    <div className="col"><input type="text" name="tourMetadesc" className="form-control" placeholder="Page Meta Description" value={userData.tourMetadesc} onChange={inputUser} /></div>
                  </div>
                  <div className="mb-3 mt-3 row g-9 align-items-center">
                    <div className="col col-lg-2"><label className="form-label">Page Meta Keyword</label></div>
                    <div className="col"><input type="text" name="tourMetakey" className="form-control" placeholder="Page Meta Keyword" value={userData.tourMetakey} onChange={inputUser} /></div>
                  </div>
                  <div className="mb-3 mt-3 row g-9 align-items-center">
                    <div className="col col-lg-2"><label className="form-label">h1</label></div>
                    <div className="col"><input type="text" name="tourH1" className="form-control" placeholder="Page Heading" value={userData.tourH1} onChange={inputUser} /></div>
                  </div>
                  <div className="mb-3 mt-3 row g-9 align-items-center">
                    <div className="col col-lg-2"><label className="form-label">Photo</label></div>
                    <div className="col"><input type="file" name='tourSliderInputField' onChange={(e) => [ postSliderImage(e.target.files) ]} className="form-control p-2" multiple/> </div>
                  </div>

                  <div className="mb-3 mt-3 row g-9 align-items-center">
                    <div className="col col-lg-2"><label className="form-label">Cateogy Details</label></div>
                    <div className="col">

                      <CKEditor editor={ClassicEditor}
                      data={userData.tourDtls} onChange={(event, editor) => {
                        const data = editor.getData();
                        setUserData({ ...userData, tourDtls: data })
                      }}
                      />
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

export default TourListAdd