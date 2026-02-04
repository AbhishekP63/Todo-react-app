import React from 'react'
import {useState} from 'react'
import toast from 'react-hot-toast'
import { Toaster } from 'react-hot-toast'
import GetDetails from './GetDetails'

const Form = () => {
    const [refresh, setRefresh] = useState(false);


    let [state,setState] = useState({
        title:"",
        desc:"",
        due:"",
        priority:"Medium",
        status:"Pending"

    })


    let handleChange = (e)=>{
        let {name,value} = e.target;
        console.log(e.target.value)
        setState({
            ...state,
            [name]:value
        })
    }

let handleSubmit = async (e)=>{
    e.preventDefault()
    

    await fetch("http://localhost:3500/todos",{
        method:"POST",
        headers:{"content-type":"application/json"},
        body:JSON.stringify(state)

    })
    toast.success("TODO Added Successfully")

    setRefresh(!refresh);

    setState({
        title:"",
        desc:"",
        due:"",
        priority:"Medium",
        status:"Pending"
    })
    
}





    return (
        <div className='min-h-screen '>
            
             <div className=" grid place-items-center m-20">

            <form action="" onSubmit={handleSubmit} className='border-2 text-center font-bold text-white bg-white/15 w-100 h-100 font-sans rounded-4xl m-3'>
            <h1 className='text-center font-bold p-2 '>TODO APP</h1>     

                <div className='m-4'>
                    <label htmlFor="">Task-Title: </label>
                    <input type="text"  value={state.title} className = "p-1 border rounded-2xl focus:outline-white" placeholder=' 'name='title' onChange={handleChange}/>
                </div>

                <div className='m-4'>
                    <label htmlFor="">Description: </label>
                    <input type="textarea" value={state.desc} className = "p-1 border rounded-2xl  focus:outline-white" placeholder='' name='desc' onChange={handleChange} />
                </div>

                <div className='m-4'>
                    <label htmlFor="">Due-Date: </label>
                    <input type="date"  value={state.due} className = "p-1 border rounded-2xl  bg-white text-black"  name='due' onChange={handleChange}/>
                </div>

                <div className='m-4'>
                    <label htmlFor="">Priority: </label>
                    <select name="priority" className = "p-1 border rounded-2xl bg-white text-black" id="" onChange={handleChange}>
                        <option value={state.priority}>Medium</option>
                        <option value={state.priority}>High</option>
                        <option value={state.priority}>Low</option>
                    </select>
                </div>


                <div className='m-4'>
                    <label htmlFor="">Status: </label>
                    <select name="status"   className = "p-1 border rounded-2xl bg-white text-black" id="" onChange={handleChange}>
                        <option value={state.status}>Pending</option>
                        <option value={state.status}>Completed</option>
                    </select>
                </div>

                <button className = "p-3 border rounded-3xl m-4 align-middle">ADD TODO</button>

            </form>
            </div>

            <GetDetails refresh = {refresh}/>
        </div>
    )
}

export default Form
