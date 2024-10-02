import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import { Link, useNavigate, useParams } from 'react-router-dom';

const UpdateTask = () => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const [data, setData] = useState({});
    const { id } = useParams();
    const navigate = useNavigate();
  
    async function show() {
        try {
          const res = await axios.get(`http://localhost:4000/api/user/${id}`);
          setData(res.data.user);
          console.log("res.data.user.....................")
          console.log(res.user)
          reset(res.data.user);
          console.log(res.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }
  
    useEffect(() => {
        show();
    }, [id]);
  
    async function updatedata(changedata) {
        // const newdata = { ...data, ...changedata };
        console.log(changedata);
  
        try {
            const res = await axios.put(`http://localhost:4000/api/user/${id}`, changedata);
            console.log(res);
            toast.success("Data updated successfully");
            navigate("/view");
        } catch (error) {
            console.error('Error updating data:', error);
            toast.error("Failed to update data");
        }
    }
  return (
    <>
     <div className='container bg-light p-5 mt-5 shadow'>
        <h1 className=' text-center add-blog '>Daily Task Portal</h1>
        <form method='post' onSubmit={handleSubmit(updatedata)}>
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
          <textarea name="" id="" {...register("Task_desc",{required:"description is required"})} placeholder='Enter your task description Description' className='form-control'></textarea>
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
          <select className='form-select' {...register("Task_status",{required:"task status required"})}>
            <option value="" selected>-------Select Your status-------</option>
            <option value="done">Done</option>
            <option value="notcomplte">Not Complete</option>
            <option value="process">Processing</option>
          </select>
          {errors.Task_status && <p className="text-danger">{errors.Task_status.message}</p>}
          </div>
         
          <button className="btn btn-primary" type="submit">update</button>
          <Link className="btn btn-danger ms-2" to="/view">View Your Task</Link>
          
        </form>
        <Toaster></Toaster>
      </div>
    </>
  )
}

export default UpdateTask
