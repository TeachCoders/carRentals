import { React, useState } from 'react'
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
  thumbInputField:yup.string().required('Please Upload thumbnail Image'),
  ctType:yup.string().required('Please Select Category Type'),
  ctUrl: yup.string().required('Please Input Category Url'),
  ctMetadesc:yup.string().required('Please Input Page meta Description'),
  ctMetakey:yup.string().required('Please Input Page meta Keyword'),
  cth1:yup.string().required('Please Input Page Heading(h1)'),
  SliderInputField:yup.string().required('Please Upload Slider Image'),
   ctDtls:yup.string().required('Please Input Page Over View'),
})

function CategoryAdd() {

  let navigate = useNavigate()

  return (
    <>

    <AdminHeader />

      <div className='container-fluid'>
        <div className='row'>
          <div className='col-lg-2 sidebaare'><SideNav /></div>
          <div className='col-lg-10'>
            <div className="dashboard-content-area">
              <h1>Add Category</h1>
              <div className='row'>
              <Formik
              validationSchema={validationSchema}
              initialValues={{
                thumbInputField : '',
                ctType : '',
                ctUrl : '',
                ctTitle : '',   
                ctMetadesc : '',
                ctMetakey: '',
                cth1: '',
                SliderInputField: '',
                ctDtls: ''  ,              
              }}

              onSubmit={ async(values) => {
                console.log(values);
                let formdata = new FormData() 
                formdata.append('ctUrl', values.ctUrl)
                formdata.append('ctType', values.ctType)    
                formdata.append('ctTitle', values.ctTitle)
                formdata.append('ctMetadesc', values.ctMetadesc)
                formdata.append('ctMetakey', values.ctMetakey)
                formdata.append('cth1', values.cth1)
                formdata.append('ctDtls', values.ctDtls)
                if(values.SliderInputField[0]){  
                  Array.from(values.SliderInputField).forEach((x)=>{
                    formdata.append('SliderInputField', x)           
                  })
                }
                if(values.thumbInputField[0]){  
                  Array.from(values.thumbInputField).forEach((x)=>{
                    formdata.append('thumbInputField', x)           
                  })
                }
                
                
            
            
                await axios.post('/category/addApi', formdata).then((x)=>{
                  if(x.data.errorMessage){
                    alert(x.data.errorMessage)
                  }
                  else{
                    navigate('/admin/dashboard/category')
                  }
                 
                })
              }}            
              >
             {({ values, setFieldValue }) => (
                
<Form>                  

<div className="mb-3 mt-3 row g-9 align-items-center">
    <div className="col col-lg-2"><label className="form-label">Tumbnail</label></div>
    <div className="col">
      <input type="file" name='thumbInputField' onChange={(e) => {setFieldValue('thumbInputField', e.target.files) }} className="form-control p-2" multiple/>
      <span class="text-danger"><ErrorMessage name='thumbInputField' /></span>
       </div>
</div>   

<div className="mb-3 mt-3 row g-9 align-items-center">
    <div className="col col-lg-2"><label className="form-label">Category Name</label></div>
    <div className="col"> 
      <Field as="select" class="form-select" name='ctType' aria-label="Default select example">
                <option>Select Category Type</option>
                <option value='Transport'>Transport</option>
                <option value='Tour'>Tour</option>                                
                <option value='Luxury Train'>Luxury Train</option>
                <option value='Article'>Article</option>
                <option value='Blog'>Blog</option>
          </Field>
          <p className='cont-adm-message'><span>*</span> if you want custom Category Name then contact with Developer</p>    
          <span class="text-danger"><ErrorMessage name='ctType' /></span>
    </div>
</div>
         

  <div className="mb-3 mt-3 row g-9 align-items-center">
    <div className="col col-lg-2"><label className="form-label">Category URL</label></div>
    <div className="col">
      <Field autocomplete="off" type="text" name="ctUrl" className="form-control" placeholder="Page Url"/>
      <span class="text-danger"><ErrorMessage name='ctUrl' /></span>
      </div>
  </div> 


  <div className="mb-3 mt-3 row g-9 align-items-center">
    <div className="col col-lg-2"><label className="form-label">Page Title</label></div>
    <div className="col">
      <Field  autocomplete="off"  type="text" name="ctTitle" className="form-control" placeholder="Page Title" />
      <span class="text-danger"><ErrorMessage name='ctTitle' /></span>
      </div>
  </div>
  <div className="mb-3 mt-3 row g-9 align-items-center">
    <div className="col col-lg-2"><label className="form-label">Cagegory Meta Description</label></div>
    <div className="col">
      <Field  autocomplete="off"  type="text" name="ctMetadesc" className="form-control" placeholder="Page Meta Description" />
      <span class="text-danger"><ErrorMessage name='ctMetadesc' /></span>
      </div>
  </div>
  <div className="mb-3 mt-3 row g-9 align-items-center">
    <div className="col col-lg-2"><label className="form-label">Meta Keyword</label></div>
    <div className="col">
      <Field  autocomplete="off"  type="text" name="ctMetakey" className="form-control" placeholder="Page Meta Keyword" />
      <span class="text-danger"><ErrorMessage name='ctMetakey' /></span>
      </div>
  </div>
  <div className="mb-3 mt-3 row g-9 align-items-center">
    <div className="col col-lg-2"><label className="form-label">h1</label></div>
    <div className="col">
      <Field type="text" name="cth1" className="form-control" placeholder="Page Heading" />
      <span class="text-danger"><ErrorMessage name='cth1' /></span>
      </div>
  </div>
  <div className="mb-3 mt-3 row g-9 align-items-center">
    <div className="col col-lg-2"><label className="form-label">Photo</label></div>
    <div className="col">
      <input type="file" name='SliderInputField' onChange={(e) => setFieldValue('SliderInputField', e.target.files)} className="form-control p-2" multiple/>
      <span class="text-danger"><ErrorMessage name='SliderInputField' /></span>
      </div>
  </div> 

  <div className="mb-3 mt-3 row g-9 align-items-center">
    <div className="col col-lg-2"><label className="form-label">Cateogy Details</label></div>
    <div className="col">   

      <CKEditor name="ctDtls" editor={ClassicEditor}  
            onChange={(event, editor) => {
            const data = editor.getData();
              setFieldValue("ctDtls", data);
            }}
      />
      <span class="text-danger"><ErrorMessage name='ctDtls' /></span>
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

export default CategoryAdd