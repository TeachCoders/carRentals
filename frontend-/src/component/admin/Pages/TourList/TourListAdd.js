import { React, useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Formik, Form, Field, FieldArray, ErrorMessage } from "formik";
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
  tourpageRefid:yup.string().required('Please Select Your Category'),
  tourThumbInputField:yup.string().required('Please Upload Thumbnail Image'),
  tourNav:yup.string().required('Please input Navigation Name'),
  tourUrl:yup.string().required('Please input Page Url'),
  tourTitle:yup.string().required('Please input Page Title'),
  tourMetadesc:yup.string().required('Please input Page Meta Description'),
  tourMetakey:yup.string().required('Please input Page Meta Keyword'),
  tourH1:yup.string().required('Please input Page Heading (h1)'),
  tourDuration:yup.string().required('Please input Tour Duration'),
  tourRoute:yup.string().required('Please input Tour Route'),
  tourSliderInputField:yup.string().required('Please Upload Slider Image'),
  tourHlView:yup.string().required('Please Input Transport Highlight Over View'),
  tourHlPoint:yup.string().required('Please Input Transport Highlight Point in ul li'),
  tourDtls:yup.string().required('Please input Page Details'),
})


function TourListAdd() {

  //defind use state
  let id= useParams()
  let [catData, setCatData]=useState([{}]) // find all category


  //use Effect
  useEffect(()=>{
   axios.get(`/category/tour`).then((x)=>{ 
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
              <h1>Add Tour </h1>
              <div className='row'>
              <Formik
                validationSchema={validationSchema}

                 initialValues={{
                  tourpageRefid : '',
                  tourThumbInputField : '',
                  tourNav : '',
                  tourUrl : '',
                  tourMetadesc : '',
                  tourMetakey : '',
                  tourTitle : '',
                  tourH1 : '',
                  tourDuration: '',
                  tourRoute : '',
                  tourSliderInputField : '',
                  tourHlView : '',
                  tourHlPoint : '',
                  tourDtls : '',
                  dayTours: [{
                    dayCont : '',
                    dayDtls : ''
                  }],
                 }}

                 onSubmit={async(values) => {
                  console.log(values)

                  let formdata = new FormData() // create form object

    // here all input dat append (insert) in form object
    formdata.append('tourpageRefid', values.tourpageRefid)    
    formdata.append('tourTitle', values.tourTitle)
    formdata.append('tourUrl', values.tourUrl)
    formdata.append('tourNav', values.tourNav)
    formdata.append('tourMetadesc', values.tourMetadesc)
    formdata.append('tourMetakey', values.tourMetakey)
    formdata.append('tourH1', values.tourH1)
    formdata.append('tourDuration', values.tourDuration)
    formdata.append('tourRoute', values.tourRoute)
    formdata.append('tourHlView', values.tourHlView)
    formdata.append('tourHlPoint', values.tourHlPoint)
    formdata.append('tourDtls', values.tourDtls)
    // formdata.append('dayTours', values.dayTours)


    if(values.dayTours[0]){
      Array.from(values.dayTours).forEach((x)=>{
        console.log(x.dayCont)
        console.log(x.dayDtls)
        formdata.append('dayCont', x.dayCont)
        formdata.append('dayDtls', x.dayDtls)           
      })
    }


    
    if(values.dayTours[0]){

      Array.from(values.dayTours).forEach((x)=>{       
       formdata.append('dayTours', JSON.stringify(x))              
      })
    }


    
    if(values.tourSliderInputField[0]){  
      Array.from(values.tourSliderInputField).forEach((x)=>{
        formdata.append('tourSliderInputField', x)           
      })
    }
    if(values.tourThumbInputField[0]){  
      Array.from(values.tourThumbInputField).forEach((x)=>{
        formdata.append('tourThumbInputField', x)           
      })
    }
    
    


    await axios.post('/tour/addApi', formdata).then((x)=>{
      if(x.data.errorMessage){
        alert(x.data.errorMessage)
      }
      else{
        navigate('/admin/dashboard/tour-list/')
      }      
    })
}}             
>

                  {({ values, setFieldValue }) => (  


               
                <Form>                 
                    <div className="mb-3 mt-3 row g-9 align-items-center">
                        <div className="col col-lg-2"><label className="form-label">Category</label></div>
                        <div className="col"> 
                           <Field as="select" class="form-select" name='tourpageRefid' aria-label="Default select example">
                              <option>Select Your Category</option>
                                {  catData.map((x)=>{
                                    return <><option key={x._id} value={x._id}>{x.SbctNav}</option></> 
                                    })
                                  } 
                              </Field> 
                              <span class="text-danger"><ErrorMessage name='tourpageRefid' /></span>
                        </div>
                    </div>


                <div className="mb-3 mt-3 row g-9 align-items-center">
                    <div className="col col-lg-2"><label className="form-label">Tumbnail</label></div>
                    <div className="col">
                      <input type="file" name='tourThumbInputField' onChange={(e) =>  setFieldValue('tourThumbInputField', e.target.files)} className="form-control p-2" multiple/> 
                      <span class="text-danger"><ErrorMessage name='tourThumbInputField' /></span>
                       </div>
                </div>
                

                <div className="mb-3 mt-3 row g-9 align-items-center">
                    <div className="col col-lg-2"><label className="form-label">Menu Name</label></div>
                    <div className="col">
                      <Field type="text" name="tourNav" className="form-control" placeholder="Menu Name" />
                      <span class="text-danger"><ErrorMessage name='tourNav' /></span>
                    </div>
                  </div>
                
                
                  <div className="mb-3 mt-3 row g-9 align-items-center">
                    <div className="col col-lg-2"><label className="form-label">Category URL</label></div>
                    <div className="col">
                      <Field type="text" name="tourUrl" className="form-control" placeholder="Page Url" />
                      <span class="text-danger"><ErrorMessage name='tourUrl' /></span>
                      </div>
                  </div>
                  <div className="mb-3 mt-3 row g-9 align-items-center">
                    <div className="col col-lg-2"><label className="form-label">Page Title</label></div>
                    <div className="col">
                      <Field type="text" name="tourTitle" className="form-control" placeholder="Page Meta Description"  />
                      <span class="text-danger"><ErrorMessage name='tourTitle' /></span>
                      </div>
                  </div>
                  <div className="mb-3 mt-3 row g-9 align-items-center">
                    <div className="col col-lg-2"><label className="form-label">Page Meta Description</label></div>
                    <div className="col">
                      <Field type="text" name="tourMetadesc" className="form-control" placeholder="Page Meta Description" />
                      <span class="text-danger"><ErrorMessage name='tourMetadesc' /></span>
                      </div>
                  </div>
                  <div className="mb-3 mt-3 row g-9 align-items-center">
                    <div className="col col-lg-2"><label className="form-label">Page Meta Keyword</label></div>
                    <div className="col">
                      <Field type="text" name="tourMetakey" className="form-control" placeholder="Page Meta Keyword" />
                      <span class="text-danger"><ErrorMessage name='tourMetakey' /></span>
                    </div>
                  </div>
                  <div className="mb-3 mt-3 row g-9 align-items-center">
                    <div className="col col-lg-2"><label className="form-label">Tour Duration</label></div>
                    <div className="col">
                      <Field type="number" name="tourDuration" className="form-control" placeholder="Tour Duration" />
                      <span class="text-danger"><ErrorMessage name='tourDuration' /></span>
                    </div>
                  </div>
                  <div className="mb-3 mt-3 row g-9 align-items-center">
                    <div className="col col-lg-2"><label className="form-label">Tour Route</label></div>
                    <div className="col">
                      <Field type="text" name="tourRoute" className="form-control" placeholder="Tour Route" />
                      <span class="text-danger"><ErrorMessage name='tourRoute' /></span>
                    </div>
                  </div>
                  <div className="mb-3 mt-3 row g-9 align-items-center">
                    <div className="col col-lg-2"><label className="form-label">h1</label></div>
                    <div className="col">
                      <Field type="text" name="tourH1" className="form-control" placeholder="Page Heading" />
                      <span class="text-danger"><ErrorMessage name='tourH1' /></span>
                    </div>
                  </div>
                  <div className="mb-3 mt-3 row g-9 align-items-center">
                    <div className="col col-lg-2"><label className="form-label">Photo</label></div>
                    <div className="col">
                        <input type="file" name='tourSliderInputField' onChange={(e) => setFieldValue('tourSliderInputField', e.target.files)} className="form-control p-2" multiple/> 
                        <span class="text-danger"><ErrorMessage name='tourSliderInputField' /></span>
                    </div>
                  </div>


                  
                  <div className="mb-3 mt-3 row g-9 align-items-center">
                    <div className="col col-lg-2"><label className="form-label">highlight Over View</label></div>
                    <div className="col">
                    <CKEditor name='tourHlView' editor={ClassicEditor} 
                      onChange={(event, editor) => {
                        const data = editor.getData();
                        setFieldValue('tourHlView', data )
                      }}
                         />
                      <span class="text-danger"><ErrorMessage name='tourHlView' /></span>
                      </div>
                  </div>
                  <div className="mb-3 mt-3 row g-9 align-items-center">
                    <div className="col col-lg-2"><label className="form-label">highlight Point </label></div>
                    <div className="col">
                    <CKEditor name='tourHlPoint' editor={ClassicEditor} 
                      onChange={(event, editor) => {
                        const data = editor.getData();
                        setFieldValue('tourHlPoint', data )
                      }}
                         />
                      <span class="text-danger"><ErrorMessage name='tourHlPoint' /></span>
                      </div>
                  </div>
                  <div className="mb-3 mt-3 row g-9 align-items-center">
                    <div className="col col-lg-2"><label className="form-label">Cateogy Details</label></div>
                    <div className="col">
                    <CKEditor name='tourDtls' editor={ClassicEditor} 
                      onChange={(event, editor) => {
                        const data = editor.getData();
                        setFieldValue('tourDtls', data )
                      }}
                         />
                      <span class="text-danger"><ErrorMessage name='tourDtls' /></span>
                    </div>
                  </div>



                  <div className="mb-3 mt-3 row g-9 align-items-center">
                    <div className="col col-lg-2"><label className="form-label">Day Tour</label></div>
                    <FieldArray
                      name="dayTours"
                      render={arrayHelpers => (
                        <div className="col border-bottom border-top border-primary border-1">
                          {values.dayTours && values.dayTours.length > 0 ? (
                            values.dayTours.map((dayTour, index) => (
                              <div className='border-bottom border border-1  p-2 border-bottom-0 bg-light p-4' key={index}>
                                <Field name={`dayTours.${index}.dayCont`} placeholder='Tour Day' className="form-control p-2" /><br />
                                <CKEditor name={`dayTours.${index}.dayDtls`} editor={ClassicEditor} onChange={(event, editor) => {
                                  const data = editor.getData();  setFieldValue(`dayTours.${index}.dayDtls`, data )  }}
                                />
                                {/* <Field name={`dayTours.${index}.dayDtls`} placeholder='Tour Details' className="form-control p-2" /><br /> */}
                                <div className='d-flex justify-content-center pt-2 pb-4'>
                                <button className='me-1 bg-danger text-white p-1'  type="button" onClick={() => arrayHelpers.remove(index)}>Remove {index+1} Day</button>
                                <button className='ms-1 bg-success text-white p-1'  type="button" onClick={() => arrayHelpers.insert(index+1, '')}>Add More Days</button>
                                </div>
                                <br /><br />
                              </div>
                            ))
                          ) : (
                            <button type="button" onClick={() => arrayHelpers.push('')}>
                              Add a dayTour
                            </button>
                          )}
                        </div>
                      )}
                    />
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

export default TourListAdd