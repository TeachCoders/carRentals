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



function ProductCategoryEdit() {

 let id = useParams().id
  let navigate = useNavigate()
  let [userData, setUserData] = useState({})
  useEffect(() => {
    let fatchData = () => {
       axios.get('/category/').then((x)=> setCatData(x.data)) //find all category form  main category api
       axios.get(`/subcategory/${id}`).then((x) =>{ 
 
       setUserData(x.data)
      })
    }
    fatchData()
 }, [id])

console.log(userData)
  //for use data vaue chane ( click hone ke baad input hone ke liye)

  let [catData, setCatData]=useState([{}]) // find all category
  let inputUser = (e) => setUserData({ ...userData, [e.target.name]: e.target.value }) // all input name and value read  and set 'useData' by "SetUserData" use Effect

  let [imageFile, postSliderImage] = useState([]) // image file read (postSliderImage kaa method input field ke saath laga hua hai jisme file name set ho raha hai )
  let [thumbFile,   postThumbImage] = useState([]) // image file read (postSliderImage kaa method input field ke saath laga hua hai jisme file name set ho raha hai )
  
  
  let[CkEditorData, setCkEditorData]=useState()

  let  upDateData = async (e) => {
    e.preventDefault()
        let formdata = new FormData()
   
        formdata.append('SbctTitle', userData.SbctTitle)
        formdata.append('SbctUrl', userData.SbctUrl)
        formdata.append('SbctNav', userData.SbctNav)
        formdata.append('SbctMetadesc', userData.SbctMetadesc)
        formdata.append('SbctMetakey', userData.SbctMetakey)
        formdata.append('Sbcth1', userData.Sbcth1)
        
        
        if(CkEditorData){
          formdata.append('SbctDtls', CkEditorData.SbctDtls)
        }
        if(imageFile[0]){  
          Array.from(imageFile).forEach((x)=>{
            formdata.append('prdSliderInputField', x)           
          })
        }

        if(thumbFile[0]){  
          Array.from(thumbFile).forEach((x)=>{
            formdata.append('prdThumbInputField', x)           
          })
        }
        await axios.put(`/subcategory/editApi/${id}`,formdata).then(() => navigate('/admin/dashboard/product'))
  }

  return (
   <>

   <AdminHeader />


   <div className='container-fluid'>
        <div className='row'>
          <div className='col-lg-2 sidebaare'><SideNav /></div>
          <div className='col-lg-10'>
            <div className="dashboard-content-area">
              <h1> Edit Product Category <span className='blue'>{userData.SbctTitle}</span></h1>
              <div className='row'>

                <form onSubmit={(e) => { upDateData(e) }}>


                <div className="mb-3 mt-3 row g-9 align-items-center">
                    <div className="col col-lg-2"><label className="form-label">Tumbnail</label></div>
                    <div className="col"><input type="file" name='prdThumbInputField' onChange={(e) => [ postThumbImage(e.target.files) ]} className="form-control p-2" multiple/> </div>
                  </div>
                  <div className="mb-3 mt-3 row g-9 align-items-center">
                    <div className="col col-lg-2"><label className="form-label">Page Display Nav Name</label></div>
                    <div className="col"><input  autocomplete="off" type="text" name="SbctNav" className="form-control" placeholder="Page name as you want display in menu" value={userData.SbctNav} onChange={inputUser} /></div>
                  </div>
                  <div className="mb-3 mt-3 row g-9 align-items-center">
                    <div className="col col-lg-2"><label className="form-label">Category URL</label></div>
                    <div className="col"><input  autocomplete="off" type="text" name="SbctUrl" className="form-control" placeholder="Page Url" value={userData.SbctUrl} onChange={inputUser} /></div>
                  </div>
                  <div className="mb-3 mt-3 row g-9 align-items-center">
                    <div className="col col-lg-2"><label className="form-label">h1</label></div>
                    <div className="col"><input type="text" name="Sbcth1" className="form-control" placeholder="Page Heading" value={userData.Sbcth1} onChange={inputUser} /></div>
                  </div>
                  <div className="mb-3 mt-3 row g-9 align-items-center">
                    <div className="col col-lg-2"><label className="form-label">Page Title</label></div>
                    <div className="col"><input  autocomplete="off" type="text" name="SbctTitle" className="form-control" placeholder="Page Meta Description" value={userData.SbctTitle} onChange={inputUser} /></div>
                  </div>
                  <div className="mb-3 mt-3 row g-9 align-items-center">
                    <div className="col col-lg-2"><label className="form-label">Page Meta Description</label></div>
                    <div className="col"><input  autocomplete="off" type="text" name="SbctMetadesc" className="form-control" placeholder="Page Meta Description" value={userData.SbctMetadesc} onChange={inputUser} /></div>
                  </div>
                  <div className="mb-3 mt-3 row g-9 align-items-center">
                    <div className="col col-lg-2"><label className="form-label">Page Meta Keyword</label></div>
                    <div className="col"><input type="text" name="SbctMetakey" className="form-control" placeholder="Page Meta Keyword" value={userData.SbctMetakey} onChange={inputUser} /></div>
                  </div>

                  <div className="mb-3 mt-3 row g-9 align-items-center">
                    <div className="col col-lg-2"><label className="form-label">Photo</label></div>
                    <div className="col"><input type="file" name='prdSliderInputField' onChange={(e) => { postSliderImage(e.target.files) }} className="form-control p-2"  multiple/> </div>
                  </div>

                  <div className="mb-3 mt-3 row g-9 align-items-center">
                    <div className="col col-lg-2"><label className="form-label">Cateogy Details</label></div>
                    <div className="col">

                      <CKEditor editor={ClassicEditor} data={userData.SbctDtls} onChange={(event, editor) => {
                        const data = editor.getData();
                        setCkEditorData({SbctDtls: data })
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

export default ProductCategoryEdit