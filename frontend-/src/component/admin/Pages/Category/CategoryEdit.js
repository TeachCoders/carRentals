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
function CategoryEdit() {

  let id = useParams().id
  let navigate = useNavigate()
  let [userData, setUserData] = useState({})
  let inputUser = (e) => setUserData({ ...userData, [e.target.name]: e.target.value }) // all input name and value read  and set 'useData' by "SetUserData" use Effect
  let [imageFile, postSliderImage] = useState([]) // image file read (postSliderImage kaa method input field ke saath laga hua hai jisme file name set ho raha hai )
  let [thumbFile,   postThumbImage] = useState([]) // image file read (postSliderImage kaa method input field ke saath laga hua hai jisme file name set ho raha hai )
  

  useEffect(() => {
    let fatchData = () => {
      axios.get(`/category/${id}`).then((x) => {
        setUserData(x.data)
      })
    }
    fatchData()

    //remove dupliacte select option value
    const options = []
    document.querySelectorAll('#element > option').forEach((option) => {
        if (options.includes(option.value)) option.remove()
        else options.push(option.value)
    })
    
  }, [id])

  let [CkEditorData, setCkEditorData] = useState()

  let upDateData = async (e) => {
    e.preventDefault()
    let formdata = new FormData()
    formdata.append('ctUrl', userData.ctUrl)
    formdata.append('ctType', userData.ctType)
    formdata.append('ctTitle', userData.ctTitle)
    formdata.append('ctMetadesc', userData.ctMetadesc)
    formdata.append('ctMetakey', userData.ctMetakey)
    formdata.append('cth1', userData.cth1)

    if (CkEditorData) {
      formdata.append('ctDtls', CkEditorData.ctDtls)
    }
    if (imageFile[0]) {
      Array.from(imageFile).forEach((x) => {
        formdata.append('SliderInputField', x)
      })
    }

    if (thumbFile[0]) {
      Array.from(thumbFile).forEach((x) => {
        formdata.append('thumbInputField', x)
      })
    }
    await axios.put(`/category/editApi/${id}`, formdata).then(() => navigate('/admin/dashboard/category'))



  }



  return (
   <>

   <AdminHeader />


   <div className='container-fluid'>
        <div className='row'>
          <div className='col-lg-2 sidebaare'><SideNav /></div>
          <div className='col-lg-10'>
            <div className="dashboard-content-area">
              <h1>Edit Category</h1>
              <div className='row'>

                <form onSubmit={(e) => { upDateData(e) }}>
                <div className="mb-3 mt-3 row g-9 align-items-center">
                    <div className="col col-lg-2"><label className="form-label">Tumbnail</label></div>
                    <div className="col"><input type="file" name='thumbInputField' onChange={(e) => [ postThumbImage(e.target.files) ]} className="form-control p-2" multiple/> </div>
                  </div> 
              
                                <div className="mb-3 mt-3 row g-9 align-items-center">
                    <div className="col col-lg-2"><label className="form-label">Category Name</label></div>
                    <div className="col"> 
                      <select id='element' class="form-select" onChange={inputUser} name='ctType' aria-label="Default select example">
                                <option>Select Category Type</option>
                  
                                <option value={userData.ctType} selected>{userData.ctType}</option>
                                <option value='Transport'>Transport</option>
                                <option value='Tour'>Tour</option>                                
                                <option value='Luxury Train'>Luxury Train</option>
                                <option value='Article'>Article</option>
                                <option value='Blog'>Blog</option>
                          </select>
                          <p className='cont-adm-message'><span>*</span> if you want custom Category Name then contact with Developer</p>    
                    </div>
                </div>            
                  <div className="mb-3 mt-3 row g-9 align-items-center">
                    <div className="col col-lg-2"><label className="form-label">Category URL</label></div>
                    <div className="col"><input  autocomplete="off"  type="text" name="ctUrl" className="form-control" placeholder="Page Url" value={userData.ctUrl} onChange={inputUser} /></div>
                  </div>
                  <div className="mb-3 mt-3 row g-9 align-items-center">
                    <div className="col col-lg-2"><label className="form-label">Page Title</label></div>
                    <div className="col"><input type="text" name="ctTitle" className="form-control" placeholder="Page Title" value={userData.ctTitle} onChange={inputUser} /></div>
                  </div>
                  <div className="mb-3 mt-3 row g-9 align-items-center">
                    <div className="col col-lg-2"><label className="form-label">Cagegory Meta Description</label></div>
                    <div className="col"><input  autocomplete="off"  type="text" name="ctMetadesc" className="form-control" placeholder="Page Meta Description" value={userData.ctMetadesc} onChange={inputUser} /></div>
                  </div>
                  <div className="mb-3 mt-3 row g-9 align-items-center">
                    <div className="col col-lg-2"><label className="form-label">Meta Keyword</label></div>
                    <div className="col"><input  autocomplete="off"  type="text" name="ctMetakey" className="form-control" placeholder="Page Meta Keyword" value={userData.ctMetakey} onChange={inputUser} /></div>
                  </div>
                  <div className="mb-3 mt-3 row g-9 align-items-center">
                    <div className="col col-lg-2"><label className="form-label">h1</label></div>
                    <div className="col"><input type="text" name="cth1" className="form-control" placeholder="Page Heading" value={userData.cth1} onChange={inputUser} /></div>
                  </div>
                  <div className="mb-3 mt-3 row g-9 align-items-center">
                    <div className="col col-lg-2"><label className="form-label">Photo</label></div>
                    <div className="col"><input type="file" name='SliderInputField' onChange={(e) => { postSliderImage(e.target.files) }} className="form-control p-2"  multiple/> </div>
                  </div>

                  <div className="mb-3 mt-3 row g-9 align-items-center">
                    <div className="col col-lg-2"><label className="form-label">Cateogy Details</label></div>
                    <div className="col">
                      <CKEditor editor={ClassicEditor} data={userData.ctDtls} onChange={(event, editor) => {
                        const data = editor.getData();
                        setCkEditorData({ctDtls: data })
                      }}  />                     
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

export default CategoryEdit