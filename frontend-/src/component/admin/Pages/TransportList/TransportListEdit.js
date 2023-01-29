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



function TransportListEdit() {

 let id = useParams().id


  let navigate = useNavigate()

  let [userData, setUserData] = useState({})
  useEffect(() => {
    let fatchData = () => {
      axios.get(`http://localhost:600/transport/${id}`).then((x) => {
        setUserData(x.data)
      })
    }
    fatchData()
  }, [id])


  //for use data vaue chane ( click hone ke baad input hone ke liye)


  let inputUser = (e) => setUserData({ ...userData, [e.target.name]: e.target.value }) // all input name and value read  and set 'useData' by "SetUserData" use Effect

  let [imageFile, postSliderImage] = useState([]) // image file read (postSliderImage kaa method input field ke saath laga hua hai jisme file name set ho raha hai )
  let [thumbFile,   postThumbImage] = useState([]) // image file read (postSliderImage kaa method input field ke saath laga hua hai jisme file name set ho raha hai )
  let [cktransHlView, setTransHlView]=useState()
  let [cktransHlPoint, setTransHlPoint]=useState()
  let [cktransDetails, setTransDetails]=useState()
  


  let  upDateData = async (e) => {

    e.preventDefault()
        let formdata = new FormData()
        formdata.append('transTitle', userData.transTitle)
        formdata.append('transUrl', userData.transUrl)
        formdata.append('transNav', userData.transNav)
        formdata.append('transMetaDesc', userData.transMetaDesc)
        formdata.append('transMetaKey', userData.transMetaKey)
        formdata.append('transH1', userData.transH1)

        if(cktransHlView){ 
          formdata.append('transHlView', cktransHlView.transHlView)
        }

        if(cktransHlPoint){ 
          formdata.append('transHlPoint', cktransHlPoint.transHlPoint)
        }

        if(cktransDetails){ 
          formdata.append('transDtls', cktransDetails.transDtls)
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
        await axios.put(`http://localhost:600/transport/editApi/${id}`,formdata).then(() => navigate('/admin/dashboard/transport-list'))
  }
  return (
   <>

   <AdminHeader />


   <div className='container-fluid'>
        <div className='row'>
          <div className='col-lg-2 sidebaare'><SideNav /></div>
          <div className='col-lg-10'>
            <div className="dashboard-content-area">
              <h1> Edit Transport List<span className='blue'>{userData.transTitle}</span></h1>
              <div className='row'>

                <form onSubmit={(e) => { upDateData(e) }}>

      

                <div className="mb-3 mt-3 row g-9 align-items-center">
                    <div className="col col-lg-2"><label className="form-label">Tumbnail</label></div>
                    <div className="col"><input type="file" name='prdThumbInputField' onChange={(e) => [ postThumbImage(e.target.files) ]} className="form-control p-2" multiple/> </div>
                  </div>
                  <div className="mb-3 mt-3 row g-9 align-items-center">
                    <div className="col col-lg-2"><label className="form-label">Page Display Nav Name</label></div>
                    <div className="col"><input type="text" name="transNav" className="form-control" placeholder="Page name as you want display in menu" value={userData.transNav} onChange={inputUser} /></div>
                  </div>
                  <div className="mb-3 mt-3 row g-9 align-items-center">
                    <div className="col col-lg-2"><label className="form-label">Category URL</label></div>
                    <div className="col"><input type="text" name="transUrl" className="form-control" placeholder="Page Url" value={userData.transUrl} onChange={inputUser} /></div>
                  </div>
                  <div className="mb-3 mt-3 row g-9 align-items-center">
                    <div className="col col-lg-2"><label className="form-label">Page Title</label></div>
                    <div className="col"><input type="text" name="transTitle" className="form-control" placeholder="Page Meta Description" value={userData.transTitle} onChange={inputUser} /></div>
                  </div>
                  <div className="mb-3 mt-3 row g-9 align-items-center">
                    <div className="col col-lg-2"><label className="form-label">Page Meta Description</label></div>
                    <div className="col"><input type="text" name="transMetaDesc" className="form-control" placeholder="Page Meta Description" value={userData.transMetaDesc} onChange={inputUser} /></div>
                  </div>
                  <div className="mb-3 mt-3 row g-9 align-items-center">
                    <div className="col col-lg-2"><label className="form-label">Page Meta Keyword</label></div>
                    <div className="col"><input type="text" name="transMetaKey" className="form-control" placeholder="Page Meta Keyword" value={userData.transMetaKey} onChange={inputUser} /></div>
                  </div>
                  <div className="mb-3 mt-3 row g-9 align-items-center">
                    <div className="col col-lg-2"><label className="form-label">h1</label></div>
                    <div className="col"><input type="text" name="transH1" className="form-control" placeholder="Page Heading" value={userData.transH1} onChange={inputUser} /></div>
                  </div>
                  <div className="mb-3 mt-3 row g-9 align-items-center">
                    <div className="col col-lg-2"><label className="form-label">Photo</label></div>
                    <div className="col"><input type="file" name='prdSliderInputField' onChange={(e) => { postSliderImage(e.target.files) }} className="form-control p-2"  multiple/> </div>
                  </div>

                  <div className="mb-3 mt-3 row g-9 align-items-center">
                    <div className="col col-lg-2"><label className="form-label">Hightlight Over View</label></div>
                    <div className="col">
                    <CKEditor editor={ClassicEditor} data={userData.transHlView} onChange={(event, editor) => {
                        const data = editor.getData();
                        setTransHlView({transHlView : data })
                      }}

                      /> 



                    </div>
                  </div>

                  <div className="mb-3 mt-3 row g-9 align-items-center">
                    <div className="col col-lg-2"><label className="form-label">Hightlight Point</label></div>
                    <div className="col">
                      <CKEditor editor={ClassicEditor} data={userData.transHlPoint} onChange={(event, editor) => {
                        const data = editor.getData();
                        setTransHlPoint({transHlPoint : data })
                      }}

                      />

                    </div>
                  </div>

                  <div className="mb-3 mt-3 row g-9 align-items-center">
                    <div className="col col-lg-2"><label className="form-label">Cateogy Details</label></div>
                    <div className="col">
                      <CKEditor editor={ClassicEditor} data={userData.transDtls} onChange={(event, editor) => {
                        const data = editor.getData();
                        setTransDetails({transDtls: data })
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

export default TransportListEdit