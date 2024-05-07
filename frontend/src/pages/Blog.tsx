import { useBlog } from "../hooks"
import { useParams } from "react-router-dom";
import { FullBlog } from "../components/FullBlog";
import { Spinner } from "../components/Spinner";
import { Appbar } from "../components/Appbar";

export const Blog = () => {
    const { id } = useParams();
    const {loading, blog} = useBlog({
        id: id || ""
    });

    if (loading || !blog) {
        return <div>
                <Appbar/>
                <div className="h-screen flex flex-col justify-center bg-blue-100">
                    <div className="flex justify-center">
                        <Spinner/>
                    </div>
            </div>
        </div>
    }

    return <div>
        <FullBlog blog={blog} />
    </div>
} 