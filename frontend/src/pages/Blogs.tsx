import { Appbar } from "../components/Appbar"
import { useBlogs } from "../hooks"
import { BlogCard } from "../components/BlogCard"
import { BlogSkeleton } from "../components/BlogSkeleton";

export const Blogs = () => {
 
    const {loading, blogs} = useBlogs();

    if (loading) {
        return <div>
            <Appbar/>
            <div className="flex justify-center bg-rose-100">
                <div>
                    <BlogSkeleton/>
                    <BlogSkeleton/>
                    <BlogSkeleton/>
                    <BlogSkeleton/>
                    <BlogSkeleton/>
                </div>
            </div>
        </div>
    }

    return <div>
        <Appbar/>
        <div className="flex justify-center bg-rose-100">
            <div>
                {blogs.map(blog => <BlogCard 
                id={blog.id}
                authorName={blog.author.name || "Anonymous"}
                title={blog.title}
                content={blog.content}
                publishedDate="19th march 2024"
                />)}
            </div>
        </div>
    </div>
}