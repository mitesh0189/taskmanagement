// import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { NavLink, useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
// import 'react-toastify/dist/ReactToastify.css';

const Register = () => {
  const navigate = useNavigate();
  const { handleSubmit, register, formState: { errors } } = useForm();

  const adddata = async (data) => {
  try {
    
      const res=await axios.post("http://localhost:4000/api/user/register",data)
      console.log(data);
      
      if(res && res.data.success){
        toast.success(res.data.message || 'Registration successful!');
        navigate('/login');
      }
      else {
        toast.error(res.data.message || 'Registration failed!');
      }
  } catch (error) {
    console.log(error);
  }
  };

  return (
    <div className='signup'>
      <div className='shadow-lg signup-content'>
        <div className="row mx-0">
          <div className="col-lg-6">
            <div className='p-5'>
              <p className='signup-text'>Sign up</p>
              <form method='post' onSubmit={handleSubmit(adddata)}>
                <div className='mt-4 data'>
                  <label htmlFor="name"><i className="fa-solid fa-user icon"></i></label>
                  <input type="text" {...register("name", { required: "Enter name" })} placeholder='Your Name' id='name' className='input-demo' />
                  {errors.name && <p>{errors.name.message}</p>}
                </div>
                <div className='mt-4 data'>
                  <label htmlFor="email"><i className="fa-solid fa-envelope icon"></i></label>
                  <input type="email" {...register("email", { required: "Enter email" })} placeholder='Your Email' id='email' className='input-demo' />
                  {errors.email && <p>{errors.email.message}</p>}
                </div>
                
              
                <div className='mt-4 data'>
                  <label htmlFor="password"><i className="fa-solid fa-lock icon"></i></label>
                  <input type="password" {...register("password",{ required: "Enter password" })} placeholder='Your Password' id='' className='input-demo' />
                  {errors.password && <p>{errors.password.message}</p>}
                </div>
               
                <div className='mt-4'>
                  {/* <input type="submit" value="Register" className='btn btn-primary text-white p-2 w-75' id='signup' /> */}
                  <button className='btn btn-primary text-white p-2 w-75'>Register</button>
                 

                </div>
                <Toaster />
              </form>
              
            </div>
          </div>
          <div className="col-lg-6 sign-img">
            <figure>
              <img src="signup1.jpg" alt="" className='img-fluid' />
              <div className='text-center'>
                <NavLink to="/login" className="already">I am already registered</NavLink>
              </div>
            </figure>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
