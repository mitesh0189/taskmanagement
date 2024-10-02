import React, { useEffect } from 'react'
// import "./login.css"
import { NavLink, useNavigate } from 'react-router-dom'
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
// import 'react-toastify/dist/ReactToastify.css';
import { useForm } from 'react-hook-form';
const Login = () => {
  const navigate = useNavigate();
  const { handleSubmit, register, formState: { errors } } = useForm();

  const adddata = async (data) => {

    try {
      const res = await axios.post("http://localhost:4000/api/user/login", data);
      if (res && res.data.success) {
        const authHeader = res.headers['auth-token'];
        if (authHeader) {
          localStorage.setItem('token', res.data.token);

          // localStorage.setItem('token', authHeader);
          toast.success(res.data.message || 'Login successful!');
          navigate('/');
        } else {
          console.error('Authentication token is missing');
          toast.error('Authentication token is missing');
        }
      } else {
        toast.error(res.data.message || 'Login failed!');
      }
    } catch (error) {
      console.log(error);
      toast.error('An error occurred during login');
    }
  };


  return (
    <>
     <div className="login">
        <div className="shadow-lg login-content">
          <div className="row mx-0">
            <div className="col-lg-6 ">
              <img src="signin1.jpg" style={{ width: '100%' }} alt="" className='signin-img' />
              <div className='text-center mb-5'>
                <NavLink to="/signup" className="btn btn-primary text-white" style={{marginTop:'10px', marginRight:'10px'}}>Create an account</NavLink>
              </div>
            </div>
            <div className="col-lg-6 ">
              <p className='login-text'>Sign In</p>
              <form method='post' onSubmit={handleSubmit(adddata)} >
                <div className='mt-4 data-2'>
                  <label htmlFor="">
                    <i className="fa-solid fa-user icon"></i></label>
                  <input type="email" {...register("email", { required: "Enter password" })} placeholder='Your Email' id='name' required className='input-demo' />

                </div>
                <div className='mt-4 data-2'>
                  <label htmlFor="">
                    <i class="fa-solid fa-lock icon"></i></label>
                  <input type="password" {...register("password", { required: "Enter password" })} placeholder='Your Password' required className='input-demo' />
                </div>
                <div className='mt-5 '>
                  {/* <input type="submit" value="login" className='btn btn-primary text-white  w-50 ' name='login' id='login' /> */}
                  <button className='btn btn-primary text-white  w-50 '>login</button>
                </div>

              </form>
            </div>
            <Toaster />

          </div>
        </div>
      </div>
    </>
  )
}

export default Login
