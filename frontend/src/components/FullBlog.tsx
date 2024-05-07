import { Blog } from "../hooks"
import { Appbar } from "./Appbar"
import { Avatar } from "./BlogCard"

export const FullBlog = ({ blog }:{ blog: Blog }) => {
    return <div className=" h-screen bg-blue-100">
        <Appbar/>
        <div className="flex justify-center rounded-3xl border-black border-2 mt-2  bg-slate-200">
            <div className="grid grid-cols-1 lg:grid-cols-12  px-10 pt-200 w-full max-w-screen-xl p-12">
                <div className="col-span-8">
                    <div className="font-serif text-5xl font-extrabold">
                        {blog.title}
                    </div>
                    <div className="font-serif  text-slate-500 pt-2">
                        Post on 2nd December 2023
                    </div>
                    <div className="font-serif pt-4">
                        {blog.content}
                    </div>
                </div>
                <div className="col-span-4">
                    <div className="font-serif text-slate-600 text-lg">
                        Author
                    </div>
                    <div className="flex w-full">
                        <div className="font-serif pr-4 flex flex-col justify-center">
                            <Avatar name={blog.author.name || "Anonymous"} size="big"/>
                        </div>
                        <div>
                            <div className="font-serif text-xl font-bold">
                                {blog.author.name || "Anonymous"}
                            </div>
                            <div className="pt-2 font-serif text-slate-500">
                                Random catch phrase about the author's ability to grab the user's Attention
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
}