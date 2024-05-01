import { Link } from "react-router-dom"
import { Avatar } from "./BlogCard"

export const Appbar = () => {
    return <div className="border-b flex justify-between px-10 py-4  border-black">
           <Link to={'/blogs'} className="flex flex-col justify-center cursor-pointer font-extrabold text-4xl font-serif">
            Medium
           </Link>
           <div>
            <Link to={`/publish`}>
               <button type="button" className="mr-4 focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2">New</button>
           </Link>
            <Avatar size={"big"} name="Neeraj"/>
           </div>
    </div>
}