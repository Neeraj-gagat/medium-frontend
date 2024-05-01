import { Link } from "react-router-dom";

interface BlogCardProps {
    id:number;
    authorName: string,
    title: string,
    content: string,
    publishedDate: string;
}

export const BlogCard = ({
    id,
    authorName,
    title,
    content,
    publishedDate,
}:BlogCardProps) => {
    return <Link to={`/blog/${id}`}>
     <div className="border-slate-200 border-b pb-4 p-4 w-screen  max-w-screen-md cursor-pointer bg-pink-100 rounded-xl m-2 shadow-lg hover:scale-110 transition-transform duration-300">
        <div className="flex">
            <Avatar name={authorName}/>
            <div className="font-serif font-extralight pl-2 text-sm flex justify-center flex-col">
                {authorName}
                </div>
                <div className="font-serif flex justify-center flex-col pl-2">
                    <Circle/>
                </div>
             <div className="font-serif pl-2 font-thin text-slate-500 text-sm flex justify-center flex-col">
                {publishedDate}    
             </div>
        </div>
        <div className="font-serif text-xl font-semibold pt-2">
            {title}
        </div>
        <div className="font-serif text-md font-thin">
            {content.slice(0,100) + "..."}
        </div>
        <div className="text-sm font-thin text-slate-500 pt-4">
            {`${Math.ceil(content.length / 100)} minute(s) read`} 
        </div>
       
    </div>
    </Link>
}

export function Circle() {
    return <div className="h-1 w-1 rounded-full bg-slate-500">

    </div>
}

export function Avatar({ name, size = "small" }: { name: string, size?: "small" | "big" }) {
    return (
        <div className={`relative inline-flex items-center justify-center w-10 h-10 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600 ${size === "small" ? "w-6 h-6" : "w-10 h-10"}`}>
            <span className={`${size === "small" ? "text-xs" : "text-md"} font-extralight text-gray-600 dark:text-gray-300`}>{name[0]}</span>
        </div>
    );
}
// export function Avatar({ name, size = "small" }: { name: string, size: "small" | "big" }) {
//     return (
//         <div className={`relative inline-flex items-center justify-center w-10 h-10 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600 ${size === "small" ? "w-6 h-6" : "w-10 h-10"}`}>
//             <span className={`${size === "small" ? "text-xs" : "text-md"} font-extralight text-gray-600 dark:text-gray-300`}>{name[0]}</span>
//         </div>
//     );
// }