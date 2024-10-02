import React from 'react'
import { useEffect, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import axios from 'axios';
import { Link } from 'react-router-dom'
import { format } from 'date-fns';

const DailyTaskView = () => {
  const [user, setUser] = useState([]);
  async function show() {
      try {
          const res = await axios.get('http://localhost:4000/api/user/taskview');
          setUser(res.data.user);
      } catch (error) {
        alert("error")
          console.error('Error fetching data:', error);
      } 
  }
  
  
function trash(id) {
  if (window.confirm("are you sure want to delete this items")) {
      axios.delete(`http://localhost:4000/api/user/${id}`)
          .then(() => {
              show();

          })

  }
}
useEffect(() => {
  show();
}, []);

  return (
    <>
     <Link className="btn btn-warning mt-5" to="/form">Add More Task</Link>
     <div className="container">

{
     user.length > 0 ?
     (
        <table className='table table-striped table-hover table-bordered text-center mt-5  w-100 '>
        <thead >
            <th>id</th>
            <th>Task Date</th>
            <th>Task Description</th>
            <th>Task Hour</th>
            <th>Task Hour</th>
            <th>Action</th>
        </thead>
        <tbody>
            {
                user?.length > 0 ? (
                  user?.map((items,index)=>(
                            <tr>
                                <td>{index + 1}</td>
                                <td>{format(new Date(items.Task_date), 'yyyy-MM-dd')}</td>
                                <td>{items.Task_desc}</td>
                                <td>{items.Task_hour}</td>
                                <td>{items.Task_status}</td>
                               <td>
                               <button className="btn btn-danger" onClick={() => trash(items._id)}><i class="fa-solid fa-trash-can"></i></button>
                               
                               {/* {<i style={{color:"red"}} class="fa-solid fa-trash-can" onClick={() => trash(items._id)}></i>} */}
                              
                               <Link to={`/update/${items._id}`} className='btn btn-success ms-2'><i   class="fa-solid fa-file-pen" ></i> </Link>
                               </td>
                            </tr>
                        ))
             ) : 
             (
                <th colSpan={5} className='text-center bg-primary'>hello</th>
             )
            }
        </tbody>

    </table>

    )
    :
    (
        <div className="text-center">
        <div className="spinner-border" role="status">
            <span className="sr-only"></span>
        </div>
    </div>
    )
}
</div>
   <Toaster />
    </>
  )
}

export default DailyTaskView
