import React from 'react'
import { useState } from 'react'
import toast from 'react-hot-toast'
import { Toaster } from 'react-hot-toast'
import GetDetails from './GetDetails'

const Form = () => {
    const [refresh, setRefresh] = useState(false);


    let [state, setState] = useState({
        title: "",
        desc: "",
        due: "",
        priority: "Medium",
        status: "Pending"

    })


    let handleChange = (e) => {
        let { name, value } = e.target;
        console.log(e.target.value)
        setState({
            ...state,
            [name]: value
        })
    }

    let handleSubmit = async (e) => {
        e.preventDefault()


        await fetch("http://localhost:3500/todos", {
            method: "POST",
            headers: { "content-type": "application/json" },
            body: JSON.stringify(state)

        })
        toast.success("TODO Added Successfully")

        setRefresh(!refresh);

        setTimeout(() => {

            setState({
                title: "",
                desc: "",
                due: "",
                priority: "Medium",
                status: "Pending"
            })

        }, 3000);

    }



    return (
        <div className='min-h-screen '>

            <div className=" grid place-items-center m-20 ">

                <form action="" onSubmit={handleSubmit} className='border-3 text-center font-bold text-white bg-white/15 w-100 h-110 font-sans rounded-4xl m-3  '>
                    <h1 className='text-center font-bold p-2 '>TODO APP</h1>

                    <div className='m-4'>
                        <label htmlFor="">Task-Title: </label>
                        <input type="text" value={state.title} className="p-1 border rounded-2xl focus:outline-white " placeholder=' ' name='title' onChange={handleChange} />
                    </div>

                    <div className='m-4'>
                        <label htmlFor="">Description: </label>
                        <textarea
                            name="desc"
                            value={state.desc}
                            onChange={handleChange}
                            className="p-1 border rounded-2xl focus:outline-white align-middle resize-none overflow-hidden"
                        ></textarea>
                    </div>

                    <div className='m-4'>
                        <label htmlFor="">Due-Date: </label>
                        <input type="date" value={state.due} className="p-1 border rounded-2xl  bg-white text-black" name='due' onChange={handleChange} />
                    </div>

                    <div className='m-4'>
                        <label htmlFor="">Priority: </label>
                        <select name="priority" value={state.priority} className="p-1 border rounded-2xl bg-white text-black" id="" onChange={handleChange}>
                            <option value="Medium">Medium</option>
                            <option value="High">High</option>
                            <option value="Low">Low</option>
                        </select>
                    </div>


                    <div className='m-4'>
                        <label htmlFor="">Status: </label>
                        <select name="status" value={state.status} className="p-1 border rounded-2xl bg-white text-black" id="" onChange={handleChange}>
                            <option value="Pending">Pending</option>
                            <option value="Completed">Completed</option>
                        </select>
                    </div>

                    <button className="p-3 border rounded-3xl m-4 align-middle  hover:text-black hover:border-2  ">ADD TODO</button>

                </form>
            </div>

            <GetDetails refresh={refresh} setRefresh = {setRefresh}/>
        </div>
    )
}

export default Form
