import React from 'react'
import { useState, useEffect } from 'react'

const GetDetails = ({refresh}) => {
    let [state, setState] = useState([])

    useEffect(() => {
        let fetching = async () => {
            let response = await fetch("http://localhost:3500/todos")
            let result = await response.json()
            setState(result)
        }
        fetching()
    }, [refresh])

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
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default GetDetails
