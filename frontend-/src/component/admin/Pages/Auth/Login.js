import React from 'react'
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from 'yup'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

const validationSchema = yup.object({
    email: yup.string().required('Please Input Login id'),
    password: yup.string().required('Please Input Login Pasword'),
})

function Login() {
    let navigate = useNavigate()
    return (
        <>
            <div className='container pt-4 '>
                <div className='mb-5 mt-3 d-flex align-items-center justify-content-center'>
                    <div className='col-lg-5'>
                        <h2>Login</h2>

                        <Formik
                            validationSchema={validationSchema}
                            initialValues={{

                                email: '',
                                password: '',
                            }}

                            onSubmit={async (values) => { 
                                console.log(values)   
                                await axios.post('/auth/', values).then((x)=>{ 
                                    
                                    console.log(x.data.result)    
                                    if(x.data.result){
                                        localStorage.setItem('userDatatoken', x.data.result.token )
                                        navigate('/admin/dashboard')
                                    }
                                    // if(x.data.sucess){     
                                                                    
                                    //     
                                    // }
                                    else{
                                        alert(x.data.error)                                        
                                    }
                                  })
                            }}
                        >
                            {({ values }) => (
                                <Form>
                                    <div class="mb-3">
                                        <Field name="email" type="text" class="form-control" placeholder='user id' />
                                        <span class="text-danger"><ErrorMessage name='email' /></span>
                                    </div>
                                    <div class="mb-3">
                                        <Field name="password" type="password" class="form-control" placeholder='pasword' />
                                        <span class="text-danger"><ErrorMessage name='password' /></span>
                                    </div>
                                    <button type="submit" class="btn btn-primary">Submit</button>
                                </Form>
                            )}

                        </Formik>


                        
                      <p>You Have not Account ? <Link  to="/admin/registration">Registartion Here</Link></p> 

                    </div>
                </div>
            </div>
        </>
    )
}

export default Login
