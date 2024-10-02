import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';

const DailyTaskForm = () => {
  const navigate = useNavigate();
  const { handleSubmit, register, formState: { errors } } = useForm();


  const submitData = async (data) => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.post("http://localhost:4000/api/user/task", data, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      console.log(res);

      if (res && res.data.success) {
        toast.success(res.data.message || 'task submited successful!');
        navigate('/login');
      }
      else {
        toast.error(res.data.message || 'task failed!');
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <div className='container bg-light p-5 mt-5 shadow'>
        <h1 className=' text-center add-blog '>Daily Task Portal</h1>
        <form method='post' onSubmit={handleSubmit(submitData)}>
          <div className="mb-3">
            <label htmlFor="Task_date" className="form-label">Your Task Date :</label>
            <input
              type="date"
              className="form-control"
              pattern="\d{4}-\d{2}-\d{2}"
              {...register("Task_date", { required: "Book name is required" })}
              placeholder="Enter task date "
            />
            {errors.Task_date && <p className="text-danger">{errors.Task_date.message}</p>}
          </div>
          <div className="mb-3">
            <label htmlFor="Task_desc" className="form-label">your task description :</label>
            <textarea name="" id="" {...register("Task_desc", { required: "description is required" })} placeholder='Enter your task description Description' className='form-control'></textarea>
            {errors.Task_desc && <p className="text-danger">{errors.Task_desc.message}</p>}
          </div>
          <div className="mb-3">
            <label htmlFor="book_auther" className="form-label">your task hour :</label>
            <input
              type="number"
              className="form-control"
              {...register("Task_hour", { required: "task Hour required is required" })}
              placeholder="Enter task hour"
            />
            {errors.Task_hour && <p className="text-danger">{errors.Task_hour.message}</p>}
          </div>
          <div className="mb-3">
            <label htmlFor="Task_status" className="form-label">Your Task Status :</label>
            <select className='form-select' {...register("Task_status", { required: "task status required" })}>
              <option value="" selected>-------Select Your status-------</option>
              <option value="done">Done</option>
              <option value="notcomplte">Not Complete</option>
              <option value="process">Processing</option>
            </select>
            {errors.Task_status && <p className="text-danger">{errors.Task_status.message}</p>}
          </div>

          <button className="btn btn-primary" type="submit">Submit</button>


        </form>
        <Toaster></Toaster>
      </div>
    </>
  )
}

export default DailyTaskForm
