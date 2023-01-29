import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from 'yup'
import axios from 'axios'

const validationSchema = yup.object({
    userName: yup.string().required('Please Input Login id'),
     email: yup.string().required("Email is Required").email("Please enter Valid email"),
   password: yup.string().required("Pasword is Required").matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character"
      ),
    confirmPassword: yup.string().required('Confirm Password is required')
    .oneOf([yup.ref('password')], 'Confirm Passwords not matched from pasword must match')
})

function SignUp() {
    let navigate = useNavigate()
    return (
        <>
            <div className='container pt-4 '>
                <div className='mb-5 mt-3 d-flex align-items-center justify-content-center'>
                    <div className='col-lg-5'>
                        <h2>Registaration</h2>

                        <Formik
                            validationSchema={validationSchema}
                            initialValues={{
                                userName:'',
                                email:'',
                                password:'',
                                confirmPassword:'',
                            }}

                            onSubmit={async(values) => {   
                                console.log(values) 
                                await axios.post('/auth/signup/', values).then((x)=>{                                   
                                    if(x.data.sucess){
                                       
                                        navigate('/admin')
                                    }
                                    else{
                                        alert(x.data.error)
                                
                                    }
                                  })
                            }}
                        >
                            {({ values }) => (
                                <Form>
                                    <div class="mb-3">
                                        <Field name="userName" type="text" class="form-control" placeholder='User Name' />
                                        <span class="text-danger"><ErrorMessage name='userName' /></span>
                                    </div>

                                    <div class="mb-3">
                                        <Field name="email" type="email" class="form-control" placeholder='emsil if' />
                                        <span class="text-danger"><ErrorMessage name='email' /></span>
                                    </div>
                                    <div class="mb-3">
                                        <Field name="password" type="password" class="form-control" placeholder='pasword' />
                                        <span class="text-danger"><ErrorMessage name='password' /></span>
                                    </div>
                                    <div class="mb-3">
                                        <Field name="confirmPassword" type="password" class="form-control" placeholder='pasword' />
                                        <span class="text-danger"><ErrorMessage name='confirmPassword' /></span>
                                    </div> 
                                    <button type="submit" class="btn btn-primary">Submit</button>
                                </Form>
                            )}

                        </Formik>

                      <p>You Have Account ? <Link  to="/admin/">Login</Link></p> 


                    </div>
                </div>
            </div>
        </>
    )
}

export default SignUp
