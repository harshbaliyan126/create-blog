import { useState } from "react";
import { useHistory } from "react-router-dom";

const Create = () => {

    const [title, setTitle] = useState(``);
    const [body, setBody] = useState(``);
    const [author, setAuthor] = useState(`mario`);
    const [isPending, setPending] = useState(false);
    const history = useHistory();

    const handleSubmit = (e) => {
        e.preventDefault();
        const blog = {title, body, author};
        setPending(true);
        fetch(`http://localhost:8000/blogs`, {
            method: 'POST',
            headers: { "Content-Type" : "application/json"},
            body: JSON.stringify(blog)
        }).then(() => {
            setPending(false);
            console.log(`New Blog Added!`);
            history.push(`/`);
        })
    }

    return ( 
        <div className="create">
            <h2>Add a New Blog!</h2>
            <form onSubmit={handleSubmit}>
                <label>Blog Title:</label>
                <input 
                    type="text" 
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <label>Blog Body:</label>
                <textarea 
                    required
                    value={body}
                    onChange={(e) => setBody(e.target.value)}
                ></textarea>
                <label>Blog author:</label>
                <select
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                >
                    <option value="mario">mario</option>
                    <option value="yoshi">yoshi</option>
                </select>
                { isPending && <button disabled>Adding Blog...</button>}
                { !isPending && <button>Add Blog</button>}
            </form>
        </div>
     );
}
 
export default Create;