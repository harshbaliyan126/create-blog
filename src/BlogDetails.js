import { useParams } from "react-router-dom";
import useFetch from "./useFetch"
import { useHistory } from "react-router-dom";

const BlogDetails = () => {
    const { id } = useParams();
    const [blog, isLoading, error] = useFetch(`http://localhost:8000/blogs/${id}`);
    const history = useHistory();

    const handleClick = () => {
        fetch(`http://localhost:8000/blogs/${id}`, {
            method: 'DELETE'
        })
            .then( () => {
                console.log(`Deleting Blog ${id}`);
                history.push('/')
            })
    }

    return ( 
        <div className="blog-details">
            <article>
                {isLoading && <div>Loading....</div>}
                {error && <div>{ error }</div>}
                {blog && 
                <article>
                    <h2>{blog.title}</h2>
                    <p>Wriiten by {blog.author}</p>
                    <div>{blog.body}</div>
                </article>
                    }
            </article>
            <div style={{textAlign: "center"}}>            
                <button onClick={handleClick}>Delete</button>
            </div>
        </div>
     );
}
 
export default BlogDetails;