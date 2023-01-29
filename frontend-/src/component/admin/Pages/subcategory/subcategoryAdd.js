import { React, useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from 'yup'
//ui component
import SideNav from '../../common/SideNav'
import AdminHeader from '../../common/AdminHeader'
import AdminFooter from '../../common/AdminFooter'
//end ui component
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import axios from 'axios'

const validationSchema = yup.object({
  subCatlistid:yup.string().required('Please Select Your Category'),
  prdThumbInputField:yup.string().required('Please Upload thumbnail Image'),
  SbctNav:yup.string().required('Please Input Navigation Name'),
  SbctUrl:yup.string().required('Please Input Page Url'),
  Sbcth1:yup.string().required('Please Input Page Heading (h1)'),
  SbctTitle:yup.string().required('Please Input Page Title'),
  SbctMetadesc:yup.string().required('Please input Meta Description'),
  SbctMetakey:yup.string().required('Please input Meta Keyword'),
  prdSliderInputField:yup.string().required('Please Upload Slider Image'),
  SbctDtls:yup.string().required('Please Input Page Details'),
})

function ProductCategoryAdd() {

  //defind use state
  let {id} = useParams()
  let [catData_id, setCatData]=useState([{}]) // find all category
 

  //use Effect
  useEffect(()=>{
   axios.get(`/category/${id}`).then((x)=> setCatData(x.data)) //find all category form  main category api
  },[id])

console.log(catData_id._id)

  let navigate = useNavigate()

  return (
    <>

    <AdminHeader />

      <div className='container-fluid'>
        <div className='row'>
          <div className='col-lg-2 sidebaare'><SideNav /></div>
          <div className='col-lg-10'>
            <div className="dashboard-content-area">
              <h1>Add {id} Category </h1>
              <div className='row'>

                <Formik
                 validationSchema={validationSchema}

                 initialValues={{
                  subCatlistid : '',
                  prdThumbInputField : '',
                  SbctNav : '',
                  SbctUrl : '',
                  Sbcth1 : '',
                  SbctTitle : '',
                  SbctMetadesc : '',
                  SbctMetakey : '',
                  prdSliderInputField : '',
                  SbctDtls : '',
                 }}

                 onSubmit={async (values) => {
                  console.log(values)

         

                  let formdata = new FormData()     
                  formdata.append('subCatlistid', values.subCatlistid) 
                  formdata.append('SbctType', values.SbctType)     
                  formdata.append('SbctTitle', values.SbctTitle)
                  formdata.append('SbctUrl', values.SbctUrl)
                  formdata.append('SbctNav', values.SbctNav)
                  formdata.append('SbctMetadesc', values.SbctMetadesc)
                  formdata.append('SbctMetakey', values.SbctMetakey)
                  formdata.append('Sbcth1', values.Sbcth1)
                  formdata.append('SbctDtls', values.SbctDtls)
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
              
              
                  await axios.post('/subcategory/addApi', formdata).then((x)=>{
                    if(x.data.errorMessage){
                      alert(x.data.errorMessage)
                    }
                    else{
                      navigate('/admin/dashboard/product/')
                    }      
                  })

                 }}
                
                >
                   {({ values, setFieldValue }) => (                   

                    <Form>                  


           
                                        
                        <div className="mb-3 mt-3 row g-9 align-items-center">
                          <div className="col col-lg-2"><label className="form-label">Category Name</label></div>
                          <div className="col">
                            <Field as="select" class="form-select" name='subCatlistid' aria-label="Default select example">
                              <option>Select Your Category Name</option>
                              <option value={catData_id._id}>   {catData_id.ctType}   </option>
                            </Field>
                            <span class="text-danger"><ErrorMessage name='subCatlistid' /></span>
                          </div>
                        </div> 

                        <div className="mb-3 mt-3 row g-9 align-items-center">
                          <div className="col col-lg-2"><label className="form-label">Tumbnail</label></div>
                          <div className="col">
                            <input type="file" name='prdThumbInputField' onChange={(e) => setFieldValue('prdThumbInputField', e.target.files)} className="form-control p-2" multiple/>
                            <span class="text-danger"><ErrorMessage name='prdThumbInputField' /></span>
                             </div>
                        </div>

                        <div className="mb-3 mt-3 row g-9 align-items-center">
                          <div className="col col-lg-2"><label className="form-label">Menu Name</label></div>
                          <div className="col">
                            <Field  autocomplete="off" type="text" name="SbctNav" className="form-control" placeholder="Page name as you want display in menu" />
                            <span class="text-danger"><ErrorMessage name='SbctNav' /></span>
                            </div>
                        </div>

                        <div className="mb-3 mt-3 row g-9 align-items-center">
                          <div className="col col-lg-2"><label className="form-label">Category URL</label></div>
                          <div className="col">
                            <Field  autocomplete="off" type="text" name="SbctUrl" className="form-control" placeholder="Page Url" />
                            <span class="text-danger"><ErrorMessage name='SbctUrl' /></span>
                            </div>
                        </div>

                        <div className="mb-3 mt-3 row g-9 align-items-center">
                          <div className="col col-lg-2"><label className="form-label">h1</label></div>
                          <div className="col">
                            <Field  autocomplete="off" type="text" name="Sbcth1" className="form-control" placeholder="Page Heading" />
                            <span class="text-danger"><ErrorMessage name='Sbcth1' /></span>
                            </div>
                        </div>
                        <div className="mb-3 mt-3 row g-9 align-items-center">
                          <div className="col col-lg-2"><label className="form-label">Page Title</label></div>
                          <div className="col">
                            <Field  autocomplete="off" type="text" name="SbctTitle" className="form-control" placeholder="Page Meta Description" />
                            <span class="text-danger"><ErrorMessage name='SbctTitle' /></span>
                            </div>
                        </div>
                        <div className="mb-3 mt-3 row g-9 align-items-center">
                          <div className="col col-lg-2"><label className="form-label">Page Meta Description</label></div>
                          <div className="col">
                            <Field  autocomplete="off" type="text" name="SbctMetadesc" className="form-control" placeholder="Page Meta Description" />
                            <span class="text-danger"><ErrorMessage name='SbctMetadesc' /></span>
                          </div>
                        </div>
                        <div className="mb-3 mt-3 row g-9 align-items-center">
                          <div className="col col-lg-2"><label className="form-label">Page Meta Keyword</label></div>
                          <div className="col">
                            <Field  autocomplete="off" type="text" name="SbctMetakey" className="form-control" placeholder="Page Meta Keyword"  />
                            <span class="text-danger"><ErrorMessage name='SbctMetakey' /></span>
                            </div>
                        </div>
                        <div className="mb-3 mt-3 row g-9 align-items-center">
                          <div className="col col-lg-2"><label className="form-label">Slider Image</label></div>
                          <div className="col">
                            <input type="file" name='prdSliderInputField' onChange={(e) => setFieldValue('prdSliderInputField', e.target.files)} className="form-control p-2" multiple/> 
                            <span class="text-danger"><ErrorMessage name='prdSliderInputField' /></span>
                            </div>
                        </div>

                        <div className="mb-3 mt-3 row g-9 align-items-center">
                          <div className="col col-lg-2"><label className="form-label">Cateogy Details</label></div>
                          <div className="col">

                            <CKEditor name='SbctDtls' editor={ClassicEditor} 
                            onChange={(event, editor) => {
                              const data = editor.getData();
                              setFieldValue('SbctDtls', data )
                            }}
                            />
                               <span class="text-danger"><ErrorMessage name='SbctDtls' /></span>


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

export default ProductCategoryAdd