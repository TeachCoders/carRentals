import { React, useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from 'yup'
//ui component
import SideNav from '../../common/SideNav'
import AdminHeader from '../../common/AdminHeader'
import AdminFooter from '../../common/AdminFooter'
//end ui component
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'


const validationSchema = yup.object({
  dtlspageRefid:yup.string().required('Please Select Your Category'),
  prdThumbInputField:yup.string().required('Please Upload Thumbnail Image'),
  transNav:yup.string().required('Please input Navigation Name'),
  transUrl:yup.string().required('Please input Page Url'),
  transTitle:yup.string().required('Please input Page Title'),
  transMetaDesc:yup.string().required('Please input Page Meta Description'),
  transMetaKey:yup.string().required('Please input Page Meta Keyword'),
  transH1:yup.string().required('Please input Page Heading (h1)'),
  prdSliderInputField:yup.string().required('Please Upload Slider Image'),
  transHlView:yup.string().required('Please Input Transport Highlight Over View'),
  transHlPoint:yup.string().required('Please Input Transport Highlight Point in ul li'),
  transDtls:yup.string().required('Please input Page Details'),
})


function TransportListAdd() {

  //defind use state
  let id= useParams()
  let [catData, setCatData]=useState([{}]) // find all category
  

  //use Effect
  useEffect(()=>{
   axios.get(`/category/transport`).then((x)=>{ 
    console.log(x.data.subCatlistid)
    setCatData(x.data.subCatlistid)
   //setCatData([x.data])
  })  
  },[])




  let navigate = useNavigate()

  return (
    <>

    <AdminHeader />

      <div className='container-fluid'>
        <div className='row'>
          <div className='col-lg-2 sidebaare'><SideNav /></div>
          <div className='col-lg-10'>
            <div className="dashboard-content-area">
              <h1>Add Transport </h1>
              <div className='row'>

              <Formik
              validationSchema={validationSchema}

               initialValues={{
                  dtlspageRefid : '',
                  prdThumbInputField : '',
                  transNav : '',
                  transUrl : '',
                  transTitle : '',
                  transMetaDesc : '',
                  transMetaKey : '',
                  transH1: '',
                  prdSliderInputField: '',
                  transHlView: '',
                  transHlPoint : '',
                  transDtls : '',
               }}
               onSubmit={async (values) => {
                console.log(values)
                let formdata = new FormData() // create form object

                // here all input dat append (insert) in form object
                formdata.append('dtlspageRefid', values.dtlspageRefid)    
                formdata.append('transTitle', values.transTitle)
                formdata.append('transUrl', values.transUrl)
                formdata.append('transNav', values.transNav)
                formdata.append('transMetaDesc', values.transMetaDesc)
                formdata.append('transMetaKey', values.transMetaKey)
                formdata.append('transH1', values.transH1)
                formdata.append('transDtls', values.transDtls)
                formdata.append('transHlView', values.transHlView)
                formdata.append('transHlPoint', values.transHlPoint)
                if(values.prdSliderInputField[0]){  
                  Array.from(values.prdSliderInputField).forEach((x)=>{
                    formdata.append('prdSliderInputField', x)           
                  })
                }
                if(values.prdThumbInputField[0]){  
                  Array.from(values.prdThumbInputField).forEach((x)=>{
                    formdata.append('prdThumbInputField', x)           
                  })
                }
                
                
            
            
                await axios.post('/transport/addApi', formdata).then((x)=>{
                  if(x.data.errorMessage){
                    alert(x.data.errorMessage)
                  }
                  else{
                    navigate('/admin/dashboard/transport-list/')
                  }      
                })
              
              }
                
              }
              
              >

                  {({ values, setFieldValue }) => (   
                    <Form>                 
                    <div className="mb-3 mt-3 row g-9 align-items-center">
                        <div className="col col-lg-2"><label className="form-label">Category</label></div>
                        <div className="col"> 
                           <Field as ="select" class="form-select" name='dtlspageRefid' aria-label="Default select example">
                              <option>Select Your Category</option>
                                {
                                    catData.map((x)=>{
                                    return <><option key={x._id} value={x._id}>{x.SbctNav}</option></> 
                                    })
                                  } 
                              </Field> 
                               <span class="text-danger"><ErrorMessage name='dtlspageRefid' /></span>
                        </div>
                    </div>


                <div className="mb-3 mt-3 row g-9 align-items-center">
                    <div className="col col-lg-2"><label className="form-label">Tumbnail</label></div>
                    <div className="col">
                      <input type="file" name='prdThumbInputField' onChange={(e) =>  setFieldValue('prdThumbInputField', e.target.files)} className="form-control p-2" multiple/> 
                      <span class="text-danger"><ErrorMessage name='prdThumbInputField' /></span>
                    </div>
                </div>
                

                <div className="mb-3 mt-3 row g-9 align-items-center">
                    <div className="col col-lg-2"><label className="form-label">Menu Name</label></div>
                    <div className="col">
                      <Field type="text" name="transNav" className="form-control" placeholder="Menu Name"  />
                      <span class="text-danger"><ErrorMessage name='transNav' /></span>
                      </div>
                  </div>
                
                
                  <div className="mb-3 mt-3 row g-9 align-items-center">
                    <div className="col col-lg-2"><label className="form-label">Category URL</label></div>
                    <div className="col">
                      <Field type="text" name="transUrl" className="form-control" placeholder="Page Url"  />
                      <span class="text-danger"><ErrorMessage name='transUrl' /></span>
                      </div>
                  </div>
                  <div className="mb-3 mt-3 row g-9 align-items-center">
                    <div className="col col-lg-2"><label className="form-label">Page Title</label></div>
                    <div className="col">
                      <Field type="text" name="transTitle" className="form-control" placeholder="Page Meta Description" />
                      <span class="text-danger"><ErrorMessage name='transTitle' /></span>
                      </div>
                  </div>
                  <div className="mb-3 mt-3 row g-9 align-items-center">
                    <div className="col col-lg-2"><label className="form-label">Page Meta Description</label></div>
                    <div className="col">
                      <Field type="text" name="transMetaDesc" className="form-control" placeholder="Page Meta Description" />
                      <span class="text-danger"><ErrorMessage name='transMetaDesc' /></span>
                      </div>
                  </div>
                  <div className="mb-3 mt-3 row g-9 align-items-center">
                    <div className="col col-lg-2"><label className="form-label">Page Meta Keyword</label></div>
                    <div className="col">
                      <Field type="text" name="transMetaKey" className="form-control" placeholder="Page Meta Keyword" />
                      <span class="text-danger"><ErrorMessage name='transMetaKey' /></span>
                      </div>
                  </div>
                  <div className="mb-3 mt-3 row g-9 align-items-center">
                    <div className="col col-lg-2"><label className="form-label">h1</label></div>
                    <div className="col">

                      <Field type="text" name="transH1" className="form-control" placeholder="Page Heading (h1)" />
                      <span class="text-danger"><ErrorMessage name='transH1' /></span>
                      </div>
                  </div>
                  <div className="mb-3 mt-3 row g-9 align-items-center">
                    <div className="col col-lg-2"><label className="form-label">Photo</label></div>
                    <div className="col">
                      <input type="file" name='prdSliderInputField' onChange={(e) => setFieldValue('prdSliderInputField', e.target.files)} className="form-control p-2" multiple/>
                      <span class="text-danger"><ErrorMessage name='prdSliderInputField' /></span>
                      </div>
                  </div>

                  <div className="mb-3 mt-3 row g-9 align-items-center">
                    <div className="col col-lg-2"><label className="form-label">highlight Over View</label></div>
                    <div className="col">
                    <CKEditor name='transHlView' editor={ClassicEditor} 
                      onChange={(event, editor) => {
                        const data = editor.getData();
                        setFieldValue('transHlView', data )
                      }}
                         />
                      <span class="text-danger"><ErrorMessage name='transHlView' /></span>
                      </div>
                  </div>
                  <div className="mb-3 mt-3 row g-9 align-items-center">
                    <div className="col col-lg-2"><label className="form-label">highlight Point </label></div>
                    <div className="col">
                    <CKEditor name='transHlPoint' editor={ClassicEditor} 
                      onChange={(event, editor) => {
                        const data = editor.getData();
                        setFieldValue('transHlPoint', data )
                      }}
                         />
                      <span class="text-danger"><ErrorMessage name='transHlPoint' /></span>
                      </div>
                  </div>
                  <div className="mb-3 mt-3 row g-9 align-items-center">
                    <div className="col col-lg-2"><label className="form-label">Cateogy Details</label></div>
                    <div className="col">
                    <CKEditor name='transDtls' editor={ClassicEditor} 
                      onChange={(event, editor) => {
                        const data = editor.getData();
                        setFieldValue('transDtls', data )
                      }}
                         />
                      <span class="text-danger"><ErrorMessage name='transDtls' /></span>
                    </div>
                  </div>

                  <div className="mb-5 mt-3 align-items-center text-center">
                    <button type="submit" className="btn btn-primary">Submit</button>
                  </div>
                </Form>
                  )}

              </Formik>

                
              </div>
            </div>

          </div>
        </div>
      </div>

      <AdminFooter />

    </>
  )
}

export default TransportListAdd