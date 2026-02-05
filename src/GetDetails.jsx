import React from 'react'
import { useState, useEffect } from 'react'
import toast from 'react-hot-toast'


const GetDetails = ({refresh , setRefresh}) => {
    let [state, setState] = useState([])

    useEffect(() => {
        let fetching = async () => {
            let response = await fetch("http://localhost:3500/todos")
            let result = await response.json()
            setState(result)
        }
        fetching()
    }, [refresh])


    let handleUpdate=async( id,task)=>{

         const title = prompt("Enter new title:", task.title);
    const desc = prompt("Enter new description:", task.desc);
    const due = prompt("Enter due date (YYYY-MM-DD):", task.due);
    const priority = prompt("Enter priority (Low / Medium / High):", task.priority);
    const status = prompt("Enter status (Pending / Completed):", task.status);

    if (!title || !desc || !due || !priority || !status) return;

     const updatedTask = {
        ...task,
        title,
        desc,
        due,
        priority,
        status,
    };

        try {
            await fetch(`http://localhost:3500/todos/${id}`,{
                method:"PUT",
                headers:{"content-type":"application/json"},
                body:JSON.stringify(updatedTask)
            })
            setRefresh(prev => !prev)
            toast.success("TODO updated successfully")
        } catch (error) {
            toast.error("Failed to update the task")
        }
    };

    
    let handleDelete=async (id)=>{
        try {
            await fetch(`http://localhost:3500/todos/${id}`,{
                method:"DELETE",
            });
            setRefresh(prev => !prev)
            toast.success("Deleted TODO Successfully")
        } catch (error) {
            toast.error("Failed to delete the task")
        }
    };
     
    return (
        <div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5 m-3 p-10 auto-rows-max items-start">
            {/* <div className="flex flex-wrap gap-4"> */}
                {
                    state?.map((obj, i) => {
                        // console.log(obj)
                        return (
                            <div key={i} className='text-white  p-5 border-3  rounded-3xl  break-words whitespace-normal overflow-hidden hover:border-3 hover:bg-linear-to-bl from-violet-500 to-fuchsia-500 '>

                                <p className='break-words line-clamp-3 '>Task-Title:{obj.title}</p>
                                <p>Description:{obj.desc}</p>
                                <p>Due-Date:{obj.due}</p>
                                <p>Priority:{obj.priority}</p>
                                <p>Status:{obj.status}</p>
                                <button className='p-2 m-2  rounded-2xl border-2 hover:text-black' onClick={()=>{handleUpdate(obj.id,obj)}}>Update</button>

                                <button className='p-2 m-2  rounded-2xl border-2 hover:text-black' onClick={()=>{ handleDelete(obj.id)}}>Delete</button>
                               
                            </div>
                        )   
                    })
                }
            </div>
        </div>
    )
}

export default GetDetails
